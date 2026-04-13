"use client";

import { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo } from "../services/todoService";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTodo({
        title,
        completed: false,
      });
      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container" id="todo-app-container">
      <h1>Todo Paradise</h1>

      <form className="todo-form" onSubmit={handleSubmit} id="todo-form">
        <input
          className="todo-input"
          id="todo-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button className="add-button" type="submit" id="add-todo-btn">
          Add
        </button>
      </form>

      <ul className="todo-list" id="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo._id} id={`todo-item-${todo._id}`}>
            <span className="todo-text">{todo.title}</span>
            <button
              className="delete-button"
              id={`delete-btn-${todo._id}`}
              onClick={() => handleDelete(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "1rem" }}>
          No tasks left. Time to relax!
        </p>
      )}
    </div>
  );
}