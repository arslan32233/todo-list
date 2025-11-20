export const getTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  if (todos.length === 0) {
    const defaultTodos = [
      { id: 1, title: "Learn React", description: "Understand hooks and components", completed: false },
      { id: 2, title: "Build Todo App", description: "Use Tailwind + React + localStorage", completed: false },
      { id: 3, title: "Practice JS", description: "ES6, DOM, fetch API", completed: false }
    ];
    localStorage.setItem("todos", JSON.stringify(defaultTodos));
    return defaultTodos;
  }
  return todos;
};

export const saveTodos = (todos) => localStorage.setItem("todos", JSON.stringify(todos));

export const getTheme = () => localStorage.getItem("theme") || "light";
export const saveTheme = (theme) => localStorage.setItem("theme", theme);
