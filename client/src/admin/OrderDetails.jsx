import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner"; // Assuming this is already styled
import { motion } from "framer-motion"; // Import motion from framer-motion
import { gsap } from "gsap"; // Import gsap for potential advanced animations
import { getRequest } from "../../utils/api";

const OrderDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await getRequest(`/admin/get-purchase-product/${id}`);
        console.log(res); 
        setOrder(res);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger children animations by 0.1 seconds
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // GSAP animation for the "Go To Dashboard" button (example)
  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        ".dashboard-button",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [loading]);

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  if (!order) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        <p>Order not found or an error occurred.</p>
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Go To Dashboard
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="p-8 md:p-10 max-w-5xl mx-auto space-y-8 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        onClick={() => navigate("/admin-dashboard")}
        className="dashboard-button cursor-pointer px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Go To Dashboard
      </motion.button>

      <motion.h1
        className="text-4xl font-extrabold text-gray-900 mb-6 text-center lg:text-left"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Order Details 📦
      </motion.h1>

      <motion.div
        className="bg-white p-6 md:p-8 rounded-3xl shadow-xl space-y-6 border border-gray-100"
        variants={itemVariants}
      >
        {/* Product Info */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <motion.img
            src={order.product.image}
            alt={order.product.title}
            className="w-40 h-40 object-cover rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
            variants={imageVariants}
          />
          <div className="flex-grow text-center md:text-left">
            <motion.h2
              className="text-2xl font-bold text-gray-800"
              variants={itemVariants}
            >
              {order.product.title}
            </motion.h2>
            <motion.p
              className="text-gray-600 mt-1 line-clamp-2"
              variants={itemVariants}
            >
              {order.product.description}
            </motion.p>
            <motion.p
              className="text-sm text-gray-500 mt-2"
              variants={itemVariants}
            >
              <span className="font-medium">Brand:</span>{" "}
              <span className="text-gray-700">{order.product.brand}</span> |{" "}
              <span className="font-medium">Size:</span>{" "}
              <span className="text-gray-700">{order.size}</span> |{" "}
              <span className="font-medium">Quantity:</span>{" "}
              <span className="text-gray-700">{order.quantity}</span>
            </motion.p>
            <motion.p
              className="text-3xl font-extrabold text-green-600 mt-3"
              variants={itemVariants}
            >
              ${order.product.price.toFixed(2)}
            </motion.p>
          </div>
        </div>

        {/* User Info */}
        <motion.div
          className="border-t border-gray-200 pt-6 mt-6"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Customer Details 🧑‍💻
          </h3>
          <p className="text-gray-700 mb-1">
            <strong className="font-medium">Name:</strong> {order.user.name}
          </p>
          <p className="text-gray-700 mb-1">
            <strong className="font-medium">Email:</strong> {order.user.email}
          </p>
          <p className="text-gray-700 mb-1">
            <strong className="font-medium">Phone:</strong> {order.user.phone}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium">Address:</strong>{" "}
            {order.user.address}
          </p>
        </motion.div>

        {/* Order Info */}
        <motion.div
          className="border-t border-gray-200 pt-6 mt-6 flex justify-between items-center text-sm text-gray-500"
          variants={itemVariants}
        >
          <p>
            <span className="font-medium">Order ID:</span>{" "}
            <span className="text-gray-700 text-xs">{order._id}</span>
          </p>
          <p>
            <span className="font-medium">Ordered on:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OrderDetails;
