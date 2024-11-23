import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Use Link to navigate to the EditProduct page
import "../css/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all products from the API
    axios
      .get("http://localhost:5000/api/v1/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setError("Error fetching products");
      });
  }, []);

  return (
    <div className="product-list">
      <h2>Product List</h2>
      {error && <p className="error">{error}</p>}
      <table>
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
              <td>₹{product.price}</td>
              <td>
                <Link to={`/edit-product/${product._id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
