import styles from "./TaskCreation.module.scss";
import { TaskType } from "../App";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum Status {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done",
}

const schema = yup.object({
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
  date: yup
    .string()
    .default(undefined)
    .test("valid-date", "Invalid date", (value) => {
      if (!value) return true;
      const selectedDate = new Date(value);
      return !isNaN(selectedDate.getTime());
    })
    .test("no-past-date", "Date cannot be in the past", (value) => {
      if (!value) return true;
      const selectedDate = new Date(value);
      return selectedDate >= today;
    })
    .test("valid-year", "Year must be between 2025 and 2030", (value) => {
      if (!value) return true;
      const selectedDate = new Date(value);
      const year = selectedDate.getFullYear();
      return year >= 2025 && year <= 2030;
    }),
  priority: yup.mixed<Priority>().oneOf(Object.values(Priority)).required(),
  assigned: yup.string().trim().default(""),
});

// Тип форми виводиться зі схеми.
type FormValues = yup.InferType<typeof schema> & { date: string | undefined };

type Props = {
  data: TaskType;
  setData: React.Dispatch<React.SetStateAction<TaskType>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (values: TaskType) => void;
  onClose: () => void;
  step: number;
  error: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const TaskCreation: React.FC<Props> = ({
  data,
  step,
  setData,
  onSubmit,
  onClose,
  setStep,
  error,
  setErrors,
}: Props) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: data.title || "",
      description: data.description || "",
      date: data.date ?? undefined,
      priority: data.priority || "low",
      assigned: data.assigned || "",
    },
    resolver: yupResolver(schema) as any,
  });

  useEffect(() => {
    const subscription = watch((values) =>
      setData((prev) => ({
        ...prev, // зберігаємо id, status, createdAt
        ...values, // оновлюємо лише поля форми
      }))
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const validateStepOne = () => {
    const newErrors: Record<string, string> = {};
    if (!data.title.trim()) {
      newErrors.title = t("errors.titleRequired");
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
      <h2 className={styles.modalTitle}>{t("createNewTask")}</h2>
      <div className={styles.numbersWrapper}>
        <div
          className={cn(styles.number, { [styles.numberActive]: 1 <= step })}
        >
          1
        </div>
        <div
          className={cn(styles.number, { [styles.numberActive]: 2 <= step })}
        >
          2
        </div>
      </div>
      <form action="" className={styles.formModal}>
        {step === 1 && (
          <div>
            <label htmlFor="task-title" className={styles.labelModal}>
              {t("title")}
              <input
                id="task-title"
                type="text"
                className={styles.inputModal}
                {...register("title", { required: t("errors.titleRequired") })}
              />
              {errors.title && (
                <p className={styles.error}>{errors.title.message}</p>
              )}
            </label>
            <div className={styles.btNextModal}>
              <button
                className={styles.btnModal}
                type="button"
                onClick={handleNext}
              >
                {t("next")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label htmlFor="description" className={styles.labelModal}>
              {t("description")}
              <textarea
                className={styles.textareaModal}
                id="description"
                {...register("description", {
                  required: t("errors.descriptionRequired"),
                })}
              />
              {errors.description && (
                <p className={styles.error}>{error.description}</p>
              )}
            </label>
            {errors.description && (
              <p className={styles.error}>{errors.description.message}</p>
            )}
            <label htmlFor="data" className={styles.labelModal}>
              {t("dueDate")}
              <input
                type="date"
                className={styles.inputModal}
                {...register("date")}
                min={today.toISOString().split("T")[0]}
              />
            </label>
            {errors.date && (
              <p className={styles.error}>{errors.date.message}</p>
            )}
            <label htmlFor="priority" className={styles.labelModal}>
              {t("priority")}
              <select
                id="priority"
                className={styles.inputModal}
                {...register("priority")}
              >
                <option value={Priority.Low}>{t("low")}</option>
                <option value={Priority.Medium}>{t("medium")}</option>

                <option value={Priority.High}>{t("high")}</option>
              </select>
            </label>
            {errors.priority && (
              <p className={styles.error}>{errors.priority.message}</p>
            )}
            <label htmlFor="" className={styles.labelModal}>
              {t("assignedTo")}
              <input
                type="text"
                className={styles.inputModal}
                {...register("assigned")}
              />
            </label>
            {errors.assigned && (
              <p className={styles.error}>{errors.assigned.message}</p>
            )}
            <div className={styles.btnWrapper}>
              <button
                type="button"
                className={styles["btn-gray"]}
                onClick={() => setStep((prev) => prev - 1)}
              >
                {t("previous")}
              </button>
              <button
                type="submit"
                className={styles["btn-gradient"]}
                onClick={handleSubmit((values) => {
                  onSubmit(data);
                })}
              >
                {t("submit")}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskCreation;
