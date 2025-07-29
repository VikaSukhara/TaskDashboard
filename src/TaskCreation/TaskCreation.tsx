import { useState } from "react";
import styles from "./TaskCreation.module.css";

type dataType = {
  title: string;
  description: string;
  date: string;
  priority: "medium" | "large" | "high";
  assigned: string;
};

type Props = {
  data: dataType;
  setData: React.Dispatch<React.SetStateAction<dataType>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: () => void;
  onClose: () => void;
  step: number;
};

export default function TaskCreation({
  data,
  step,
  setData,
  onSubmit,
  onClose,
  setStep,
}: Props) {
  return (
    <div style={{ padding: "24px" }}>
      <h2 className={styles.modalTitle}>Create New Task</h2>
      <div className={styles.numbersWrapper}>
        <div
          className={`${styles.number} ${1 <= step ? styles.numberActive : ""}`}
        >
          1
        </div>
        <div
          className={`${styles.number} ${2 <= step ? styles.numberActive : ""}`}
        >
          2
        </div>
      </div>
      <form action="" className={styles.formModal}>
        {step === 1 && (
          <div>
            {" "}
            <label htmlFor="task-title" className={styles.labelModal}>
              {" "}
              Title
              <input
                type="text"
                className={styles.inputModal}
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </label>
            <div className={styles.btNextModal}>
              <button
                className={styles.btnModal}
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label htmlFor="description" className={styles.labelModal}>
              Description
              <textarea
                className={styles.textareaModal}
                id="description"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </label>
            <label htmlFor="data" className={styles.labelModal}>
              {" "}
              Due Date
              <input
                type="date"
                className={styles.inputModal}
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
              />
            </label>
            <label htmlFor="priority" className={styles.labelModal}>
              {" "}
              Priority{" "}
              <select
                name=""
                id="priority"
                className={styles.inputModal}
                value={data.priority}
                onChange={(e) =>
                  setData({
                    ...data,
                    priority: e.target.value as "medium" | "large" | "high",
                  })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label htmlFor="" className={styles.labelModal}>
              {" "}
              Assigned To
              <input
                type="text"
                className={styles.inputModal}
                value={data.assigned}
                onChange={(e) => setData({ ...data, assigned: e.target.value })}
              />
            </label>
            <div className={styles.btnWrapper}>
              <button
                type="button"
                className={styles["btn-gray"]}
                onClick={() => setStep((prev) => prev - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className={styles["btn-gradient"]}
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
