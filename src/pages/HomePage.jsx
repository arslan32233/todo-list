import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTodos, saveTodos } from "../utils.js";

import {
  TrashIcon,
  PencilSquareIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import { toast } from "react-toastify";

export default function HomePage() {
  const [todos, setTodos] = useState(getTodos());
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteModalId, setDeleteModalId] = useState(null);

  useEffect(() => saveTodos(todos), [todos]);

  const handleToggleCompleted = (id) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updated);
    toast.success(
      updated.find((t) => t.id === id).completed
        ? "Todo completed!"
        : "Todo pending!"
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
    setDeleteModalId(null);
    toast.info("Todo deleted!");
  };

  const filteredTodos = todos
    .filter((todo) =>
      filter === "all"
        ? true
        : filter === "completed"
        ? todo.completed
        : !todo.completed
    )
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => (sortBy === "newest" ? b.id - a.id : a.id - b.id));

  return (
    <div className="p-6 md:p-10 min-h-screen transition">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Todos</h2>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:text-white w-full md:w-1/3"
        />

        <div className="flex flex-wrap gap-2 items-center">
          {["all", "completed", "pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === f
                  ? " text-white dark:bg-white dark:text-black"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {filteredTodos.length === 0 ? (
        <p className="text-center mt-10">No todos found!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              handleToggleCompleted={handleToggleCompleted}
              setDeleteModalId={setDeleteModalId}
            />
          ))}
        </div>
      )}

      {deleteModalId && (
        <DeleteModal
          id={deleteModalId}
          handleDelete={handleDelete}
          setDeleteModalId={setDeleteModalId}
        />
      )}
    </div>
  );
}

function TodoCard({ todo, handleToggleCompleted, setDeleteModalId }) {
  return (
    <div className="flex flex-col justify-between p-5 bg-white dark:bg-gray-800 rounded-xl shadow dark:text-white">
      <div className="mb-4">
        <p
          className={`font-semibold text-lg ${
            todo.completed
              ? "line-through text-gray-400"
              : "text-gray-900 dark:text-white"
          }`}
   >
          {todo.title}
        </p>
        <p
          className={`${
            todo.completed
              ? "line-through text-gray-500"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {todo.description}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleCompleted(todo.id)}
            className="w-5 h-5 cursor-pointer accent-blue-500"
          />
          <span className="text-gray-700 dark:text-gray-300 text-sm">
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/edit/${todo.id}`}
            className="px-3 py-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-300/20 text-black dark:text-white"
          >
            <PencilSquareIcon className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setDeleteModalId(todo.id)}
            className="px-3 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-300/20 text-black dark:text-white"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ id, handleDelete, setDeleteModalId }) {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md w-80 flex flex-col gap-3 dark:text-white">
        <div className="flex items-center gap-2">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
          <span className="font-semibold">Are you sure?</span>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => setDeleteModalId(null)}
            className="px-4 py-2 rounded-lg border dark:border-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
