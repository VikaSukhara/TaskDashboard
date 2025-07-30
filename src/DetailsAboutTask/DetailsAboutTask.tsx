import { taskType } from "../App";
import styles from "./DetailsAboutTask.module.css";
type Props = {
  task: taskType;
};
export default function DetailsAboutTask({ task }: Props) {
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.card}>Task Details</h2>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.description}>
        {" "}
        <span className={styles.span}>Description: </span> {task.description}
      </p>

      {task.date && (
        <p className={styles.text}>
          <span className={styles.span}>Due Date:</span> {task.date}
        </p>
      )}

      <p className={styles.text}>
        {" "}
        <span className={styles.span}>Priority: </span>
        {task.priority}
      </p>
      {task.assigned && (
        <p className={styles.text}>
          {" "}
          <span className={styles.span}>Assigned to:</span>
          {task.assigned}
        </p>
      )}

      <p className={styles.text}>
        {" "}
        <span className={styles.span}>Status:</span> {task.status}
      </p>

      {task.createdAt && (
        <p className={styles.text}>
          {" "}
          <span className={styles.span}>Created at:</span>{" "}
          {formatDate(new Date(task.createdAt))}
        </p>
      )}
    </div>
  );
}
