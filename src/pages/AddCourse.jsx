// src/pages/AddCourse.jsx
import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/AddCourse.css";

const AddCourse = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/courses/", formData);
      alert("Course added successfully!");
      navigate("/courses/manage");
    } catch (error) {
      console.error("Error adding course", error);
      alert("Failed to add course.");
    }
  };

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} className="add-course-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course description"
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
