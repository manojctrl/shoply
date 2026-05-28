import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete product");
      }
    }
  };

  if (loading) return <div className="admin-page-loading">Loading products...</div>;
  if (error) return <div className="admin-page-error">{error}</div>;

  return (
    <div className="manage-products-container">
      <div className="manage-header">
        <h2>Manage Products</h2>
        <Link to="/products/add" className="add-btn-link">
          + Add New Product
        </Link>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  <img src={p.image} alt={p.name} className="product-table-img" />
                </td>
                <td className="product-name-cell">{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.category}</td>
                <td>Rs {p.price}</td>
                <td>{p.countInStock}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/products/edit/${p._id}`} className="edit-btn">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(p._id)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
