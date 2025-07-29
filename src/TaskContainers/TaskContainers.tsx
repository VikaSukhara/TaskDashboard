import styles from "./TaskContainers.module.css";
export default function TaskContainers() {
  return (
    <div className={styles.columnWrapper}>
      <div className={`${styles.column} ${styles.todo}`}>
        <h3 className={`${styles.columnTitle} ${styles.todoTitle}`}>To Do</h3>
        <div className={styles.taskWrapper}></div>
      </div>
      <div className={`${styles.column} ${styles.inProgress}`}>
        <h3 className={`${styles.columnTitle} ${styles.inProgressTitle}`}>
          In Progress
        </h3>
        <div className={styles.taskWrapper}></div>
      </div>
      <div className={`${styles.column} ${styles.done}`}>
        <h3 className={`${styles.columnTitle} ${styles.doneTitle}`}>Done</h3>
        <div className={styles.taskWrapper}></div>
      </div>
    </div>
  );
}
