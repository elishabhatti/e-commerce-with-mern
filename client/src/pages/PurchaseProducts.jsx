import React, { useEffect, useState } from "react";
import axios from "axios";

const PurchaseProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // adjust as needed
        console.log("Token:", token);

        const response = await axios.get(
          "http://localhost:3000/api/purchase/get-purchase-product",
          {
            withCredentials: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Purchased Products:", response.data);
        setProducts(response.data.data); // Set to state
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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Purchased Products</h2>
      {products.length === 0 ? (
        <p>No products purchased.</p>
      ) : (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              Product ID: {product.product} <br />
              Size: {product.size} <br />
              Quantity: {product.quantity}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchaseProducts;
