import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]); // store reviews

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/products/products/${id}`,
        { withCredentials: true }
      );
      setProduct(res.data.message);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/review/get-review-product`,
        { withCredentials: true }
      );
      const filteredReviews = res.data.message.filter(
        (review) => review.product?.product?.toString() === id
      );

      setReviews(filteredReviews);
    } catch (error) {
      console.error("Error fetching review product details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
      fetchReviewProducts();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-10">
        <LoadingSpinner />
      </div>
    );
  }

  const handleSubmit = () => {
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
              onClick={handleSubmit}
              className="bg-black text-white py-3 cursor-pointer rounded-md w-full hover:bg-gray-800 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-6xl mx-auto p-10">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border flex justify-between items-start border-gray-300 rounded-xl p-6 transition"
              >
                {/* User Info */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`http://localhost:3000${review.user?.avatar}`}
                    alt={review.user?.name}
                    className="w-14 h-14 object-cover rounded-full border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {review.user?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {review.user?.email}
                    </p>
                    <p className="text-xs text-gray-400">
                      Reviewed on{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Review Content */}
                <div className="pl-2">
                  <p className="text-gray-800 mb-3">{review.comment}</p>
                  {review.photo && (
                    <img
                      src={`http://localhost:3000${review.photo}`}
                      alt="review"
                      className="w-40 h-40 object-cover rounded-md border"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
