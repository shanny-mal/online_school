// src/pages/ManageCourses.jsx
import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "../styles/ManageCourses.css";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await API.get("/courses/");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await API.delete(`/courses/${id}/`);
        alert("Course deleted successfully!");
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course", error);
        alert("Failed to delete course.");
      }
    }
  };

  return (
    <div className="manage-courses-container">
      <h2>Manage Courses</h2>
      <Link to="/courses/add" className="btn btn-success mb-3">
        Add New Course
      </Link>
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course.id} className="course-item">
            <span className="course-title">{course.title}</span>
            <div className="course-actions">
              <Link
                to={`/courses/edit/${course.id}`}
                className="btn btn-warning"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(course.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourses;
