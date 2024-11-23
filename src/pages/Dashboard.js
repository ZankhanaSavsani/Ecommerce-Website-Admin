import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Dashboard.css';  // Assuming the CSS file is named Dashboard.css

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to the Admin Dashboard</h2>
        <p>Manage your orders, categories, and products effortlessly!</p>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>Category Management</h3>
          <div className="button-group">
            <button className="dashboard-button" onClick={() => handleNavigation("/add-category")}>Add Category</button>
            <button className="dashboard-button" onClick={() => handleNavigation("/edit-category-list")}>Edit Category</button>
            <button className="dashboard-button" onClick={() => handleNavigation("/categories")}>Delete Category</button>
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Product Management</h3>
          <div className="button-group">
            <button className="dashboard-button" onClick={() => handleNavigation("/add-product")}>Add Product</button>
            <button className="dashboard-button" onClick={() => handleNavigation("/products")}>Edit Product</button>
            <button className="dashboard-button" onClick={() => handleNavigation("/ProductDetails")}>Delete Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;