import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AddTodoPage from "./pages/AddTodoPage.jsx";
import EditTodoPage from "./pages/EditTodoPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppRoutes() {
  return (
    <Router>
      <div className="min-h-screen p-6">

        <header className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold">Todo App</h1>

          <div className="flex gap-2 flex-wrap">
            <Link to="/" className="px-4 py-2 bg-green-500 text-white rounded">
              Home
            </Link>

            <Link to="/add" className="px-4 py-2 bg-yellow-500 text-white rounded">
              Add Todo
            </Link>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddTodoPage />} />
          <Route path="/edit/:id" element={<EditTodoPage />} />
        </Routes>

        <ToastContainer position="bottom-center" autoClose={2000} />
      </div>
    </Router>
  );
}
