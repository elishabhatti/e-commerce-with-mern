import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/products/products/${id}`,
          {
            withCredentials: true,
          }
        );
        setProduct(res.data.message);
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

  // const handleSubmit = async () => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:3000/api/purchase/purchase-product",
  //       {
  //         productId: product._id,
  //         quantity: Number(quantity),
  //         size,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     navigate("/purchase");
  //     console.log("Purchase Product:", res);
  //     toast.success("Purchase successful!");
  //   } catch (error) {
  //     console.error(error.response.data.message);
  //     toast.warning(error.response.data.message);
  //   }
  // };
  const handleSubmit = async () => {
    navigate("/payment", {
      state: {
        productId: product._id,
        quantity: Number(quantity),
        size,
        price: product.price,
        title: product.title,
      },
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full pt-7">
        <h1 className="text-4xl font-bold">Product Details</h1>
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
              className="bg-black text-white py-3 cursor-pointer rounded-md w-full hover:bg-gray-800 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
