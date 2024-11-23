import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AddProduct.css";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    richDescription: "",
    brand: "",
    price: 0,
    category: "",
    countInStock: 0,
    isFeatured: false,
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/categories");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/png", "image/jpeg"].includes(file.type)) {
      setImage(file);
      setError("");
    } else {
      setError("Invalid image type. Please upload a PNG or JPEG image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please upload an image for the product.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("richDescription", productData.richDescription);
    formData.append("brand", productData.brand);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("countInStock", productData.countInStock);
    formData.append("isFeatured", productData.isFeatured);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data) {
        navigate("/products");
      }
    } catch (err) {
      setError("Error creating product. Please try again.");
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="form-title">Add New Product</h2>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit} className="product-form">
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          placeholder="Enter product name"
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          placeholder="Enter a brief description"
          required
        />

        <label>Rich Description:</label>
        <textarea
          name="richDescription"
          value={productData.richDescription}
          onChange={handleInputChange}
          placeholder="Enter detailed description"
        />

        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={productData.brand}
          onChange={handleInputChange}
          placeholder="Enter product brand"
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          placeholder="Enter price"
          required
        />

        <label>Category:</label>
        <select
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label>Count In Stock:</label>
        <input
          type="number"
          name="countInStock"
          value={productData.countInStock}
          onChange={handleInputChange}
          placeholder="Enter stock count"
          required
        />

        {/* <label>Featured Product:</label>
        <input
          type="checkbox"
          name="isFeatured"
          checked={productData.isFeatured}
          onChange={() =>
            setProductData((prevData) => ({
              ...prevData,
              isFeatured: !prevData.isFeatured,
            }))
          }
        /> */}

        <label>Product Image:</label>
        <input type="file" onChange={handleFileChange} required />

        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;