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

// Mock LoadingSpinner component for demonstration
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="mt-4 text-lg text-gray-700">Loading dashboard data...</p>
    </div>
  </div>
);

// Mock Data - In a real application, this would come from API calls
const mockUsers = [
  { id: "user_001", name: "Alice Smith", email: "alice@example.com", status: "Active", joined: "2023-01-15" },
  { id: "user_002", name: "Bob Johnson", email: "bob@example.com", status: "Inactive", joined: "2023-03-20" },
  { id: "user_003", name: "Charlie Brown", email: "charlie@example.com", status: "Active", joined: "2023-05-01" },
  { id: "user_004", name: "Diana Prince", email: "diana@example.com", status: "Active", joined: "2024-02-10" },
  { id: "user_005", name: "Eve Adams", email: "eve@example.com", status: "Pending", joined: "2024-06-01" },
];

const mockProducts = [
  { id: "prod_001", name: "Wireless Earbuds", category: "Electronics", price: 79.99, stock: 150 },
  { id: "prod_002", name: "Smart Watch", category: "Wearables", price: 199.99, stock: 80 },
  { id: "prod_003", name: "Ergonomic Chair", category: "Office", price: 349.99, stock: 30 },
  { id: "prod_004", name: "Mechanical Keyboard", category: "Peripherals", price: 120.00, stock: 100 },
  { id: "prod_005", name: "Portable SSD 1TB", category: "Storage", price: 89.99, stock: 200 },
];

const mockOrders = [
  { id: "order_001", customer: "Alice Smith", total: 159.98, status: "Completed", date: "2024-07-01" },
  { id: "order_002", customer: "Charlie Brown", total: 349.99, status: "Pending", date: "2024-07-05" },
  { id: "order_003", customer: "Bob Johnson", total: 79.99, status: "Shipped", date: "2024-07-08" },
  { id: "order_004", customer: "Diana Prince", total: 240.00, status: "Completed", date: "2024-07-10" },
];

const mockContacts = [
  { id: "cont_001", name: "John Doe", email: "john.doe@example.com", message: "Inquiry about bulk orders.", date: "2024-06-20" },
  { id: "cont_002", name: "Jane Smith", email: "jane.smith@example.com", message: "Question about product warranty.", date: "2024-07-03" },
  { id: "cont_003", name: "Peter Jones", email: "peter.j@example.com", message: "Feedback on website usability.", date: "2024-07-11" },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // Default active tab
  const dashboardRef = useRef(null);

  // Simulate data fetching
  useEffect(() => {
    // GSAP entry animation
    gsap.fromTo(
      dashboardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );

    // Simulate API call delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Calculate summary statistics for overview
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(user => user.status === "Active").length;
  const totalProducts = mockProducts.length;
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = mockOrders.filter(order => order.status === "Pending").length;
  const newContacts = mockContacts.length; // Assuming all mock contacts are "new" for simplicity

  return (
    <div ref={dashboardRef} className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
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
                    { name: "Overview", icon: LayoutDashboard, tab: "overview" },
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
            animate={{ opacity: 1, x: 0 }}
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
                        <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                      </div>
                    </div>
                    {/* Stat Card: Active Users */}
                    <div className="bg-green-50 p-5 rounded-lg shadow-sm border border-green-100 flex items-center space-x-4">
                      <div className="p-3 bg-green-200 rounded-full text-green-700">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
                      </div>
                    </div>
                    {/* Stat Card: Total Products */}
                    <div className="bg-yellow-50 p-5 rounded-lg shadow-sm border border-yellow-100 flex items-center space-x-4">
                      <div className="p-3 bg-yellow-200 rounded-full text-yellow-700">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Products</p>
                        <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                      </div>
                    </div>
                    {/* Stat Card: Total Orders */}
                    <div className="bg-red-50 p-5 rounded-lg shadow-sm border border-red-100 flex items-center space-x-4">
                      <div className="p-3 bg-red-200 rounded-full text-red-700">
                        <ShoppingCart className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                      </div>
                    </div>
                    {/* Stat Card: Total Revenue */}
                    <div className="bg-indigo-50 p-5 rounded-lg shadow-sm border border-indigo-100 flex items-center space-x-4">
                      <div className="p-3 bg-indigo-200 rounded-full text-indigo-700">
                        <DollarSign className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
                      </div>
                    </div>
                    {/* Stat Card: Pending Orders */}
                    <div className="bg-orange-50 p-5 rounded-lg shadow-sm border border-orange-100 flex items-center space-x-4">
                      <div className="p-3 bg-orange-200 rounded-full text-orange-700">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pending Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
                      </div>
                    </div>
                    {/* Stat Card: New Contacts */}
                    <div className="bg-teal-50 p-5 rounded-lg shadow-sm border border-teal-100 flex items-center space-x-4">
                      <div className="p-3 bg-teal-200 rounded-full text-teal-700">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">New Contacts</p>
                        <p className="text-2xl font-bold text-gray-900">{newContacts}</p>
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
                    <button className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200">
                      + Add New User
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            User ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Joined Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockUsers.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500 text-lg">
                              No users found.
                            </td>
                          </tr>
                        ) : (
                          mockUsers.map((user, index) => (
                            <motion.tr
                              key={user.id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                                {user.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status === "Active"
                                      ? "bg-green-100 text-green-800"
                                      : user.status === "Inactive"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {new Date(user.joined).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2 items-center">
                                <motion.button
                                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors duration-150"
                                  title="Edit User"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <SquarePen className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-150"
                                  title="Delete User"
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
                    <button className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200">
                      + Add New Product
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Product ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Stock
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockProducts.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500 text-lg">
                              No products found.
                            </td>
                          </tr>
                        ) : (
                          mockProducts.map((product, index) => (
                            <motion.tr
                              key={product.id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                                {product.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {product.category}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                                ${product.price.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {product.stock} <span className="text-xs text-gray-500">units</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2 items-center">
                                <motion.button
                                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors duration-150"
                                  title="Edit Product"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <SquarePen className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-150"
                                  title="Delete Product"
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
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Customer
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Total
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Order Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockOrders.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500 text-lg">
                              No orders found.
                            </td>
                          </tr>
                        ) : (
                          mockOrders.map((order, index) => (
                            <motion.tr
                              key={order.id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                                {order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {order.customer}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-700">
                                ${order.total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    order.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2 items-center">
                                <motion.button
                                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors duration-150"
                                  title="View Order Details"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Info className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-150"
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
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Message
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockContacts.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-lg">
                              No contact submissions found.
                            </td>
                          </tr>
                        ) : (
                          mockContacts.map((contact, index) => (
                            <motion.tr
                              key={contact.id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
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
                                {new Date(contact.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
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
