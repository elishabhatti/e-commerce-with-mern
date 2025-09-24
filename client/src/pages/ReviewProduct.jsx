import { Camera } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReviewProduct = () => {
  const { id: purchaseId } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) {
      toast.error("Please write a review before submitting");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("purchaseId", purchaseId);
      formData.append("review", review);
      if (file) formData.append("image", file);

      const res = await fetch(
        "http://localhost:3000/api/review/review-product",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        toast.error("Failed to submit review");
        return;
      }

      const data = await res.json();
      toast.success(data.message || "Review submitted!");
      setReview("");
      setFile(null);
      setPreview("");
      navigate("/profile"); // redirect after submit (optional)
    } catch (err) {
      console.error("Review upload failed:", err);
      toast.error("Unexpected error while submitting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl w-full max-w-lg border border-gray-300  flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Review Your Product
        </h2>

        {/* Image Upload */}
        <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-gray-500 transition">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-28 h-28 object-cover rounded-lg border"
            />
          ) : (
            <>
              <Camera size={40} className="text-gray-500" />
              <span className="text-gray-600">
                Upload Product Image (Optional)
              </span>
            </>
          )}
        </label>

        {/* Review Input */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full h-28 resize-none border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewProduct;
