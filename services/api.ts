import axios from "axios";

const api = axios.create({
  baseURL: "https://test-api-y04b.onrender.com",
});

export default api;
