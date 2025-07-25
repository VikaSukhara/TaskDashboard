import { Sun, Moon } from "lucide-react";

import styles from "./Header.module.css";

export default function Header({ changeTheme, isDark }) {
  return (
    <div>
      <button
        className={styles.btnTheme}
        onClick={() => changeTheme((prev) => !prev)}
      >
        {isDark ? <Sun className={styles.sunIcon} /> : <Moon />}
      </button>
    </div>
  );
}
