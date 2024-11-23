import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/EditCategoryList.css'; // Ensure this file has relevant styles

const EditCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (categoryId) => {
    navigate(`/edit-category/${categoryId}`);
  };

  return (
    <div className="edit-category-container">
      <div className="category-list-container">
        <h2>Edit Category</h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          <ul className="category-list">
            {categories.map((category) => (
              <li key={category._id} className="category-item">
                <span>{category.name || "Unnamed Category"}</span>
                <button onClick={() => handleEdit(category._id)} className="edit-button">Edit</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EditCategoryList;
