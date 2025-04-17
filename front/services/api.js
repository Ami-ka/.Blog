import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.176.33:8000/api/v1",
});

export const loginUser = (email, password) => {
  return api.post("/login", { email, password });
};

export const registerUser = (name, email, password) => {
  return api.post("/register", { name, email, password });
};

export default api;
