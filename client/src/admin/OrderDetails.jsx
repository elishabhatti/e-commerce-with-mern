import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const OrderDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/admin/get-purchase-product/${id}`,
          {
            withCredentials: true,
          }
        );
        setOrder(res.data.message);

        console.log(res);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading)
    return (
      <div className="p-10">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-6">
        <button onClick={() => navigate("/admin-dashboard")}>Go To Dashboard</button>
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        {/* Product Info */}
        <div className="flex gap-4 items-start">
          <img
            src={order.product.image}
            alt={order.product.title}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-xl font-semibold">{order.product.title}</h2>
            <p className="text-gray-600">{order.product.description}</p>
            <p className="text-sm text-gray-500">
              Brand: {order.product.brand} | Size: {order.size} | Quantity:{" "}
              {order.quantity}
            </p>
            <p className="text-lg font-bold text-green-700">
              Price: ${order.product.price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-1">Customer Details</h3>
          <p>
            <strong>Name:</strong> {order.user.name}
          </p>
          <p>
            <strong>Email:</strong> {order.user.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.user.phone}
          </p>
          <p>
            <strong>Address:</strong> {order.user.address}
          </p>
        </div>

        {/* Order Info */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Ordered on: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
