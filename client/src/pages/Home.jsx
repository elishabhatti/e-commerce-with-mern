import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    try {
      let res = await axios.get(
        "http://localhost:3000/api/products/get-product",
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
              <p className="text-gray-700 font-bold">${product.price}</p>
              <p className="text-yellow-500 text-sm">
                ⭐ {product.rating} ({product.reviews} reviews)
              </p>
              {product.isFeatured && (
                <span className="mt-2 inline-block text-xs text-white bg-blue-500 rounded-full px-2 py-1">
                  Featured
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
