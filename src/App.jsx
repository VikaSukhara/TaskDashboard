import { useEffect, useState } from "react";
import "./App.css";
import Header from "./header/Header";

function App() {
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
    <div>
      <h1>Task Dashboard</h1>
      <Header changeTheme={setIsDark} isDark={isDark} />
    </div>
  );
}

export default App;
