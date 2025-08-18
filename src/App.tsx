import { useEffect, useState } from "react";
import "./App.css";
import Header from "./HeaderComponents/HeaderComponents";
import TaskContainers from "./TaskContainers/TaskContainers";
import styles from "./App.module.scss";
import { v4 as uuidv4 } from "uuid";
import { Toast, Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import cn from "classnames";

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

export type TaskType = {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: Priority;
  assigned: string;
  status: Status;
  createdAt: string;
};

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const theme = localStorage.getItem("theme");
    return theme === "dark" ? true : false;
  });
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<
    { id: string; message: string; date: string }[]
  >(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  const [hasUnread, setHasUnread] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (isSidebarOpen) {
      setHasUnread(false);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const addNotification = (message: string) => {
    const newNotification = {
      id: uuidv4(),
      message,
      date: new Date().toLocaleString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setHasUnread(true);
    toast.success(
      (toastObj) => (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5 style={{ fontSize: "18px", fontWeight: "600" }}>
              {t("newNotificatio")}
            </h5>

            <div>
              <p style={{ fontSize: "16px", fontWeight: "400" }}>
                {t("success")} "{message}"
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.dismiss(toastObj.id);
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(45deg)",
            }}
          >
            <Plus size={20} width={20} />
          </button>
        </>
      ),
      {
        style: {
          background: "#3b82f6",
          color: "#fff",
          padding: "8px",
          borderRadius: "6px",
          fontSize: "14px",
          whiteSpace: "pre-line",
        },
        icon: null,
        duration: 5000,
      }
    );
  };

  const addTask = (newTask: TaskType) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className={styles.appWrapper}>
      <Header
        changeTheme={setIsDark}
        isDark={isDark}
        setIsSidebarOpen={setIsSidebarOpen}
        className={cn(styles.headerWrapper, {
          [styles.shifted]: isSidebarOpen,
        })}
        addTask={addTask}
        addNotification={addNotification}
        hasUnread={hasUnread}
      />
      <main
        className={cn(styles.main, { [styles.mainWithSidebar]: isSidebarOpen })}
      >
        <TaskContainers
          tasks={tasks}
          setTasks={setTasks}
          isSidebarOpen={isSidebarOpen}
        />
      </main>
      <aside
        className={cn(styles.sidebar, {
          [styles.sidebarOpen]: isSidebarOpen,
          [styles.sidebarClosed]: !isSidebarOpen,
        })}
      >
        <div className={styles.sidebarTitleWrapper}>
          <h3 className={styles.sidebarTitle}> {t("notifications")}</h3>
        </div>

        {notifications ? (
          <ul>
            {notifications.map((n) => (
              <li key={n.id} className={styles.notificationsList}>
                <p className={styles.notificationsTitle}>{n.message}</p>

                <p className={styles.notificationsData}>{n.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.sidebarPar}>{t("noNotifications")}.</p>
        )}
      </aside>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
