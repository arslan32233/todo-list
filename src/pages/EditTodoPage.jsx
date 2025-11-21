import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodos, saveTodos } from "../utils.js";
import { toast } from "react-toastify";

export default function EditTodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const todos = getTodos();
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return toast.error("Title and Description cannot be empty!");
    }

    const todos = getTodos();
    const updatedTodos = todos.map((t) =>
      t.id === parseInt(id) ? { ...t, title, description } : t
    );
    saveTodos(updatedTodos);
    toast.success("Todo updated successfully!");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleUpdate}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
          Edit Todo
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Enter title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Enter description"
          required
        />
        <button
          type="submit"
          className="px-4 py-2  text-white rounded hover:bg-yellow-600 transition"
        >
          Update Todo
        </button>
      </form>
    </div>
  );
}
