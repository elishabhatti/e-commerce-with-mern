import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SquarePen, Square, X } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [product, setProducts] = useState([]);
  const [cartProduct, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUSerProfileData();
    fetchPurchasedProducts();
    fetchCartProducts();
  }, []);

  const buyedProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99.99",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$199.99",
      image: "https://via.placeholder.com/150",
    },
  ];

  const cartProducts = [
    {
      id: 1,
      name: "Bluetooth Speaker",
      price: "$49.99",
      image: "https://via.placeholder.com/150",
    },
  ];

  const ProductCard = ({ product }) => (
    <div className="border border-gray-300 rounded-xl p-4  bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg mb-2"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500">{product.price}</p>
    </div>
  );

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
        "Error fetching purchased products:",
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
      console.log(response.data);
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
      console.log(response.data);
      setCartProducts(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching purchased products:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/purchase/remove-purchased-product/${productId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prev) =>
        prev.filter((purchased) => purchased._id !== productId)
      );
    } catch (error) {
      console.error(
        "Error deleting purchased product:",
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
  const handleRemoveCartProduct = async (cartItemId) => {
    try {
      console.log(cartItemId);

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

      const updatedProducts = product.filter((item) => item._id !== cartItemId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error(
        "Error deleting cart product:",
        error.response?.data || error.message
      );
    }
  };

  if (loading)
    return <p className="text-center mt-6 text-lg font-medium">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Profile Info */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={
                user?.avatar ||
                "https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
              }
              alt="User"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {user?.name || "No Name"}
              </h2>
              <p className="text-gray-500">
                {user?._id?.slice(0, 10).toUpperCase()}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">About</h3>
            <p className="text-gray-600">📞 {user?.phone || "N/A"}</p>
            <p className="text-gray-600">📧 {user?.email || "N/A"}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
            <p className="text-gray-600">🏠 {user?.address || "N/A"}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Employee details
            </h3>
            <p className="text-gray-600">🎂 Sep 26, 1988</p>
            <p className="text-gray-600">🆔 GER10654</p>
            <p className="text-gray-600">💼 User</p>
            <p className="text-gray-600">
              🗓️ Joined:{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-10">
          <div className="bg-white h-[200px] overflow-y-scroll border border-gray-300 rounded-lg p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Purchased Products</h3>
              <button
                onClick={() => navigate("/")}
                className="text-red-500 cursor-pointer font-medium text-sm hover:underline"
              >
                + Add More Products
              </button>
            </div>
            <table className="w-full text-left text-gray-700 text-sm border-t border-gray-200">
              <thead>
                <tr className="border-b font-semibold">
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {product.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  product.map((purchased) => (
                    <tr key={purchased._id} className="border-b">
                      <td className="py-1">{purchased.product.title}</td>
                      <td className="py-1">{purchased.product.brand}</td>
                      <td className="py-1">{purchased.size}</td>
                      <td className="py-1">{purchased.quantity}</td>
                      <td className="py-1">
                        ${purchased.product.price.toFixed(2)}
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemoveProduct(purchased._id)}
                          className="text-red-500 rounded-sm cursor-pointer my-1 border border-red-600"
                        >
                          <X />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleUpdateProduct(purchased.product._id)
                          }
                          className="text-blue-500 cursor-pointer my-1"
                        >
                          <SquarePen />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-white h-[200px] overflow-y-scroll border border-gray-300 rounded-lg p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Carts Products</h3>
              <button
                onClick={() => navigate("/")}
                className="text-red-500 cursor-pointer font-medium text-sm hover:underline"
              >
                + Add More Cart Products
              </button>
            </div>
            <table className="w-full text-left text-gray-700 text-sm border-t border-gray-200">
              <thead>
                <tr className="border-b font-semibold">
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {product.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  cartProduct.map((cart) => (
                    <tr key={cart._id} className="border-b">
                      <td className="py-1">{cart.product.title}</td>
                      <td className="py-1">{cart.product.brand}</td>
                      <td className="py-1">{cart.size}</td>
                      <td className="py-1">{cart.quantity}</td>
                      <td className="py-1">${cart.product.price.toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleRemoveCartProduct(cart._id)}
                          className="text-red-500 rounded-sm cursor-pointer my-1 border border-red-600"
                        >
                          <X />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleUpdateCartProduct(cart.product._id)
                          }
                          className="text-blue-500 cursor-pointer my-1"
                        >
                          <SquarePen />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
