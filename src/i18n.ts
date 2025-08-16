import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      taskDashboard: "Task Dashboard",
      createNewTask: "Create New Task",
      title: "Title",
      description: "Description",
      dueDate: "Due Date",
      priority: "Priority",
      assignedTo: "Assigned To",
      status: "Status",
      createdAt: "Created at",
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      taskDetails: "Task Details",
      deleteConfirmation: "Do you want to delete the task?",
      yes: "Yes",
      no: "No",
      low: "Low",
      medium: "Medium",
      high: "High",
      newNotificatio: "New Notification",
      success: "Task created successfully",
      notifications: "Notifications",
      noNotifications: "No Notifications",
      toDo: "To Do",
      inProgress: "In Progress",
      done: "Done",
      taskSaved: "Your changes are saved",
      errors: {
        titleRequired: "Title is required",
        descriptionRequired: "Description is required",
      },
    },
  },
  uk: {
    translation: {
      taskDashboard: "Панель завдань",
      createNewTask: "Створити нове завдання",
      title: "Заголовок",
      description: "Опис",
      dueDate: "Термін виконання",
      priority: "Пріоритет",
      assignedTo: "Відповідальний",
      status: "Статус",
      createdAt: "Створено",
      next: "Далі",
      previous: "Назад",
      submit: "Відправити",
      taskDetails: "Деталі завдання",
      deleteConfirmation: "Ви хочете видалити завдання?",
      yes: "Так",
      no: "Ні",
      low: "Низький",
      medium: "Середній",
      high: "Високий",
      newNotificatio: "Нове сповіщення",
      success: "Завдання успішно створено",
      notifications: "Сповіщення",
      noNotifications: "Немає сповіщень",
      toDo: "До виконання",
      inProgress: "В процесі",
      done: "Завершено",
      taskSaved: "Ваші зміни збережено",
      errors: {
        titleRequired: "Це поле обов'язкове",
        descriptionRequired: "Це поле обов'язкове",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
