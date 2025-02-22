import React from "react";
import "../styles/LessonContent.css";

const LessonContent = ({ lesson }) => {
  return (
    <div className="lesson-content">
      <h3>{lesson.title}</h3>
      <p>{lesson.content}</p>

      {lesson.video && (
        <div className="lesson-video">
          <video controls>
            <source src={lesson.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {lesson.pdf && (
        <div className="lesson-pdf">
          <a
            href={lesson.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View PDF
          </a>
        </div>
      )}

      {lesson.image && (
        <div className="lesson-image">
          <img src={lesson.image} alt={lesson.title} />
        </div>
      )}
    </div>
  );
};

export default LessonContent;
