import { Sun, Moon, Bell } from "lucide-react";

import styles from "./Header.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";

export default function Header({ changeTheme, isDark }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    console.log("togglw")
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className={styles.headerWrapper}>
      <h1 className={styles.headerTitle}>Task Dashboard</h1>
      <div className={styles.btnWrapper}>
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
          <p>Here will be content!</p>
        </Modal>
      )}
    </div>
  );
}
