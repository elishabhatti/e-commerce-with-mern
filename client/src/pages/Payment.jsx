import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId, quantity, size, price, title } = location.state || {};

  if (!productId) {
    return <div className="p-10">No product selected!</div>;
  }

  const handleCOD = async () => {
    try {
      await axios.post("http://localhost:3000/api/purchase/purchase-product", {
        productId,
        quantity,
        size,
        paymentMethod: "COD",
      }, { withCredentials: true });

      toast.success("Order placed with Cash on Delivery!");
      navigate("/purchase");
    } catch (err) {
      toast.error("Error placing order");
    }
  };

  const handleJazzCash = async () => {
    const fakeTxId = "JC-" + Math.floor(Math.random() * 1000000);

    try {
      await axios.post("http://localhost:3000/api/purchase/purchase-product", {
        productId,
        quantity,
        size,
        paymentMethod: "JazzCash",
        jazzCashTxId: fakeTxId,
      }, { withCredentials: true });

      toast.success(`JazzCash Payment Successful! Txn: ${fakeTxId}`);
      navigate("/purchase");
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6">Choose Payment Method</h2>

      <div className="border rounded-lg p-5 mb-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p>Qty: {quantity}</p>
        <p>Size: {size}</p>
        <p className="font-bold mt-2">Total: ${price * quantity}</p>
      </div>

      <button
        onClick={handleCOD}
        className="w-full bg-black text-white py-3 rounded-md mb-4 hover:bg-gray-800"
      >
        Cash on Delivery
      </button>

      <button
        onClick={handleJazzCash}
        className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700"
      >
        Pay with JazzCash
      </button>
    </div>
  );
};

export default Payment;
