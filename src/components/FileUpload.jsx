// src/components/FileUpload.jsx
import React, { useState, useEffect } from "react";
import API from "../services/api";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import "../styles/FileUpload.css"; // Custom CSS for FileUpload

const FileUpload = ({ endpoint, label }) => {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Only fetch files if token exists
  useEffect(() => {
    if (token) {
      fetchFiles();
    }
  }, [endpoint, token]);

  const fetchFiles = async () => {
    try {
      const response = await API.get(endpoint);
      setUploadedFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error.response || error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully");
      setFile(null); // Reset file input
      fetchFiles(); // Refresh file list after upload
    } catch (error) {
      console.error("Upload error:", error.response || error);
      alert("Upload failed. Check the console for more details.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await API.delete(`${endpoint}${fileName}/`);
      alert("File deleted successfully");
      fetchFiles(); // Refresh file list after deletion
    } catch (error) {
      console.error("Delete error:", error.response || error);
      alert("Failed to delete file. Check the console for more details.");
    }
  };

  if (!token) {
    return (
      <div className="file-upload-component">
        <p className="login-prompt">Please log in to view and upload files.</p>
      </div>
    );
  }

  return (
    <div className="file-upload-component">
      <form onSubmit={handleSubmit} className="file-upload-form mb-3">
        <div className="form-group mb-2">
          <label className="form-label">{label}</label>
          <input
            type="file"
            className="form-control custom-file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="btn custom-btn-upload"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <div className="uploaded-files">
        <h5 className="uploaded-files-title mb-3">Uploaded Files</h5>
        {uploadedFiles.length === 0 ? (
          <p className="text-muted">No files uploaded yet.</p>
        ) : (
          <div className="uploaded-files-grid">
            {uploadedFiles.map((fileItem, index) => (
              <div key={index} className="file-card">
                <div className="file-info">
                  <span className="file-name">{fileItem.file_name}</span>
                </div>
                <div className="file-actions">
                  <a
                    href={`http://127.0.0.1:8000${fileItem.file_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn custom-btn-view"
                  >
                    View
                  </a>
                  <button
                    className="btn custom-btn-delete"
                    onClick={() => handleDelete(fileItem.file_name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  endpoint: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FileUpload;
