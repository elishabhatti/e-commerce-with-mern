import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Mail,
  SquarePen,
  X,
  Calendar,
  Clock,
  Info,
  DollarSign,
  Box,
  MessageSquare,
} from "lucide-react";
import axios from "axios"; // Ensure axios is imported
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // Default active tab
  const [users, setUsers] = useState([]); // State to store fetched user data
  const [products, setProducts] = useState([]); // State to store fetched product data
  const [orders, setOrders] = useState([]); // State to store fetched product data
  const [contact, setContact] = useState([]); // State to store fetched product data
  const dashboardRef = useRef(null);

  useEffect(() => {
    // GSAP entry animation
    gsap.fromTo(
      dashboardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, productsRes, purchaseProductsRes, contactRes] =
          await Promise.all([
            axios.get("http://localhost:3000/api/admin/users", {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }),
            axios.get("http://localhost:3000/api/admin/products", {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }),
            axios.get("http://localhost:3000/api/admin/purchase", {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }),
            axios.get("http://localhost:3000/api/admin/contact", {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }),
          ]);

        setUsers(usersRes.data.message || []);
        setProducts(productsRes.data.message || []);
        setOrders(purchaseProductsRes.data.message || []);
        setContact(contactRes.data.message || []);

        // ⚠️ This will log stale state value here
        console.log(contactRes.data.message); // Log raw data instead of `orders`
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setUsers([]);
        setProducts([]);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Calculate summary statistics for overview based on fetched data
  const totalUsers = users.length;
  const verifiedUsers = users.filter((user) => user.isEmailVerified).length; // Using 'isEmailVerified' for verified users
  const totalProducts = products.length; // Now using fetched products
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;
  const newContacts = contact.length;

  return (
    <div
      ref={dashboardRef}
      className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Admin Dashboard
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Overview and management of your platform's data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Dashboard Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1999/1999625.png" // Generic admin avatar
                    alt="Admin Avatar"
                    className="w-24 h-24 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">Admin User</h2>
                    <p className="text-sm opacity-90">admin@yourcompany.com</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Navigation Tabs */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Navigation
                  </h3>
                  {[
                    {
                      name: "Overview",
                      icon: LayoutDashboard,
                      tab: "overview",
                    },
                    { name: "Users", icon: Users, tab: "users" },
                    { name: "Products", icon: Package, tab: "products" },
                    { name: "Orders", icon: ShoppingCart, tab: "orders" },
                    { name: "Contacts", icon: Mail, tab: "contacts" },
                  ].map((item) => (
                    <button
                      key={item.tab}
                      onClick={() => setActiveTab(item.tab)}
                      className={`flex items-center space-x-3 w-full p-3 rounded-md text-base font-medium transition-all duration-200 ${
                        activeTab === item.tab
                          ? "bg-purple-100 text-purple-700 shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overviewTab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                    <LayoutDashboard className="h-6 w-6 mr-3 text-purple-600" />
                    Dashboard Overview
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Stat Card: Total Users */}
                    <div className="bg-blue-50 p-5 rounded-lg shadow-sm border border-blue-100 flex items-center space-x-4">
                      <div className="p-3 bg-blue-200 rounded-full text-blue-700">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {totalUsers}
                        </p>
                      </div>
                    </div>
                    {/* Stat Card: Verified Users */}
                    <div className="bg-green-50 p-5 rounded-lg shadow-sm border border-green-100 flex items-center space-x-4">
                      <div className="p-3 bg-green-200 rounded-full text-green-700">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Verified Users</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {verifiedUsers}
                        </p>
                      </div>
                    </div>
                    {/* Stat Card: Total Products */}
                    <div className="bg-yellow-50 p-5 rounded-lg shadow-sm border border-yellow-100 flex items-center space-x-4">
                      <div className="p-3 bg-yellow-200 rounded-full text-yellow-700">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Products</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {totalProducts}
                        </p>
                      </div>
                    </div>
                    {/* Stat Card: Total Orders */}
                    <div className="bg-red-50 p-5 rounded-lg shadow-sm border border-red-100 flex items-center space-x-4">
                      <div className="p-3 bg-red-200 rounded-full text-red-700">
                        <ShoppingCart className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {totalOrders}
                        </p>
                      </div>
                    </div>
                    {/* Stat Card: Total Revenue */}
                    <div className="bg-indigo-50 p-5 rounded-lg shadow-sm border border-indigo-100 flex items-center space-x-4">
                      <div className="p-3 bg-indigo-200 rounded-full text-indigo-700">
                        <DollarSign className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${totalRevenue.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    {/* Stat Card: Pending Orders */}
                    <div className="bg-orange-50 p-5 rounded-lg shadow-sm border border-orange-100 flex items-center space-x-4">
                      <div className="p-3 bg-orange-200 rounded-full text-orange-700">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pending Orders</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {pendingOrders}
                        </p>
                      </div>
                    </div>
                    {/* Stat Card: New Contacts */}
                    <div className="bg-teal-50 p-5 rounded-lg shadow-sm border border-teal-100 flex items-center space-x-4">
                      <div className="p-3 bg-teal-200 rounded-full text-teal-700">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">New Contacts</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {newContacts}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "users" && (
                <motion.div
                  key="usersTab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <Users className="h-6 w-6 mr-3 text-purple-600" />
                      User Management
                    </h2>
                    <button
                      className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                      // onClick={() => navigate("/add-user")} // Placeholder for add user functionality
                    >
                      + Add New User
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            User ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Verified
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Role
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Joined Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.length === 0 ? (
                          <tr>
                            <td
                              colSpan="7"
                              className="px-6 py-8 text-center text-gray-500 text-lg"
                            >
                              No users found.
                            </td>
                          </tr>
                        ) : (
                          users.map((user, index) => (
                            <motion.tr
                              key={user._id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                                {user._id.slice(0, 8)}...
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.name || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.isEmailVerified
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {user.isEmailVerified ? "Yes" : "No"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {user.role || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {user.createdAt
                                  ? new Date(user.createdAt).toLocaleDateString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      }
                                    )
                                  : "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2 items-center">
                                <motion.button
                                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors duration-150"
                                  title="Edit User"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  // onClick={() => console.log('Edit user', user._id)} // Placeholder for edit functionality
                                >
                                  <SquarePen className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-150"
                                  title="Delete User"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  // onClick={() => console.log('Delete user', user._id)} // Placeholder for delete functionality
                                >
                                  <X className="h-5 w-5" />
                                </motion.button>
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "products" && (
                <motion.div
                  key="productsTab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <Package className="h-6 w-6 mr-3 text-purple-600" />
                      Product Catalog
                    </h2>
                    <button
                      className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                      // onClick={() => navigate("/add-product")} // Placeholder for add product functionality
                    >
                      + Add New Product
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Product ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Image
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Category
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Stock
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.length === 0 ? (
                          <tr>
                            <td
                              colSpan="7"
                              className="px-6 py-8 text-center text-gray-500 text-lg"
                            >
                              No products found.
                            </td>
                          </tr>
                        ) : (
                          products.map((product, index) => (
                            <motion.tr
                              key={product._id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                                {product._id.slice(0, 8)}...
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <img
                                  className="h-12 w-12 rounded-md object-cover shadow-sm border border-gray-100"
                                  src={
                                    product.image ||
                                    "https://placehold.co/150x150/E0E0E0/666666?text=No+Image"
                                  }
                                  alt={product.productName || "Product Image"}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://placehold.co/150x150/E0E0E0/666666?text=No+Image";
                                  }}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.productName || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {product.category || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                                ${product.price ? product.price : "0.00"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {product.stock || 0}{" "}
                                <span className="text-xs text-gray-500">
                                  units
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2 items-center">
                                <motion.button
                                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors duration-150"
                                  title="Edit Product"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  // onClick={() => console.log('Edit product', product._id)} // Placeholder for edit functionality
                                >
                                  <SquarePen className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-150"
                                  title="Delete Product"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  // onClick={() => console.log('Delete product', product._id)} // Placeholder for delete functionality
                                >
                                  <X className="h-5 w-5" />
                                </motion.button>
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div
                  key="ordersTab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <ShoppingCart className="h-6 w-6 mr-3 text-purple-600" />
                      Order Management
                    </h2>
                    <button className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200">
                      View All Orders
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Order ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Customer
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Total
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Order Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.length === 0 ? (
                          <tr>
                            <td
                              colSpan="7"
                              className="px-6 py-8 text-center text-gray-500 text-lg"
                            >
                              No orders found.
                            </td>
                          </tr>
                        ) : (
                          orders.map((order, index) => (
                            <motion.tr
                              key={order._id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                            >
                              <td className="px-6 py-4 text-sm font-mono text-gray-600">
                                {order._id}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {order.user?.name}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800">
                                <div className="flex items-center space-x-2">
                                  <img
                                    src={order.product?.image}
                                    alt="product"
                                    className="w-10 h-10 rounded object-cover"
                                  />
                                  <span className="font-medium">
                                    {order.product?.title}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm font-semibold text-indigo-700">
                                ${order.product?.price}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    order.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {order.status || "Pending"}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700">
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium flex space-x-2 items-center">
                                <motion.button
                                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
                                  title="View Order Details"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Info className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                                  title="Cancel Order"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <X className="h-5 w-5" />
                                </motion.button>
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "contacts" && (
                <motion.div
                  key="contactsTab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <Mail className="h-6 w-6 mr-3 text-purple-600" />
                      Contact Submissions
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Message
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockContacts.length === 0 ? (
                          <tr>
                            <td
                              colSpan="5"
                              className="px-6 py-8 text-center text-gray-500 text-lg"
                            >
                              No contact submissions found.
                            </td>
                          </tr>
                        ) : (
                          contact.map((contact, index) => (
                            <motion.tr
                              key={contact.id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {contact.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {contact.email}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                                {contact.message}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {new Date(contact.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2 items-center">
                                <motion.button
                                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors duration-150"
                                  title="View Message"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <MessageSquare className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-150"
                                  title="Delete Contact"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <X className="h-5 w-5" />
                                </motion.button>
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
