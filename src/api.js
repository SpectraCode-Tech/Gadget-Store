import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Your backend port
});

// Automatically inject JWT Token into requests if the user is logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
