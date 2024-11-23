import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/AddCategory.css'; // Assuming this is the CSS file for styling

// Define the file type map for image uploads
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const AddCategory = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("No file selected.");
      return;
    }

    // Validate the file type
    const isValid = FILE_TYPE_MAP[file.type];
    if (!isValid) {
      setError("Invalid file type. Only PNG, JPEG, and JPG are allowed.");
      setIcon(null); // Reset the file state if invalid
    } else {
      setIcon(file); // Set the selected file if valid
      setError(""); // Clear any previous error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !color || !icon) {
      setError("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("color", color);
    formData.append("icon", icon);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/categories"); // Redirect to category list after successful creation
    } catch (err) {
      setError("Error adding category. Please try again.");
    }
  };

  return (
    <div className="add-category-container">
      <div className="form-container">
        <h2>Add New Category</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="category-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Category Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <button type="submit" className="submit-button">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;