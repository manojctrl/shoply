import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import "./AddProduct.css";

const AddProduct = () => {
  const { id } = useParams(); // URL parameter if editing
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    discount: "",
    image: "",
    category: "फेशन",
    subcategory: "",
    countInStock: "10",
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const fetchProductDetails = async () => {
        setFetching(true);
        try {
          const { data } = await API.get(`/products/${id}`);
          setFormData({
            name: data.name || "",
            brand: data.brand || "",
            price: data.price || "",
            originalPrice: data.originalPrice || "",
            discount: data.discount || "",
            image: data.image || "",
            category: data.category || "फेशन",
            subcategory: data.subcategory || "",
            countInStock: data.countInStock || "10",
          });
        } catch (err) {
          setErrorMsg("Failed to fetch product details.");
        } finally {
          setFetching(false);
        }
      };
      fetchProductDetails();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Calculate discount if originalPrice and price are entered
    const priceNum = parseFloat(formData.price);
    const origPriceNum = parseFloat(formData.originalPrice || formData.price);
    let discountNum = parseInt(formData.discount);

    if (origPriceNum > priceNum && !formData.discount) {
      discountNum = Math.round(((origPriceNum - priceNum) / origPriceNum) * 100);
    }

    const payload = {
      ...formData,
      price: priceNum,
      originalPrice: origPriceNum,
      discount: discountNum || 0,
      countInStock: parseInt(formData.countInStock || 10),
    };

    try {
      if (isEditMode) {
        await API.put(`/products/${id}`, payload);
      } else {
        await API.post("/products", payload);
      }
      navigate("/products");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="admin-page-loading">Fetching product details...</div>;

  return (
    <div className="add-product-container">
      <h2>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
      {errorMsg && <p className="error-message" style={{ color: "red", margin: "15px 0" }}>{errorMsg}</p>}
      
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. महिला वाइड लेग हाई-राइज"
            />
          </div>

          <div className="form-group">
            <label>Brand *</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              placeholder="e.g. फ्लाइङ मेशिन"
            />
          </div>

          <div className="form-group">
            <label>Selling Price (Rs) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="999"
            />
          </div>

          <div className="form-group">
            <label>Original Price (Rs) (Optional)</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              placeholder="1200"
            />
          </div>

          <div className="form-group">
            <label>Discount (%) (Optional)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="10"
            />
          </div>

          <div className="form-group">
            <label>Stock Count *</label>
            <input
              type="number"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleChange}
              required
              placeholder="10"
            />
          </div>

          <div className="form-group">
            <label>Main Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="फेशन">फेशन</option>
              <option value="विद्युत सामग्रीहरू">विद्युत सामग्रीहरू</option>
              <option value="खुट्टाका जुत्ता">खुट्टाका जुत्ता</option>
              <option value="किराना सामान">किराना सामान</option>
              <option value="सौन्दर्य">सौन्दर्य</option>
              <option value="स्वास्थ्य">स्वास्थ्य</option>
              <option value="गहना">गहना</option>
            </select>
          </div>

          <div className="form-group">
            <label>Sub Category (Optional)</label>
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              placeholder="e.g. महिला"
            />
          </div>
        </div>

        <div className="form-group image-group">
          <label>Image URL *</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            placeholder="https://images.unsplash.com/..."
          />
          {formData.image && (
            <div className="image-preview">
              <span className="preview-label">Preview:</span>
              <img src={formData.image} alt="preview" className="img-preview-box" />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate("/products")} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
