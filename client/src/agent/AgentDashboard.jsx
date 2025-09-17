import React, { useEffect, useState } from "react";
import axios from "axios";

const AgentDashboard = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/purchase/get-purchase-product"
        );
        console.log(res);
        
        setPurchases(res.data);
      } catch (err) {
        console.error("Error fetching purchases:", err);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-2">{p.user?.name}</td>
                <td className="p-2">{p.product?.title}</td>
                <td className="p-2">{p.quantity}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">
                  {new Date(p.createdAt).toLocaleDateString()}
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
