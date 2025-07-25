import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { getRequest } from "../../utils/api";

const CartDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("M");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getRequest(`/products/products/${id}`);
        setProduct(data); 
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading)
    return (
      <div className="p-10">
        <LoadingSpinner />
      </div>
    );

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/cart/cart-product",
        {
          productId: product._id,
          quantity: Number(quantity),
          size,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/cart");
      console.log("Cart Product:", res);
      toast.success("Cart successful!");
    } catch (error) {
      console.error("Cart failed:", error);
      toast.warning("Cart failed!");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full pt-7">
        <h1 className="text-4xl font-bold">Cart Details</h1>
      </div>
      <div className="p-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[500px] object-cover rounded-xl"
          />
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-600 mb-2">Brand: {product.brand}</p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-semibold text-black">
                ${product.price}
              </span>
              <span className="text-yellow-500 text-sm">
                ⭐ {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {product.isFeatured && (
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-4">
                Featured
              </span>
            )}

            {/* Quantity Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-20"
              />
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-32"
              >
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </select>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={() => handleSubmit()}
              className="bg-black text-white py-3 flex justify-center items-center gap-2 cursor-pointer rounded-md w-full hover:bg-gray-800 transition"
            >
              Add To Cart <ShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
