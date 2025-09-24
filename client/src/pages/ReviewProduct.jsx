import { Camera } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ReviewProduct = () => {
  const { id: purchaseId } = useParams();
  const [review, setReview] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) {
      setMessage("Please write a review before submitting.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("purchaseId", purchaseId);
      formData.append("review", review);
      if (file) formData.append("image", file);

      const res = await fetch("http://localhost:3000/api/purchase/review-product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message || "Review submitted successfully!");
      setReview("");
      setFile(null);
    } catch (error) {
      setMessage("Error while submitting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-gray-300 rounded-2xl p-6 flex flex-col gap-5"
      >
        <h1 className="font-bold text-2xl text-center">Review Your Product</h1>

        {/* File Upload */}
        <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-gray-500 transition">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Camera size={40} className="text-gray-500" />
          <span className="text-gray-600">
            {file ? file.name : "Upload Product Image (Optional)"}
          </span>
        </label>

        {/* Review Input */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full h-24 resize-none border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm mt-2 text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ReviewProduct;
