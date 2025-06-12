import React, { useEffect, useState } from "react";
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
  Calendar,
  IdCard,
  Clock,
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [product, setProducts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [cartProduct, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("purchases");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUSerProfileData();
    fetchPurchasedProducts();
    fetchCartProducts();
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/contact/get-contact",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      setContacts(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching contacts:",
        error.response?.data || error.message
      );
    }
  };

  const fetchUSerProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response?.data || error.message
      );
    }
  };

  const fetchPurchasedProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/purchase/get-purchase-product",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching purchased products:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCartProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/cart/get-cart-product",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartProducts(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching cart products:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/api/purchase/remove-purchased-product/${productId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      console.error(
        "Error deleting purchased product:",
        error.response?.data || error.message
      );
    }
  };

  const handleRemoveCartProduct = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/api/cart/remove-cart-product/${cartItemId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartProducts((prev) => prev.filter((item) => item._id !== cartItemId));
    } catch (error) {
      console.error(
        "Error deleting cart product:",
        error.response?.data || error.message
      );
    }
  };

  const handleUpdateProduct = (id) => {
    console.log(id);
  };

  const handleUpdateCartProduct = (id) => {
    console.log(id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your account and activities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="border border-gray-300  rounded-lg  overflow-hidden">
              <div className="p-6 border border-gray-300 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      user?.avatar ||
                      "https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
                    }
                    alt="User"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {user?.name || "No Name"}
                    </h2>
                    <p className="text-sm">{user?.email || "N/A"}</p>
                  </div>
                </div>
                <div>
                  <button
                  onClick={() => navigate(`/edit-profile/${user._id}`)}
                   className="text-sm cursor-pointer underline">Edit Profile</button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Account
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <User className="h-5 w-5 text-gray-400" />
                      <span>Profile Information</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Home className="h-5 w-5 text-gray-400" />
                      <span>{user?.address || "No address provided"}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span>{user?.phone || "No phone number"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Activity
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab("purchases")}
                      className={`flex items-center space-x-3 w-full p-2 rounded-md ${
                        activeTab === "purchases"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Package className="h-5 w-5" />
                      <span>Purchases ({product.length})</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("cart")}
                      className={`flex items-center space-x-3 w-full p-2 rounded-md ${
                        activeTab === "cart"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Cart ({cartProduct.length})</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("contacts")}
                      className={`flex items-center space-x-3 w-full p-2 rounded-md ${
                        activeTab === "contacts"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Mail className="h-5 w-5" />
                      <span>Contact Submissions ({contacts.length})</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <IdCard className="h-5 w-5 text-gray-400" />
                      <span>
                        User ID: {user?._id?.slice(0, 8).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
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
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Purchased Products Tab */}
            {activeTab === "purchases" && (
              <div className="overflow-hidden border rounded-lg border-gray-300 ">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-blue-500" />
                    Purchased Products
                  </h2>
                  <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    + Add Products
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Brand
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Qty
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            No purchased products found
                          </td>
                        </tr>
                      ) : (
                        product.map((p) => (
                          <tr key={p._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-md object-cover"
                                    src={
                                      p.product.image ||
                                      "https://via.placeholder.com/150"
                                    }
                                    alt={p.product.title}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {p.product.title}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {p.product.brand}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {p.size}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {p.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${p.product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                              <button
                                onClick={() =>
                                  navigate(`/update-purchase/${p._id}`)
                                }
                                className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                                title="Edit"
                              >
                                <SquarePen className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveProduct(p._id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                                title="Remove"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Cart Products Tab */}
            {activeTab === "cart" && (
              <div className="border border-gray-300  rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2 text-blue-500" />
                    Cart Products
                  </h2>
                  <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 -sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    + Add to Cart
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Brand
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Qty
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            No cart products found
                          </td>
                        </tr>
                      ) : (
                        cartProduct.map((c) => (
                          <tr key={c._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-md object-cover"
                                    src={
                                      c.product.image ||
                                      "https://via.placeholder.com/150"
                                    }
                                    alt={c.product.title}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {c.product.title}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {c.product.brand}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {c.size}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {c.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${c.product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/update-cart-product/${c._id}`
                                  )
                                }
                                className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                                title="Edit"
                              >
                                <SquarePen className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveCartProduct(c._id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                                title="Remove"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contact Submissions Tab */}
            {activeTab === "contacts" && (
              <div className=" rounded-lg border border-gray-300 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-blue-500" />
                    Contact Submissions
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Message
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contacts.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            No contact submissions found
                          </td>
                        </tr>
                      ) : (
                        contacts.map((c) => (
                          <tr key={c._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {c.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {c.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                              {c.message}
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
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
