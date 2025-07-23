import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input"; // Make sure this path is correct
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/api";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
    brand: "",
    rating: "",
    reviews: "",
    isFeatured: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await postRequest("/admin/create-product", {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
      });

      console.log(res);
      toast.success("Product created successfully!");
      navigate("/");

      setFormData({
        image: "",
        title: "",
        description: "",
        price: "",
        brand: "",
        rating: "",
        reviews: "",
        isFeatured: false,
      });
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="border border-gray-300 rounded-xl p-8 w-full max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {formData.image.length > 0 ? (
            <img
              src={formData.image}
              alt="Product Image Preview"
              className="w-full h-64 object-contain rounded border border-gray-300"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center border border-dashed border-gray-300 text-gray-400 rounded">
              No image URL provided
            </div>
          )}

          <Input
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/product.jpg"
            required
          />

          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Wooden Chair"
            required
          />

          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description"
          />

          <Input
            label="Price (USD)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <Input
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="e.g. Wayfair"
          />

          <Input
            label="Rating"
            name="rating"
            type="number"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            placeholder="e.g. 4.5"
          />

          <Input
            label="Reviews"
            name="reviews"
            type="number"
            value={formData.reviews}
            onChange={handleChange}
            placeholder="e.g. 100"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label htmlFor="isFeatured" className="text-sm text-gray-700">
              Mark as Featured
            </label>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out font-semibold text-lg disabled:opacity-50"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {loading ? "Creating Product..." : "Create Product"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateProduct;
