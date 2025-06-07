import React, { useEffect, useState } from "react";
import axios from "axios";

const PurchaseProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

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

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  if (products.length === 0)
    return <p className="text-center mt-4 text-gray-600">No products purchased.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Purchased Products</h2>
      <ul className="space-y-6">
        {products.map((purchase) => {
          const { product, size, quantity } = purchase;
          return (
            <li
              key={purchase._id}
              className="flex items-center gap-6 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-bold mb-1">{product.title}</h3>
                <p className="text-gray-700 font-semibold mb-1">Brand: {product.brand}</p>
                <p className="text-gray-600 mb-1">Price: ${product.price.toFixed(2)}</p>
                <p className="text-gray-600 mb-1">Size: {size}</p>
                <p className="text-gray-600">Quantity: {quantity}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PurchaseProducts;
