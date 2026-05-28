import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/auth/users");
      setUsers(data);
    } catch (err) {
      setError("Failed to load users. Make sure you are logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleAdmin = async (id) => {
    try {
      const { data } = await API.put(`/auth/users/${id}/role`);
      setUsers(users.map((u) => (u._id === id ? { ...u, isAdmin: data.isAdmin } : u)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user role");
    }
  };

  if (loading) return <div className="admin-page-loading">Loading users...</div>;
  if (error) return <div className="admin-page-error">{error}</div>;

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="monospace-cell">{user._id}</td>
                <td>
                  <strong>{user.name}</strong>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.isAdmin ? "admin" : "user"}`}>
                    {user.isAdmin ? "Admin" : "Customer"}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleToggleAdmin(user._id)} className="role-toggle-btn">
                    {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
