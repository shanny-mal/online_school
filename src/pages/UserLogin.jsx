// src/pages/UserLogin.jsx
import React from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaGoogle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../styles/UserLogin.css";

// Define validation schema using Zod
const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

const UserLogin = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Use the JWT token endpoint from SimpleJWT
      const response = await API.post("/token/", data);
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

  // Placeholder function for Google Login
  const handleGoogleLogin = async () => {
    alert("Google login not implemented yet.");
    // Integrate Google Identity Services here.
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>

      <div className="additional-links">
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
        <span className="separator">|</span>
        <Link to="/register" className="sign-up-link">
          Sign Up
        </Link>
      </div>

      <div className="social-login">
        <p>or log in with</p>
        <button className="btn btn-google" onClick={handleGoogleLogin}>
          <FaGoogle /> Login with Google
        </button>
      </div>
      <div className="social-icons">
        <a href="#" className="social-icon" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="#" className="social-icon" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="#" className="social-icon" aria-label="Instagram">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default UserLogin;
