import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag, Trash2, PenBox } from "lucide-react";

const PurchaseProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
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

    fetchPurchasedProducts();
  }, [token]);

  const handleEdit = (id) => {
    console.log("Edit purchase:", id);
    // Navigate or show modal logic here
  };

  const handleDelete = async (id) => {
    console.log(id);

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this purchase?"
    );
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/purchase/remove-purchased-product/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prev) =>
        prev.filter((purchased) => purchased._id !== id)
      );
    } catch (error) {
      console.error(
        "Error deleting purchased product:",
        error.response?.data || error.message
      );
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-t-transparent border-gray-600 rounded-full" />
      </div>
    );

  if (products.length === 0)
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="bg-gray-50 rounded-lg p-8">
          <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No Purchases Found
          </h3>
          <p className="text-gray-500">
            You haven’t purchased any products yet.
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
          <ShoppingBag size={24} />
          Your Purchases
        </h1>
        <span className="text-sm text-gray-500">
          Total Items: {products.length}
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
        {products.map(({ product, size, quantity, _id }) => (
          <div
            key={_id}
            className="p-4 hover:bg-gray-50 transition-colors relative"
          >
            <div className="absolute top-4 right-4 flex gap-3">
              <button
                onClick={() => handleEdit(_id)}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                aria-label="Edit purchase"
              >
                <PenBox size={20} />
              </button>
              <button
                onClick={() => handleDelete(_id)}
                className="text-red-600 hover:text-red-800 cursor-pointer"
                aria-label="Delete purchase"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Product Image */}
              <div className="w-full sm:w-32 h-32">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-md border"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Brand: {product.brand}
                  </p>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>
                      Size: <span className="font-medium">{size}</span>
                    </p>
                    <p>
                      Quantity: <span className="font-medium">{quantity}</span>
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-2 sm:mt-0 sm:text-right">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseProducts;
