import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Use Link to navigate to the DeleteProduct page
import "../css/ProductDetails.css"; // Import the CSS file

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all products from the API
    axios
      .get("http://localhost:5000/api/v1/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        setError("Error fetching products");
      });
  }, []);

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Product List</h2>
      {error && <p className="error">{error}</p>}
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>₹{product.price.toFixed(2)}</td>
              <td>
                <Link to={`/delete-product/${product._id}`}>
                  <button className="delete-button">Delete</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
