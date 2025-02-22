// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import API from "../services/api";
import CourseCard from "../components/CourseCard";
import FileUpload from "../components/FileUpload";
import "../styles/Dashboard.css"; // Your custom Dashboard styles

const Dashboard = () => {
  // State to track which dashboard section is active
  const [activeSection, setActiveSection] = useState("home");
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  // Function to fetch courses
  const fetchCourses = async () => {
    setCoursesLoading(true);
    try {
      const response = await API.get("/courses/");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setCoursesLoading(false);
    }
  };

  // When activeSection becomes "myCourses" or "manageCourses", fetch courses
  useEffect(() => {
    if (activeSection === "myCourses" || activeSection === "manageCourses") {
      fetchCourses();
    }
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className="dashboard-home">
            <h2>User Dashboard</h2>
            <p className="dashboard-lead">
              Welcome to your dashboard. Use the sidebar to navigate between
              sections.
            </p>
          </div>
        );
      case "myCourses":
        return (
          <div className="dashboard-section">
            <h2>My Courses</h2>
            {coursesLoading ? (
              <p>Loading courses...</p>
            ) : courses.length > 0 ? (
              <div className="courses-grid">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <p>No courses enrolled yet.</p>
            )}
          </div>
        );
      case "manageCourses":
        return (
          <div className="dashboard-section">
            <h2>Manage Courses</h2>
            {coursesLoading ? (
              <p>Loading courses...</p>
            ) : courses.length > 0 ? (
              <div className="courses-grid">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <p>No courses available for management.</p>
            )}
          </div>
        );
      case "addCourse":
        return (
          <div className="dashboard-section">
            <h2>Add New Course</h2>
            <p>Course creation form goes here.</p>
          </div>
        );
      case "uploadFiles":
        return (
          <div className="dashboard-upload-grid">
            <div className="upload-section">
              <h4>Upload Video</h4>
              <FileUpload endpoint="/upload/video/" label="Upload Video" />
            </div>
            <div className="upload-section">
              <h4>Upload PDF</h4>
              <FileUpload endpoint="/upload/pdf/" label="Upload PDF" />
            </div>
            <div className="upload-section">
              <h4>Upload Image</h4>
              <FileUpload endpoint="/upload/image/" label="Upload Image" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <ul>
          <li
            className={activeSection === "home" ? "active" : ""}
            onClick={() => setActiveSection("home")}
          >
            Home
          </li>
          <li
            className={activeSection === "myCourses" ? "active" : ""}
            onClick={() => setActiveSection("myCourses")}
          >
            My Courses
          </li>
          <li
            className={activeSection === "manageCourses" ? "active" : ""}
            onClick={() => setActiveSection("manageCourses")}
          >
            Manage Courses
          </li>
          <li
            className={activeSection === "addCourse" ? "active" : ""}
            onClick={() => setActiveSection("addCourse")}
          >
            Add New Course
          </li>
          <li
            className={activeSection === "uploadFiles" ? "active" : ""}
            onClick={() => setActiveSection("uploadFiles")}
          >
            Upload Files
          </li>
        </ul>
      </aside>
      <section className="dashboard-content">{renderContent()}</section>
    </div>
  );
};

export default Dashboard;
