// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://shannytechsolutions-prod-1840c2ea8c47.herokuapp.com//api", // Update this URL based on your backend configuration
});

// Request interceptor to add Authorization header if token exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // Alternatively, you could get it from your auth context
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor for handling 401 errors, etc.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login or refresh token)
      console.error("Unauthorized, please login again.");
      // Optionally, you can remove the token and redirect:
      // localStorage.removeItem("access_token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
