import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../css/EditCategory.css';

const EditCategory = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams(); // Get the category ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/categories/${id}`);
        setName(response.data.name);
        setColor(response.data.color);
        setIcon(response.data.icon);
      } catch (err) {
        setError("Failed to load category.");
      }
    };

    fetchCategory();
  }, [id]);

  const handleFileChange = (e) => {
    setIcon(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !color) {
      setError("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("color", color);
    if (icon) formData.append("icon", icon); // Only append the icon if it's changed

    try {
      await axios.put(`http://localhost:5000/api/v1/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/categories"); // Redirect to category list after successful update
    } catch (err) {
      setError("Error updating category. Please try again.");
    }
  };

  return (
    <div className="edit-category-page">
      <h2>Edit Category</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};

export default EditCategory;
