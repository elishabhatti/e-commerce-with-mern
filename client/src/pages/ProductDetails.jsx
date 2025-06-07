import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams(); // gets the product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/products/${id}`, {
        withCredentials: true,
      });
      setProduct(res.data.message);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-96 object-cover rounded-md mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
      <p className="text-lg text-black font-semibold mb-2">
        Price: ${product.price}
      </p>
      <p className="text-yellow-600 mb-2">
        ⭐ {product.rating} ({product.reviews} reviews)
      </p>
      {product.isFeatured && (
        <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          Featured
        </span>
      )}
    </div>
  );
};

export default ProductDetails;
