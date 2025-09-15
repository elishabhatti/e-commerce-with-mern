import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const JazzCashPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId, quantity, size, price, title } = location.state || {};

  const [number, setNumber] = useState("");
  const [pin, setPin] = useState("");

  if (!productId) {
    return (
      <div className="p-10 text-center text-gray-500">No product selected!</div>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    const fakeTxId = "JC-" + Math.floor(Math.random() * 1000000);

    try {
      await axios.post(
        "http://localhost:3000/api/purchase/purchase-product",
        {
          productId,
          quantity,
          size,
          paymentMethod: "JazzCash",
          transactionId: fakeTxId,
          number,
        },
        { withCredentials: true }
      );

      toast.success(`JazzCash Payment Successful! Txn: ${fakeTxId}`);
      navigate("/purchase");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Payment failed. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="flex items-center justify-center py-15 px-4">
      <div className="w-full max-w-md rounded-2xl p-8 border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          JazzCash Payment
        </h2>

        <div className="rounded-xl p-5 mb-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-gray-600">Qty: {quantity}</p>
          <p className="text-gray-600">Size: {size}</p>
          <p className="text-gray-900 font-bold mt-2">
            Total: ${price * quantity}
          </p>
        </div>
        <hr className="border border-gray-300 mb-5" />

        <form onSubmit={handlePayment} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              JazzCash Number
            </label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="03XX-XXXXXXX"
              required
              className="w-full border border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-100 p-3 rounded-lg outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="****"
              required
              className="w-full border border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-100 p-3 rounded-lg outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default JazzCashPage;
