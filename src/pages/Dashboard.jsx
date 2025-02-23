import React, { useState, useEffect } from "react";
import API from "../services/api";
import CourseCard from "../components/CourseCard";
import FileUpload from "../components/FileUpload";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
              Welcome{user ? `, ${user.first_name}` : ""}.
            </p>
          </div>
        );
      // More sections...
    }
  };
  return (
    <div
      className={`dashboard-container ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sidebar-toggle-btn"
      >
        ☰
      </button>
      {renderContent()}
    </div>
  );
};
export default Dashboard;
