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
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export default function TaskCreation({
  data,
  step,
  setData,
  onSubmit,
  onClose,
  setStep,
  errors,
  setErrors,
}: Props) {
  console.log("errors", errors);

  const validateStepOne = () => {
    const newErrors: Record<string, string> = {};
    if (!data.title.trim()) {
      newErrors.title = "Title is required";
    }

    return newErrors;
  };

  const handleNext = () => {
    const stepOneErrors = validateStepOne();

    if (Object.keys(stepOneErrors).length === 0) {
      setErrors({});
      setStep((prev) => prev + 1);
    } else {
      setErrors(stepOneErrors);
    }
  };

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
                onChange={(e) => {
                  const value = e.target.value;
                  setData({ ...data, title: value });

                  if (errors.title && value.trim().length >= 0) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.title;
                      return newErrors;
                    });
                  }
                }}
              />
              {errors.title && <p className={styles.error}>{errors.title}</p>}
            </label>
            <div className={styles.btNextModal}>
              <button
                className={styles.btnModal}
                type="button"
                onClick={handleNext}
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
                onChange={(e) => {
                  const value = e.target.value;
                  setData({ ...data, description: value });

                  if (errors.description && value.trim().length >= 0) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.description;
                      return newErrors;
                    });
                  }
                }}
              />
              {errors.description && (
                <p className={styles.error}>{errors.description}</p>
              )}
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
