import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/CategoryList.css'; // Assuming this is the CSS file for styling

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/categories");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this will run only once when the component is mounted

  // Handle delete category redirection
  const handleDeleteClick = (categoryId) => {
    navigate(`/delete-category/${categoryId}`); // Corrected template literal here
  };

  return (
    <div className="category-list-container">
      <div className="category-list-header">
        <h2>All Categories</h2>
        {error && <p className="error-message">{error}</p>}
      </div>
      
      <div className="category-list-content">
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="category-item">
              <div className="category-info">
                <h3>{category.name}</h3>
              </div>
              <div className="category-actions">
                <button className="delete-button" onClick={() => handleDeleteClick(category._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
