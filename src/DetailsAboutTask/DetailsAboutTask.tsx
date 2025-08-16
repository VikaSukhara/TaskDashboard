import { useState } from "react";
import { TaskType } from "../App";
import styles from "./DetailsAboutTask.module.scss";
type Props = {
  task: TaskType;
  onDelete: (id: string) => void;
  onEdit: (task: TaskType) => void;
};

import { Trash, Pencil } from "lucide-react";
import Modal from "../Modal/Modal";
import { useTranslation } from "react-i18next";

const DetailsAboutTask: React.FC<Props> = ({ task, onDelete, onEdit }) => {
  const { t } = useTranslation();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] =
    useState<boolean>(false);

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
      <h2 className={styles.card}>{t("taskDetails")}</h2>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.description}>
        <span className={styles.span}>{t("description")}: </span>
        {task.description}
      </p>

      {task.date && (
        <p className={styles.text}>
          <span className={styles.span}>{t("dueDate")}:</span> {task.date}
        </p>
      )}

      <p className={styles.text}>
        <span className={styles.span}>{t("priority")}: </span>
        {task.priority}
      </p>
      {task.assigned && (
        <p className={styles.text}>
          <span className={styles.span}>{t("assignedTo")}:</span>
          {task.assigned}
        </p>
      )}

      <p className={styles.text}>
        <span className={styles.span}>{t("status")}:</span> {task.status}
      </p>

      {task.createdAt && (
        <p className={styles.text}>
          <span className={styles.span}>{t("createdAt")}:</span>
          {formatDate(new Date(task.createdAt))}
        </p>
      )}

      <button className={styles.btnPencil} onClick={() => onEdit(task)}>
        <Pencil className={styles.icon} />
      </button>

      <button
        className={styles.btnTrash}
        onClick={() => setIsDeleteConfirmOpen(true)}
      >
        <Trash className={styles.icon} />
      </button>

      {isDeleteConfirmOpen && (
        <Modal
          isOpen={isDeleteConfirmOpen}
          onClose={() => setIsDeleteConfirmOpen(false)}
        >
          <div className={styles.modalContainer}>
            <h3>{t("deleteConfirmation")}</h3>
            <div className={styles.btnConfirmationWrapper}>
              <button
                className={styles.modalBtn}
                onClick={() => {
                  onDelete(task.id);
                  setIsDeleteConfirmOpen(false);
                }}
              >
                {t("yes")}
              </button>
              <button
                className={styles.modalBtn}
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                {t("no")}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DetailsAboutTask;
