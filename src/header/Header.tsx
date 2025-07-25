import { Sun, Moon, Bell } from "lucide-react";

import styles from "./Header.module.css";

export default function Header({ changeTheme, isDark }) {
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
        <button className={styles.btnTask}>Create New Task</button>
      </div>
    </div>
  );
}
