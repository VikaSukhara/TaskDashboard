import { Sun, Moon, Bell } from "lucide-react";

import styles from "./Header.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import TaskCreation from "../TaskCreation/TaskCreation";

import * as yup from "yup";
import { taskType } from "../App";
import { v4 as uuidv4 } from "uuid";

const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

type HeaderProps = {
  changeTheme: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  addTask: (task: taskType) => void;
  addNotification: (message: string) => void;
  hasUnread: boolean;
};

export default function Header({
  changeTheme,
  isDark,
  isSidebarOpen,
  setIsSidebarOpen,
  className = "",
  addTask,
  addNotification,
  hasUnread,
}: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [dataFromFrom, setDataFromFrom] = useState<taskType>({
    id: uuidv4(),
    title: "",
    description: "",
    date: "",
    priority: "Medium",
    assigned: "",
    status: "To Do",
    createdAt: new Date().toISOString(),
  });

  const toggleModal = () => {
    if (!isModalOpen) {
      setStep(1);
      setDataFromFrom({
        id: uuidv4(),
        title: "",
        description: "",
        date: "",
        priority: "Medium",
        assigned: "",
        status: "To Do",
        createdAt: new Date().toISOString(),
      });
    }

    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async () => {
    try {
      await taskSchema.validate(dataFromFrom, { abortEarly: false });
      console.log("Submitted data:", dataFromFrom);
      addTask({
        ...dataFromFrom,
      });
      addNotification(`${dataFromFrom.title}`);

      setErrors({});
      setIsModalOpen(false);
      setStep(1);
    } catch (err: any) {
      console.log("Error caught:", err);
      if (err.inner) {
        const formattedErrors: Record<string, string> = {};
        console.log("Preparing formattedErrors");
        err.inner.forEach((error: any) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
        console.log("Validation errors:", formattedErrors);
      }
    }
  };

  return (
    <div className={className}>
      <h1 className={styles.headerTitle}>Task Dashboard</h1>
      <div className={styles.btnNavWrapper}>
        {" "}
        <button
          className={styles.btnTheme}
          onClick={() => changeTheme((prev) => !prev)}
        >
          {isDark ? <Sun className={styles.sunIcon} /> : <Moon />}
        </button>
        <button
          className={styles.btnTheme}
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <Bell className={styles.icon} />
          {hasUnread && <span className={styles.redDot} />}
        </button>
        <select className={styles.select} name="" id="">
          <option>English</option>
          <option>Ukraine</option>
        </select>
        <button className={styles.btnTask} onClick={toggleModal}>
          Create New Task
        </button>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={toggleModal} width="512px">
          <TaskCreation
            step={step}
            setStep={setStep}
            data={dataFromFrom}
            setData={setDataFromFrom}
            onSubmit={handleSubmit}
            onClose={toggleModal}
            errors={errors}
            setErrors={setErrors}
          />
        </Modal>
      )}
    </div>
  );
}
