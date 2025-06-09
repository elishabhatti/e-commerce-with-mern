import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag } from "lucide-react";

const PurchaseProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchPurchasedProducts();
  }, []);

  if (loading)
    return <p className="text-center mt-6 text-lg font-medium">Loading...</p>;

  if (products.length === 0)
    return (
      <p className="text-center mt-6 text-gray-500 text-lg">
        No products purchased.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center gap-4">
        <h2 className="inline font-bold text-center mb-8 text-gray-900">
          <div className="flex text-3xl justify-center items-center gap-4">
            <ShoppingBag />
            Your Purchases
          </div>
        </h2>
        <div>
          <p>All Purchased Products: {products.length}</p>
        </div>
      </div>
      <hr />
      <div className="divide-y divide-gray-200">
        {products.map((purchase) => {
          const { product, size, quantity } = purchase;
          return (
            <div
              key={purchase._id}
              className="flex items-center justify-between py-6 hover:bg-gray-50 transition-colors"
            >
              {/* Image & Info */}
              <div className="flex items-center gap-5 flex-1">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-24 h-20 object-cover rounded-lg border"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Brand: {product.brand}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="text-right space-y-1 w-40 shrink-0">
                <p className="text-gray-600 text-sm">
                  Size: <span className="font-medium">{size}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  Qty: <span className="font-medium">{quantity}</span>
                </p>
                <p className="text-gray-900 font-bold text-base">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchaseProducts;
