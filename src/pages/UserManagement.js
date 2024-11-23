import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import LoadingSpinner from "../components/LoadingSpinner";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-management-page">
      <h2>User Management</h2>
      <Table
        columns={["Name", "Email"]}
        data={users.map((user) => ({
          Name: user.name,
          Email: user.email,
        }))}
      />
    </div>
  );
};

export default UserManagement;
