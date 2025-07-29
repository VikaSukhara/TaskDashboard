import { useEffect, useState } from "react";
import "./App.css";
import Header from "./header/Header";
import TaskContainers from "./TaskContainers/TaskContainers";
import styles from "./App.module.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const theme = localStorage.getItem("theme");
    return theme === "dark" ? true : false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className={styles.appWrapper}>
      <Header
        changeTheme={setIsDark}
        isDark={isDark}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        className={`${styles.headerWrapper} ${
          isSidebarOpen ? styles.shifted : ""
        }`}
      />
      <main
        className={`${styles.main} ${
          isSidebarOpen ? styles.mainWithSidebar : ""
        }`}
      >
        <TaskContainers />
      </main>
      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <div className={styles.sidebarTitleWrapper}>
          {" "}
          <h3 className={styles.sidebarTitle}>Notifications</h3>
        </div>

        <p className={styles.sidebarPar}>No notifications.</p>
      </aside>
    </div>
  );
}

export default App;
