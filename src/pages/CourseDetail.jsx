import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import LessonContent from "../components/LessonContent";
import "../styles/CourseDetail.css";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await API.get(`/courses/${id}/`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <p className="course-description">{course.description}</p>

      <h3>Lessons</h3>
      {course.lessons && course.lessons.length > 0 ? (
        course.lessons.map((lesson) => (
          <LessonContent key={lesson.id} lesson={lesson} />
        ))
      ) : (
        <p>No lessons available.</p>
      )}
    </div>
  );
};

export default CourseDetail;
