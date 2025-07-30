import { taskType } from "../App";
import styles from "./TaskContainers.module.css";

type TaskContainersProps = {
  tasks: taskType[];
};

export default function TaskContainers({ tasks }: TaskContainersProps) {
  const toDoTasks = tasks.filter((t) => t.status === "toDo");
  const inProgressTasks = tasks.filter((t) => t.status === "inProgress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className={styles.columnWrapper}>
      <div className={`${styles.column} ${styles.todo}`}>
        <h3 className={`${styles.columnTitle} ${styles.todoTitle}`}>To Do</h3>
        <div className={styles.containerWrapper}>
          <ul>
            {toDoTasks.map((task, index) => (
              <li key={index} className={styles.taskWrapper}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${styles.column} ${styles.inProgress}`}>
        <h3 className={`${styles.columnTitle} ${styles.inProgressTitle}`}>
          In Progress
        </h3>
        <div className={styles.taskWrapper}>
          <ul>
            {inProgressTasks.map((task, index) => (
              <li key={index}>{task.title}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${styles.column} ${styles.done}`}>
        <h3 className={`${styles.columnTitle} ${styles.doneTitle}`}>Done</h3>
        <div className={styles.taskWrapper}>
          <ul>
            {doneTasks.map((task, index) => (
              <li key={index}>{task.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
