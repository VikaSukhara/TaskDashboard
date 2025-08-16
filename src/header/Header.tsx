import React from "react";
import { TaskType } from "../App";
import HeaderComponents from "../HeaderComponents/HeaderComponents";

type HeaderProps = {
  changeTheme: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  addTask: (task: TaskType) => void;
  addNotification: (message: string) => void;
  hasUnread: boolean;
};

const Header: React.FC<HeaderProps> = (props) => {
  return <HeaderComponents {...props} />;
};

export default Header;
