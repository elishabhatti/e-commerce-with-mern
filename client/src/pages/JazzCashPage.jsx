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
    return <div className="p-10">No product selected!</div>;
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
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">JazzCash Payment</h2>

      <div className="border rounded-lg p-5 mb-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p>Qty: {quantity}</p>
        <p>Size: {size}</p>
        <p className="font-bold mt-2">Total: ${price * quantity}</p>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">
            JazzCash Number
          </label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="03XX-XXXXXXX"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="****"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default JazzCashPage;
