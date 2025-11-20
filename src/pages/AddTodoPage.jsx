import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTodos, saveTodos } from "../utils.js";
import { toast } from "react-toastify";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return toast.error("Title and Description cannot be empty!");
    }

    const todos = getTodos();
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed,
    };

    saveTodos([...todos, newTodo]);
    toast.success("Todo added successfully!");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Add New Todo
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="w-5 h-5"
            />
            <label className="text-gray-700 dark:text-gray-300">
              Mark as Completed
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-lg font-semibold"
          >
            Add Todo
          </button>
        </form>
        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full flex items-center justify-center gap-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>
      </div>
    </div>
  );
}
