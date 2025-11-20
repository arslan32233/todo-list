import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes as Switch, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AddTodoPage from "./pages/AddTodoPage.jsx";
import EditTodoPage from "./pages/EditTodoPage.jsx";
import { getTheme, saveTheme } from "./utils.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Routes() {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    document.body.className = theme; // <-- body par class
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Router>
      <div className="min-h-screen p-6 transition-colors duration-300">
        <header className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Todo App</h1>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={toggleTheme}
              className="px-4 py-2  text-white rounded hover:bg-blue-600 transition"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            <Link to="/" className="px-4 py-2  text-white rounded hover:bg-green-600 transition">Home</Link>
            <Link to="/add" className="px-4 py-2  text-white rounded hover:bg-yellow-600 transition">Add Todo</Link>
          </div>
        </header>

        <Switch>
          <Route path="/" element={<HomePage theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/add" element={<AddTodoPage theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/edit/:id" element={<EditTodoPage theme={theme} toggleTheme={toggleTheme} />} />
        </Switch>

        <ToastContainer position="bottom-center" autoClose={2000} />
      </div>
    </Router>
  );
}
