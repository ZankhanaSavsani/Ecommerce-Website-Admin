import axios from "axios";

// Set the base URL for the user-side server
const API_BASE_URL = "http://localhost:5000/api/v1"; // Change to your user-side server URL

// API instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authorization token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken"); // Get token from storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API service functions
export const adminLogin = (email, password) =>
  api.post("/admin/login", { email, password });

export const fetchUsers = () => api.get("/admin/users");

export const deleteUser = (userId) => api.delete(`/admin/users/${userId}`);

export const verifyOTP = (email, otp) =>
  api.post("/admin/verify-otp", { email, otp });

export default api;
