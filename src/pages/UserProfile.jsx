// src/pages/UserProfile.jsx
import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const { token, user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const response = await API.get("/accounts/users/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if no user data is present
    if (!user) {
      fetchUser();
    }
  }, [token, user, setUser]);

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (!user)
    return <div className="profile-loading">No user data available.</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={user.profile_picture || "/assets/default-profile.png"}
            alt="Profile"
            className="profile-avatar"
          />
          <h2 className="profile-name">
            {user.first_name} {user.last_name}
          </h2>
        </div>
        <div className="profile-details">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* You can add more user details here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
