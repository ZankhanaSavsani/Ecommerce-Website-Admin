import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/ProductDelete.css';

const ProductDelete = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/products/${id}`);
      navigate('/products');
    } catch (err) {
      setError('Error deleting product');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-delete-page">
      <h1>Are you sure you want to delete {product.name}?</h1>
      <div className="delete-buttons">
        <button onClick={handleDelete} className="delete-button">Yes, delete</button>
        <button onClick={() => navigate('/products')} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default ProductDelete;
