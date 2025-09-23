import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ReviewProduct = () => {
  const { id: purchaseId } = useParams(); // yaha id = purchaseId hai
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/purchase/review-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchaseId,
          review,
        }),
      });

      const data = await res.json();
      setMessage(data.message || "Something went wrong");
      setReview("");
    } catch (error) {
      setMessage("Error while submitting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Add Review for Purchase ID: {purchaseId}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          rows="4"
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default ReviewProduct;
