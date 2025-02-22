// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Import custom Home styles

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShannyTechSolution Learning Platform</h1>
          <p>Your journey to knowledge starts here.</p>
          <div className="hero-btn-group">
            <Link to="/login" className="btn hero-btn">
              Login
            </Link>
            <Link to="/register" className="btn hero-btn secondary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
