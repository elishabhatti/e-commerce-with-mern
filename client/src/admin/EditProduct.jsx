import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/admin/get-product/${id}`, {
        withCredentials: true,
      });
      setProduct(res.data.message); // Adjust if your response structure is different
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/admin/product/${id}`, product, {
        withCredentials: true,
      });
      alert("Product updated!");
      navigate("/admin-dashboard"); // or wherever you want
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Product Name"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Category"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Price"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Stock"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
