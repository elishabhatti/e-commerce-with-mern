import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId, quantity, size, price, title } = location.state || {};

  if (!productId) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        No product selected!
      </div>
    );
  }

const handleCOD = async () => {
  try {
    await axios.post(
      "http://localhost:3000/api/purchase/purchase-product",
      {
        productId,
        quantity,
        size,
        paymentMethod: "COD",
      },
      { withCredentials: true }
    );

    toast.success("Order placed with Cash on Delivery!");
    navigate("/purchase");
  } catch (err) {
    const msg =
      err.response?.data?.message || "Error placing order. Please try again.";
    toast.error(msg);
  }
};


  const handleJazzCash = () => {
    navigate("/jazzcash", {
      state: { productId, quantity, size, price, title },
    });
  };

  return (
    <div className="pt-30 flex justify-center items-center px-6">
      <div className="flex w-full max-w-5xl shadow-2xl rounded-3xl overflow-hidden bg-white">
        {/* Left side - Illustration */}
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-indigo-600 flex justify-center items-center p-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331941.png"
            alt="Payment Illustration"
            className="w-3/4 drop-shadow-lg"
          />
        </div>

        {/* Right side - Payment Card */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Complete Your Purchase
          </h2>

          {/* Product Card */}
          <div className="bg-gray-100 rounded-xl p-6 mb-6 shadow-inner">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-700 mt-2">
              <span className="font-medium">Quantity:</span> {quantity}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Size:</span> {size}
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-4">
              Total: ${price * quantity}
            </p>
          </div>

          {/* Payment Options */}
          <div className="space-y-4">
            <button
              onClick={handleCOD}
              className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition duration-200 shadow-md"
            >
              Cash on Delivery
            </button>

            <button
              onClick={handleJazzCash}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition duration-200 shadow-md"
            >
              Pay with JazzCash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
