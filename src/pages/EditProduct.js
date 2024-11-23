import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [richDescription, setRichDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [rating, setRating] = useState("");
  const [numReviews, setNumReviews] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product data by ID
    axios
      .get(`http://localhost:5000/api/v1/products/${id}`)
      .then((response) => {
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setRichDescription(product.richDescription || "");
        setBrand(product.brand || "");
        setCategory(product.category || "");
        setCountInStock(product.countInStock || "");
        setRating(product.rating || "");
        setNumReviews(product.numReviews || "");
        setIsFeatured(product.isFeatured || false);
      })
      .catch(() => {
        setError("Error fetching product data");
      });

    // Fetch categories for select dropdown
    axios
      .get("http://localhost:5000/api/v1/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => {
        setError("Error fetching categories");
      });
  }, [id]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !category) {
      setError("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("richDescription", richDescription);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("rating", rating);
    formData.append("numReviews", numReviews);
    formData.append("isFeatured", isFeatured);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/v1/products/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product updated successfully!");
      navigate("/products");
    } catch {
      setError("Error updating product. Please try again.");
    }
  };

  return (
    <div className="edit-product-page">
      <h2 className="title">Edit Product</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input-field"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea-field"
          required
        ></textarea>
        <textarea
          placeholder="Rich Description"
          value={richDescription}
          onChange={(e) => setRichDescription(e.target.value)}
          className="textarea-field"
        ></textarea>
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="input-field"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select-field"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Count in Stock"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Number of Reviews"
          value={numReviews}
          onChange={(e) => setNumReviews(e.target.value)}
          className="input-field"
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          Featured Product
        </label>
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button type="submit" className="submit-button">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
