import React, { useState, useEffect } from "react";
import Routes from "./Routes.jsx";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme; 
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return <Routes theme={theme} toggleTheme={toggleTheme} />;
}
