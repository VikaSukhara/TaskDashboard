import { Sun, Moon, Bell } from "lucide-react";

import styles from "./Header.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import TaskCreation from "../TaskCreation/TaskCreation";

type dataType = {
  title: string;
  description: string;
  date: string;
  priority: "medium" | "large" | "high";
  assigned: string;
};

type HeaderProps = {
  changeTheme: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
};

export default function Header({ changeTheme, isDark }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [dataFromFrom, setDataFromFrom] = useState<dataType>({
    title: "",
    description: "",
    date: "",
    priority: "medium",
    assigned: "",
  });

  const toggleModal = () => {
    if (!isModalOpen) {
      setStep(1);
      setDataFromFrom({
        title: "",
        description: "",
        date: "",
        priority: "medium",
        assigned: "",
      });
    }

    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = () => {
    console.log("Submitted data:", dataFromFrom);
    setIsModalOpen(false);
    setStep(1);
  };

  return (
    <div className={styles.headerWrapper}>
      <h1 className={styles.headerTitle}>Task Dashboard</h1>
      <div className={styles.btnNavWrapper}>
        {" "}
        <button
          className={styles.btnTheme}
          onClick={() => changeTheme((prev) => !prev)}
        >
          {isDark ? <Sun className={styles.sunIcon} /> : <Moon />}
        </button>
        <button className={styles.btnTheme}>
          <Bell className={styles.icon} />
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
          />
        </Modal>
      )}
    </div>
  );
}
