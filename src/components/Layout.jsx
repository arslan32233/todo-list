import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { getTheme, saveTheme } from "../utils.js";

export default function Layout({ children }) {
  const [theme, setTheme] = useState(getTheme());
  const location = useLocation();

  useEffect(() => {
    document.body.className = theme;
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 dark:text-white transition">

      <header className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Todo App</h1>

        <div className="flex gap-3 items-center">

          {location.pathname === "/" && (
            <Link
              to="/add"
              className="px-4 py-2 text-white rounded"
            >
              Add Todo
            </Link>
          )}

          {location.pathname !== "/" && (
            <Link
              to="/"
              className="px-4 py-2  text-white rounded"
            >
              Home
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-full border dark:border-gray-600 flex items-center gap-2"
          >
            {theme === "light" ? (
              <MoonIcon className="w-6 h-6" />
            ) : (
              <SunIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {children}
    </div>
  );
}
