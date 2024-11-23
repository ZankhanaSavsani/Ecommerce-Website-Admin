import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../css/DeleteCategory.css'; // Assuming this is the CSS file for styling

const DeleteCategory = () => {
  const [category, setCategory] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the category id from the URL

  useEffect(() => {
    // Fetch category data to display for deletion
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/categories/${id}`);
        setCategory(response.data);
      } catch (err) {
        setError("Failed to fetch category.");
      }
    };

    fetchCategory();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/categories/${id}`);
      navigate("/categories"); // Redirect to the category list after successful deletion
    } catch (err) {
      setError("Error deleting category.");
    }
  };

  return (
    <div className="delete-category-container">
      <div className="form-container">
        <h2>Delete Category</h2>
        {error && <p className="error-message">{error}</p>}
        {category ? (
          <>
            <p>Are you sure you want to delete the category: <strong>{category.name}</strong>?</p>
            <div className="button-group">
              <button onClick={handleDelete} className="delete-button">Yes, Delete</button>
              <button onClick={() => navigate("/categories")} className="cancel-button">Cancel</button>
            </div>
          </>
        ) : (
          <p>Loading category details...</p>
        )}
      </div>
    </div>
  );
};

export default DeleteCategory;
