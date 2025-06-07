import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/products/get-product",
        {
          withCredentials: true,
        }
      );
      setProducts(res.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  const handleProductClick = (id) => {
    console.log(id);
    
  }

  return (
    <div className="py-8 px-30 w-full ">
      <div className="relative my-5">
        <img
          className="h-[550px] rounded-sm w-full object-cover"
          src="https://sunnymate.co/wp-content/uploads/2024/11/%E8%8A%AC%E6%81%A9%E6%A4%85E905E827%E8%BE%B9%E5%87%A0-2048x1536.webp"
          alt="Scenic view of plants"
        />
        <h1 className="absolute top-10 left-10 text-black text-4xl font-bold drop-shadow-lg">
          Buy On Devias For Best Services
        </h1>
      </div>

      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Explore Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-2xl overflow-hidden flex flex-col"
            style={{ minHeight: "430px" }} 
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {product.title}
              </h2>
              <p className="text-sm  text-gray-800 truncate">
                {product.description}
              </p>
              <p className="text-gray-500 text-sm">{product.brand}</p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-900 font-bold text-lg">
                  ${product.price}
                </span>
                <span className="text-yellow-500 text-sm">
                  ⭐ {product.rating} ({product.reviews})
                </span>
              </div>

              {product.isFeatured && (
                <span className="mt-2 self-start text-xs font-medium text-white bg-blue-600 rounded-full px-3 py-1">
                  Featured
                </span>
              )}

              {/* Push button to the bottom */}
              <div className="mt-auto pt-4">
                <button
                onClick={() => navigate(product._id)}
                 className="w-full cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
