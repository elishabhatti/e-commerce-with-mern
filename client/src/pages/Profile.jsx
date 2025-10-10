import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  SquarePen,
  X,
  ShoppingCart,
  Package,
  Mail,
  User,
  Home,
  Phone,
  IdCard,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import LoadingSpinner from "../components/LoadingSpinner";
import { getRequest, postRequest } from "../../utils/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [product, setProducts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [cartProduct, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("purchases");
  const [profilePhoto, setProfilePhoto] = useState("");
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      profileRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );

    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [userData, purchaseData, cartData, contactData] = await Promise.all(
        [
          getRequest("/users/profile"),
          getRequest("/purchase/get-purchase-product"),
          getRequest("/cart/get-cart-product"),
          getRequest("/contact/get-contact"),
        ]
      );

      setUser(userData);
      setProducts(purchaseData);
      setCartProducts(cartData);
      setContacts(contactData);
      setProfilePhoto(userData.avatar);
    } catch (error) {
      console.error(
        "Error loading profile data:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await postRequest(`/purchase/remove-purchased-product/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      console.error(
        "Error deleting purchased product:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteContactProfile = async (id) => {
    try {
      await getRequest(`/users/remove-contact/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error(
        "Error deleting Contact:",
        error.response?.data || error.message
      );
    }
  };

  const handleRemoveCartProduct = async (cartItemId) => {
    try {
      await postRequest(`/cart/remove-cart-product/${cartItemId}`);
      setCartProducts((prev) => prev.filter((item) => item._id !== cartItemId));
    } catch (error) {
      console.error(
        "Error deleting cart product:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div ref={profileRef} className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            My Profile
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Manage your account details, purchases, and cart items.
          </p>
          <div className="flex items-center w-full justify-center">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <span>
                Email Status:{" "}
                <span
                  className={`font-semibold ${
                    user?.isEmailVerified ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user?.isEmailVerified ? "Verified" : "Not Verified"}
                </span>
                {!user?.isEmailVerified && (
                  <>
                    {" "}
                    -{" "}
                    <button
                      onClick={() => navigate("/verify-email")}
                      className="text-blue-600 cursor-pointer underline hover:text-blue-800 ml-1 text-sm"
                    >
                      Verify Now
                    </button>
                  </>
                )}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      profilePhoto
                        ? `http://localhost:3000${profilePhoto}`
                        : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80"
                    }
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-md"
                  />

                  <div>
                    <h2 className="text-2xl font-bold">
                      {user?.name || "No Name"}
                    </h2>
                    <p className="text-sm opacity-90">{user?.email || "N/A"}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/edit-profile/${user._id}`)}
                    className="text-sm font-medium underline hover:text-blue-200 transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => navigate(`/change-password/${user._id}`)}
                    className="text-sm font-medium underline hover:text-blue-200 transition-colors duration-200"
                  >
                    Change Password
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Account Info */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Account Information
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Profile Details</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Home className="h-5 w-5 text-gray-400 mt-1" />
                      <span>{user?.address || "No address provided"}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span>{user?.phone || "No phone number"}</span>
                    </div>
                  </div>
                </div>

                {/* Activity Tabs */}
                <div className="space-y-3 border-t pt-6 border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    My Activity
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab("purchases")}
                      className={`flex items-center space-x-3 w-full p-3 rounded-md text-base font-medium transition-all duration-200 ${
                        activeTab === "purchases"
                          ? "bg-blue-100 text-blue-700 shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Package className="h-5 w-5" />
                      <span>Purchases ({product.length})</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("cart")}
                      className={`flex items-center space-x-3 w-full p-3 rounded-md text-base font-medium transition-all duration-200 ${
                        activeTab === "cart"
                          ? "bg-blue-100 text-blue-700 shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Cart ({cartProduct.length})</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("contacts")}
                      className={`flex items-center space-x-3 w-full p-3 rounded-md text-base font-medium transition-all duration-200 ${
                        activeTab === "contacts"
                          ? "bg-blue-100 text-blue-700 shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Mail className="h-5 w-5" />
                      <span>Contact Submissions ({contacts.length})</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Account Details
                  </h3>
                  <div className="space-y-4 text-sm text-gray-700">
                    <div className="flex items-center space-x-3">
                      <IdCard className="h-5 w-5 text-gray-400" />
                      <span>
                        User ID:{" "}
                        <span className="font-mono text-gray-600">
                          {user?._id?.slice(0, 8).toUpperCase()}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span>
                        Joined:{" "}
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === "purchases" && (
                <motion.div
                  key="purchasesTab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <Package className="h-6 w-6 mr-3 text-blue-600" />
                      Purchased Products
                    </h2>
                    <button
                      onClick={() => navigate("/")}
                      className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      + Add More Products
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
                            Product
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Brand
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Size
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Qty
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
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {product.length === 0 ? (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-6 py-8 text-center text-gray-500 text-lg"
                            >
                              No purchased products found. Start shopping!
                            </td>
                          </tr>
                        ) : (
                          product.map((p, index) => (
                            <motion.tr
                              key={p?._id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-12 w-12">
                                    <img
                                      className="h-12 w-12 rounded-md object-cover shadow-sm border border-gray-100"
                                      src={
                                        p?.product?.image ||
                                        "https://via.placeholder.com/150"
                                      }
                                      alt={p?.product?.title}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {p.product?.title}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      ID: {p?.product?._id.slice(0, 6)}...
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {p?.product?.brand}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {p?.size}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {p?.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-green-700">
                                ${p?.product?.price.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2 items-center">
                                <motion.button
                                  onClick={() =>
                                    navigate(`/update-purchase/${p._id}`)
                                  }
                                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors duration-150"
                                  title="Edit Purchase"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <SquarePen className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  onClick={() => handleRemoveProduct(p._id)}
                                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-150"
                                  title="Remove Purchase"
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

              {activeTab === "cart" && (
                <motion.div
                  key="cartTab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <ShoppingCart className="h-6 w-6 mr-3 text-blue-600" />
                      Cart Products
                    </h2>
                    <button
                      onClick={() => navigate("/")}
                      className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      + Add to Cart
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
                            Product
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Brand
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Size
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Qty
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
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {cartProduct.length === 0 ? (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-6 py-8 text-center text-gray-500 text-lg"
                            >
                              Your cart is empty. Time to find some great deals!
                            </td>
                          </tr>
                        ) : (
                          cartProduct.map((c, index) => (
                            <motion.tr
                              key={c._id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-12 w-12">
                                    <img
                                      className="h-12 w-12 rounded-md object-cover shadow-sm border border-gray-100"
                                      src={
                                        c.product.image ||
                                        "https://via.placeholder.com/150"
                                      }
                                      alt={c?.product?.title}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {c?.product?.title}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      ID: {c.product._id.slice(0, 6)}...
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {c.product.brand}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {c.size}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {c.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-indigo-700">
                                ${c.product.price.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2 items-center">
                                <motion.button
                                  onClick={() =>
                                    navigate(`/update-cart-product/${c._id}`)
                                  }
                                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors duration-150"
                                  title="Edit Cart Item"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <SquarePen className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  onClick={() => handleRemoveCartProduct(c._id)}
                                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-150"
                                  title="Remove from Cart"
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
                      <Mail className="h-6 w-6 mr-3 text-blue-600" />
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
                        {contacts.length === 0 ? (
                          <tr>
                            <td
                              colSpan="4"
                              className="px-6 py-8 text-center text-gray-500 text-lg"
                            >
                              No contact submissions yet.
                            </td>
                          </tr>
                        ) : (
                          contacts.map((c, index) => (
                            <motion.tr
                              key={c._id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {c.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {c.email}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700 max-w-xs overflow-hidden text-ellipsis">
                                {c.message.length > 30
                                  ? c.message.slice(0, 30) + "..."
                                  : c.message}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(c.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                <button
                                  className="text-red-500 rounded-full p-1 hover:bg-red-100"
                                  onClick={() =>
                                    handleDeleteContactProfile(c._id)
                                  }
                                >
                                  <X />
                                </button>
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

export default Profile;
