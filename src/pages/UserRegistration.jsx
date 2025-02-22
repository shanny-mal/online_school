// src/pages/UserRegistration.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/UserRegistration.css";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";

// Define a validation schema using Zod
const registrationSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  first_name: z.string().nonempty("First name is required"),
  last_name: z.string().nonempty("Last name is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const UserRegistration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await API.post("/accounts/register/", data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response || error);
      alert("Registration failed. Check the console for details.");
    }
  };

  return (
    <div className="registration-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
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
          <label>First Name</label>
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Enter your first name"
              {...register("first_name")}
            />
          </div>
          {errors.first_name && (
            <p className="error-message">{errors.first_name.message}</p>
          )}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Enter your last name"
              {...register("last_name")}
            />
          </div>
          {errors.last_name && (
            <p className="error-message">{errors.last_name.message}</p>
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
          Register
        </button>
      </form>
      <div className="registration-extra">
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegistration;
