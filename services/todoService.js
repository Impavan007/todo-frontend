import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({ baseURL: API_URL });

export const getTodos = async () => {
  const res = await api.get("/api/todos");
  return res.data;
};

export const createTodo = async (payload) => {
  const res = await api.post("/api/todos", payload);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await api.delete(`/api/todos/${id}`);
  return res.data;
};