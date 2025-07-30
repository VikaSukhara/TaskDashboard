import {
  DragDropContext, // обгортка для всієї drag & drop логіки.
  Droppable, // зони, куди можна перетягувати.
  Draggable, // елементи, які можна перетягувати.
  DropResult, //  тип, який описує результат події onDragEnd
} from "@hello-pangea/dnd";

import { taskType } from "../App";
import styles from "./TaskContainers.module.css";

type TaskContainersProps = {
  tasks: taskType[];
  setTasks: React.Dispatch<React.SetStateAction<taskType[]>>;
};

export default function TaskContainers({
  tasks,
  setTasks,
}: TaskContainersProps) {
  const statuses = ["toDo", "inProgress", "done"] as const;

  // викликаю тоді, коли перетягнула якусь картку
  const onDragEnd = (result: DropResult) => {
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
      status: destination.droppableId as taskType["status"],
    });
    setTasks(updatedTasks);
  };

  return (
    // Слухає події перетягування. Викдикається, коли перетягнула і відпустила картку
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.columnWrapper}>
        {statuses.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(
              provided // Це внутрішній функціональний компонент
            ) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`${styles.column} ${styles[status]}`}
              >
                <h3
                  className={`${styles.columnTitle} ${
                    styles[`${status}Title`]
                  }`}
                >
                  {status === "toDo"
                    ? "To Do"
                    : status === "inProgress"
                    ? "In Progress"
                    : "Done"}
                </h3>
                <ul className={styles.containerWrapper}>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        draggableId={task.id.toString()}
                        index={index}
                        key={task.id}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.taskWrapper}
                          >
                            <div className={styles.taskContainer}>
                              <h4 className={styles.taskTitle}>{task.title}</h4>
                              <p className={styles.taskParagraph}>{task.description}</p>
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
        ))}
      </div>
    </DragDropContext>
  );
}
