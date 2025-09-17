import React, { useEffect, useState } from "react";
import axios from "axios";

const AgentDashboard = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/purchases");
        setPurchases(res.data.data); // tumne res.data.data bheja hai backend se
      } catch (err) {
        console.error("Error fetching purchases:", err);
      }
    };

    fetchPurchases();
  }, []);

   const handleStatusChange = async (purchaseId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/agent/update-status/${purchaseId}`, {
        shippingStatus: newStatus,
      });
      fetchPurchases(); // refresh after update
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">User</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Address</th>
              <th className="p-2">Product</th>
              <th className="p-2">Size</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Payment Status</th>
              <th className="p-2">Shipping</th>
              <th className="p-2">Order Date</th>
              <th className="p-2">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                {/* User Info */}
                <td className="p-2 font-medium flex items-center">
                  {p.user?.name}
                </td>
                <td className="p-2">{p.user?.email}</td>
                <td className="p-2">{p.user?.phone}</td>
                <td className="p-2">{p.user?.address}</td>

                {/* Product Info */}
                <td className="p-2 flex items-center gap-2">
                  <img
                    src={p.product?.image}
                    alt={p.product?.title}
                    className="w-10 h-10 rounded"
                  />
                  {p.product?.title}
                </td>
                <td className="p-2">{p.size}</td>
                <td className="p-2">{p.quantity}</td>
                <td className="p-2">${p.product?.price}</td>

                {/* Order / Payment Info */}
                <td className="p-2">{p.paymentMethod}</td>
                <td
                  className={`p-2 font-semibold ${
                    p.paymentStatus === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {p.paymentStatus}
                </td>
                <td
                  className={`p-2 font-semibold ${
                    p.shippingStatus === "placed"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {p.shippingStatus}
                </td>
                <td className="p-2">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <select
                    value={p.shippingStatus}
                    onChange={(e) => handleStatusChange(p._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="placed">Placed</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="out-for-delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentDashboard;
