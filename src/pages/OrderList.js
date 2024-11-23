import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/OrderList.css"; // CSS for styling

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all orders from the API
    axios
      .get("http://localhost:5000/api/v1/orders")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching orders");
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    // Send request to update order status
    axios
      .put(`http://localhost:5000/api/v1/orders/${orderId}`, { status: newStatus })
      .then((response) => {
        // Update the order status in the local state
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
      })
      .catch(() => {
        setError("Error updating status");
      });
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="order-list-container">
      <h2 className="order-list-title">All Orders</h2>
      {error && <p className="error">{error}</p>}
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Date Ordered</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name || "Guest"}</td>
              <td>
                ₹
                {(order.totalPrice && !isNaN(order.totalPrice)
                  ? order.totalPrice
                  : 0
                ).toFixed(2)}
              </td>
              <td>{order.status || "Pending"}</td>
              <td>{new Date(order.dateOrdered).toLocaleString()}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Order complete">Order complete</option>
                  {/* You can add more statuses here if needed */}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
