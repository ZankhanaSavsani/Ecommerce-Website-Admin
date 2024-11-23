import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CategoryList from "./pages/CategoryList";
import UserManagement from "./pages/UserManagement";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import DeleteCategory from "./pages/DeleteCategory";
import EditCategoryList from "./pages/EditCategoryList";
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductDelete from './pages/ProductDelete';
import ProductDetails from "./pages/ProductDetails";
import OrderList from "./pages/OrderList";


const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute> <UserManagement /></ProtectedRoute>} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />
            <Route path="/delete-category/:id" element={<DeleteCategory />} />
            <Route path="/edit-category-list" element={<EditCategoryList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            {/* <Route path="/add-product/:categoryId" element={<AddProduct />} /> */}
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/delete-product/:id" element={<ProductDelete />} />
            <Route path="/ProductDetails" element={<ProductDetails />} />
            <Route path="/OrderList" element={<OrderList />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
