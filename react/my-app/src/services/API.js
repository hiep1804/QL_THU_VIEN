import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // Đổi thành URL backend của bạn
  headers: { "Content-Type": "application/json" },
});

export default API;
