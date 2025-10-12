import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { getRequest, putRequest } from "../../utils/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getRequest(`/admin/get-product/${id}`);
        setFormData({
          image: product.image || "",
          title: product.title || "",
          description: product.description || "",
          price: product.price || "",
          brand: product.brand || "",
          rating: product.rating || "",
          reviews: product.reviews || "",
          isFeatured: product.isFeatured || false,
        });
      } catch (error) {
        console.error("Failed to fetch product", error);
        toast.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await putRequest(`/admin/update-product/${id}`, {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
      });

      toast.success("Product updated successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Failed to update product", error);
      toast.error("Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading product...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="border border-gray-300 rounded-xl p-8 w-full max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <img src={formData.image} alt="Product Image Preview" />
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
            label="Price (PKR)"
            name="price"
            type="text"
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
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-lg disabled:opacity-50"
            disabled={updating}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {updating ? "Updating Product..." : "Update Product"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProduct;
