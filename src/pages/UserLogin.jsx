// src/pages/UserLogin.jsx
import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/UserLogin.css";

const UserLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the JWT token endpoint from SimpleJWT
      const response = await API.post("/token/", credentials);
      setToken(response.data.access);
      // Fetch user profile from the updated endpoint
      const profileResponse = await API.get("/accounts/users/profile/");
      setUser(profileResponse.data);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      console.error("Login error:", error.response || error);
      alert("Login failed. Check the console for details.");
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
