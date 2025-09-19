import React, { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
    placed: "bg-blue-100 text-blue-700",
    packed: "bg-indigo-100 text-indigo-700",
    shipped: "bg-purple-100 text-purple-700",
    "out-for-delivery": "bg-yellow-100 text-yellow-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    pending: "bg-orange-100 text-orange-700",
};

const AgentDashboard = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/agent/get-user-purchase-products"
                );
                setPurchases(res.data.data);
            } catch (err) {
                console.error("Error fetching purchases:", err);
            }
        };

        fetchPurchases();
    }, []);

    async function handleStatusChange(purchaseId, newStatus) {
        try {
            await axios.put(
                `http://localhost:3000/api/agent/update-status/${purchaseId}`,
                { shippingStatus: newStatus }
            );

            setPurchases((prev) =>
                prev.map((p) =>
                    p._id === purchaseId
                        ? { ...p, shippingStatus: newStatus }
                        : p
                )
            );
        } catch (err) {
            console.error("Error updating status:", err);
        }
    }

    return (
        <div className="p-3 sm:p-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
                Agent Dashboard
            </h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm lg:text-base">
                    <thead className="bg-gray-50 text-gray-700 uppercase tracking-wide">
                        <tr>
                            <th className="p-2 sm:p-3 text-left">User</th>
                            <th className="p-2 sm:p-3 text-left">Contact</th>
                            <th className="p-2 sm:p-3 text-left">Product</th>
                            <th className="p-2 sm:p-3 text-center">Qty</th>
                            <th className="p-2 sm:p-3 text-center">Price</th>
                            <th className="p-2 sm:p-3 text-center">Payment</th>
                            <th className="p-2 sm:p-3 text-center">Status</th>
                            <th className="p-2 sm:p-3 text-center">Order Date</th>
                            <th className="p-2 sm:p-3 text-center">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((p, idx) => (
                            <tr
                                key={idx}
                                className="border-b last:border-none hover:bg-gray-50 transition"
                            >
                                {/* User */}
                                <td className="p-2 sm:p-3">
                                    <div className="font-medium text-gray-800 text-[11px] sm:text-sm md:text-base">
                                        {p.user?.name}
                                    </div>
                                    <div className="text-[9px] sm:text-xs text-gray-500">
                                        {p.user?.email}
                                    </div>
                                </td>

                                {/* Contact */}
                                <td className="p-2 sm:p-3 text-gray-600 text-[10px] sm:text-xs md:text-sm">
                                    <div>{p.user?.phone}</div>
                                    <div>{p.user?.address}</div>
                                </td>

                                {/* Product */}
                                <td className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
                                    <img
                                        src={p.product?.image}
                                        alt={p.product?.title}
                                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg object-cover shadow-sm"
                                    />
                                    <div>
                                        <div className="font-medium text-[11px] sm:text-sm md:text-base">
                                            {p.product?.title}
                                        </div>
                                        <div className="text-[9px] sm:text-xs text-gray-500">
                                            Size: {p.size}
                                        </div>
                                    </div>
                                </td>

                                {/* Quantity */}
                                <td className="p-2 sm:p-3 text-center">
                                    {p.quantity}
                                </td>

                                {/* Price */}
                                <td className="p-2 sm:p-3 text-center font-semibold text-gray-700">
                                    ${p.product?.price}
                                </td>

                                {/* Payment */}
                                <td className="p-2 sm:p-3 text-center">
                                    <span
                                        className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-medium ${
                                            p.paymentStatus === "pending"
                                                ? statusColors.pending
                                                : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        {p.paymentStatus}
                                    </span>
                                    <div className="text-[9px] sm:text-xs text-gray-500 mt-1">
                                        {p.paymentMethod}
                                    </div>
                                </td>

                                {/* Shipping Status */}
                                <td className="p-2 sm:p-3 text-center">
                                    <span
                                        className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-medium ${
                                            statusColors[p.shippingStatus]
                                        }`}
                                    >
                                        {p.shippingStatus}
                                    </span>
                                </td>

                                {/* Date */}
                                <td className="p-2 sm:p-3 text-center text-gray-600 text-[10px] sm:text-xs md:text-sm">
                                    {new Date(p.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        }
                                    )}
                                </td>

                                {/* Update Status */}
                                <td className="p-2 sm:p-3 text-center">
                                    <select
                                        value={p.shippingStatus}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                p._id,
                                                e.target.value
                                            )
                                        }
                                        className="border rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-xs md:text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                                    >
                                        <option value="placed">Placed</option>
                                        <option value="packed">Packed</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="out-for-delivery">
                                            Out for Delivery
                                        </option>
                                        <option value="delivered">
                                            Delivered
                                        </option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
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
