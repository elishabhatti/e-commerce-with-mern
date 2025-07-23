import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingCart,
  Trash,
  ChevronRight,
  Plus,
  Minus,
  PenBox,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { getRequest, postRequest, putRequest } from "../../utils/api";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  const calculateSubtotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setSubtotal(total);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const res = await getRequest("/cart/get-cart-product");
        const cartItems = Array.isArray(res) ? res : res?.data || [];
        
        setProducts(cartItems);
        calculateSubtotal(cartItems);
      } catch (error) {
        console.error(
          "Error fetching cart products:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  const handleRemoveProduct = async (cartItemId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (!isConfirmed) return;

    try {
      await postRequest(`/cart/remove-cart-product/${cartItemId}`);
      const updatedProducts = products.filter(
        (item) => item._id !== cartItemId
      );
      setProducts(updatedProducts);
      calculateSubtotal(updatedProducts);
    } catch (error) {
      console.error(
        "Error deleting cart product:",
        error.response?.data || error.message
      );
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 100) return;

    const optimisticProducts = products.map((item) =>
      item._id === cartItemId ? { ...item, quantity: newQuantity } : item
    );
    setProducts(optimisticProducts);
    calculateSubtotal(optimisticProducts);

    try {
      await putRequest(`/cart/update-quantity/${cartItemId}`, {
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);

      toast.error(error.response?.data?.message || "Failed to update quantity");

      // Rollback to original quantity
      const originalProducts = products.map((item) =>
        item._id === cartItemId ? { ...item, quantity: item.quantity } : item
      );
      setProducts(originalProducts);
      calculateSubtotal(originalProducts);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (products.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="bg-gray-50 rounded-lg p-8">
          <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white cursor-pointer px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg border border-gray-300">
            <div className="p-6 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold flex items-center gap-3">
                  <ShoppingCart size={24} />
                  Your Shopping Cart
                </h1>
                <span className="text-gray-500">
                  {products.length} {products.length === 1 ? "item" : "items"}
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {products.map((purchase) => {
                const { product, size, quantity } = purchase;

                return (
                  <div
                    key={purchase._id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover rounded-lg "
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {product.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              Brand: {product.brand}
                            </p>
                            <p className="text-sm text-gray-600">
                              Size: <span className="font-medium">{size}</span>
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleRemoveProduct(purchase._id)}
                              className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors h-6"
                              aria-label="Remove item"
                            >
                              <Trash size={18} />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/update-cart-product/${purchase._id}`)
                              }
                              className="text-gray-400 cursor-pointer hover:text-blue-500 transition-colors h-6"
                              aria-label="Update item"
                            >
                              <PenBox size={18} />
                            </button>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() =>
                                handleQuantityChange(purchase._id, quantity - 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              disabled={quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-1 text-center w-12">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(purchase._id, quantity + 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            ${(product.price * quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg border border-gray-300 p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              Proceed to Checkout
              <ChevronRight size={18} />
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By placing your order, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
