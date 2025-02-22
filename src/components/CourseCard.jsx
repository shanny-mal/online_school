// src/components/CourseCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/CourseCard.css"; // Make sure the CSS file is in the correct folder

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      {course.image && (
        <img src={course.image} alt={course.title} className="course-img" />
      )}
      <div className="course-content">
        <h5>{course.title}</h5>
        <p>
          {course.description.length > 100
            ? course.description.substring(0, 100) + "..."
            : course.description}
        </p>
        <Link
          to={`/courses/${course.id}`}
          className="btn btn-primary course-card-btn"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
