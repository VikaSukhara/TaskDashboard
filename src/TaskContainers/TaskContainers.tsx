import {
  DragDropContext, // обгортка для всієї drag & drop логіки.
  Droppable, // зони, куди можна перетягувати.
  Draggable, // елементи, які можна перетягувати.
  DropResult, //  тип, який описує результат події onDragEnd
} from "@hello-pangea/dnd";

import { taskType } from "../App";
import styles from "./TaskContainers.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import DetailsAboutTask from "../DetailsAboutTask/DetailsAboutTask";
import { useTranslation } from "react-i18next";

type TaskContainersProps = {
  tasks: taskType[];
  setTasks: React.Dispatch<React.SetStateAction<taskType[]>>;
};

export default function TaskContainers({
  tasks,
  setTasks,
}: TaskContainersProps) {
  const { t } = useTranslation();
  const statuses = ["toDo", "inProgress", "done"] as const;
  const statusMap = {
    toDo: "To Do",
    inProgress: "In Progress",
    done: "Done",
  } as const;

  const cssClassMap = {
    "To Do": styles.toDo,
    "In Progress": styles.inProgress,
    Done: styles.done,
  };

  const [isSelectedTaskOpen, setIsSelectedTaskOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const selectedTask = tasks.find((t) => t.id.toString() === selectedTaskId);

  const openTaskModal = (id: string) => {
    setSelectedTaskId(id);
    setIsSelectedTaskOpen(true);
  };

  const closeTaskModal = () => {
    setIsSelectedTaskOpen(false);
    setSelectedTaskId(null);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    console.log("delete");
  };

  // викликаю тоді, коли перетягнула якусь картку
  const onDragEnd = (result: DropResult) => {
    console.log("Drag ended:", result);
    // source - звідки беру задачу
    // destination - куди перетягую задачу
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // якщо картку перетягнула в тому самому блоці - не міняю нічого
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const draggedTask = tasks.find((t) => t.id.toString() === draggableId); //шукає ту задачу, яку перетягую
    if (!draggedTask) return;

    const updatedTasks = [...tasks].filter(
      //копія всіх задач, але вже без тої яку перетягую
      (t) => t.id.toString() !== draggableId
    );
    updatedTasks.splice(destination.index, 0, {
      // цю задачу яку перетягую, вставляю в updatedTasks але з новим статусом
      ...draggedTask,
      status: statusMap[destination.droppableId as keyof typeof statusMap],
    });
    setTasks(updatedTasks);
  };

  console.log(
    "Tasks with statuses:",
    tasks.map((t) => ({ id: t.id, status: t.status }))
  );

  return (
    // Слухає події перетягування. Викдикається, коли перетягнула і відпустила картку
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.columnWrapper}>
        {statuses.map((status) => {
          const count = tasks.filter(
            (task) => task.status === statusMap[status]
          ).length;
          return (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div className={`${styles.column} ${styles[status]}`}>
                  <h3
                    className={`${styles.columnTitle} ${
                      styles[`${status}Title`]
                    }`}
                    title={t(status)}
                  >
                    {t(status)} ({count})
                  </h3>

                  <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.containerWrapper}
                  >
                    {tasks
                      .filter((task) => task.status === statusMap[status])
                      .map((task, index) => (
                        <Draggable
                          draggableId={task.id.toString()}
                          index={index}
                          key={task.id}
                        >
                          {(provided) => (
                            <li
                              onClick={() => openTaskModal(task.id.toString())}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${styles.taskWrapper} ${
                                cssClassMap[task.status] || ""
                              }`}
                            >
                              <div className={styles.taskContainer}>
                                <h4 className={styles.taskTitle}>
                                  {task.title}
                                </h4>
                                <p className={styles.taskParagraph}>
                                  {task.description}
                                </p>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
      <Modal isOpen={isSelectedTaskOpen} onClose={closeTaskModal} width="512px">
        {selectedTask ? (
          <DetailsAboutTask
            onDelete={(id) => {
              deleteTask(id);
              closeTaskModal();
            }}
            task={selectedTask}
          />
        ) : null}
      </Modal>
    </DragDropContext>
  );
}
