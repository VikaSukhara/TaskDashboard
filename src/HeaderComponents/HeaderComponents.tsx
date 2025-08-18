import { Sun, Moon, Bell } from "lucide-react";

import styles from "./HeaderComponents.module.scss";
import { useState } from "react";
import Modal from "../Modal/Modal";
import TaskCreation from "../TaskCreation/TaskCreation";

import * as yup from "yup";
import { Priority, Status, TaskType } from "../App";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

type HeaderProps = {
  changeTheme: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  addTask: (task: TaskType) => void;
  addNotification: (message: string) => void;
  hasUnread: boolean;
};

const HeaderComponents: React.FC<HeaderProps> = ({
  changeTheme,
  isDark,
  setIsSidebarOpen,
  className = "",
  addTask,
  addNotification,
  hasUnread,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [initialData, setInitialData] = useState<TaskType | null>(null);
  const [dataFromFrom, setDataFromFrom] = useState<TaskType>({
    id: uuidv4(),
    title: "",
    description: "",
    date: "",
    priority: "Medium" as Priority,
    assigned: "",
    status: "To Do" as Status,
    createdAt: new Date().toISOString(),
  });

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const getTaskSchema = (t: (key: string) => string) => {
    return yup.object().shape({
      title: yup.string().required(t("errors.titleRequired")),
      description: yup.string().required(t("errors.descriptionRequired")),
    });
  };

  const openModalForEdit = (taskToEdit: TaskType) => {
    setStep(1);
    setDataFromFrom({ ...taskToEdit });
    setInitialData({ ...taskToEdit });
    setErrors({});
    setIsModalOpen(true);
  };

  // відкриття модалки для нової таски
  const openModalForNew = () => {
    const newTask: TaskType = {
      id: uuidv4(),
      title: "",
      description: "",
      date: "",
      priority: Priority.Medium,
      assigned: "",
      status: Status.ToDo,
      createdAt: new Date().toISOString(),
    };
    setStep(1);
    setDataFromFrom(newTask);
    setInitialData(newTask);
    setErrors({});
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    if (!isModalOpen) {
      const newData = {
        id: uuidv4(),
        title: "",
        description: "",
        date: "",
        priority: Priority.Medium,
        assigned: "",
        status: Status.ToDo,
        createdAt: new Date().toISOString(),
      };
      setStep(1);
      setDataFromFrom(newData);
      setInitialData(newData);
      setErrors({});
    } else {
      setErrors({});
    }

    setIsModalOpen(!isModalOpen);
  };
  const handleSubmit = (values: TaskType) => {
    addTask(values);
    addNotification(values.title || "New task created");
    setIsModalOpen(false);
    setStep(1);
    setErrors({});
  };

  return (
    <div className={className}>
      <h1 className={styles.headerTitle}>{t("taskDashboard")}</h1>
      <div className={styles.btnNavWrapper}>
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
        <select
          className={styles.select}
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="uk">Українська</option>
        </select>
        <button className={styles.btnTask} onClick={toggleModal}>
          {t("createNewTask")}
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
            error={errors}
            setErrors={setErrors}
          />
        </Modal>
      )}
    </div>
  );
};

export default HeaderComponents;
