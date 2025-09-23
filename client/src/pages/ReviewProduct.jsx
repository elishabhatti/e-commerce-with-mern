import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ReviewProduct = () => {
  const { id } = useParams();
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // yaha tu backend ko review bhejega
    const res = await fetch("http://localhost:3000/api/purchase/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: id,
        review: review,
      }),
    });

    const data = await res.json();
    console.log(data);
    setReview(""); // clear input after submit
  };

  return (
    <div className="p-4">
      <h2>Add Review for Product ID: {id}</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          rows="5"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewProduct;
