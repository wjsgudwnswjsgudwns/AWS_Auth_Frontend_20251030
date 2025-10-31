import axios from "axios";

const api = axios.create({
  baseURL: "http://43.203.95.217",
  // baseURL: "http://localhost:8888",
  //   withCredentials: true,
});

export default api;
