import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    try {
      const res = await axios.get("http://localhost:3000/api/products/get-product", {
        withCredentials: true,
      });
      setProducts(res.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="py-8 px-4 sm:px-6 md:px-10 xl:px-20 w-full">
      {/* Hero Banner */}
      <div className="relative my-5">
        <img
          className="h-64 sm:h-96 md:h-[500px] lg:h-[550px] w-full object-cover rounded-sm"
          src="https://sunnymate.co/wp-content/uploads/2024/11/%E8%8A%AC%E6%81%A9%E6%A4%85E905E827%E8%BE%B9%E5%87%A0-2048x1536.webp"
          alt="Scenic view of plants"
        />
        <h1 className="absolute top-6 left-6 sm:top-10 sm:left-10 text-black text-1xl sm:text-2xl md:text-4xl font-bold drop-shadow-lg">
          Buy On Devias For Best Services
        </h1>
      </div>

      {/* Section Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-gray-800">
        Explore Our Products
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-2xl overflow-hidden flex flex-col min-h-[400px] sm:min-h-[430px]"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                {product.title}
              </h2>
              <p className="text-sm text-gray-700 line-clamp-2">
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

              {/* Action Buttons */}
              <div className="flex mt-auto justify-between items-center gap-2 pt-4">
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      toast.error("Please login first to continue");
                    } else {
                      navigate(`product-details/${product._id}`);
                    }
                  }}
                  className="w-[85%] p-2 cursor-pointer bg-black text-white rounded-md hover:bg-gray-800 transition"
                >
                  Buy Now
                </button>

                <div className="relative group w-[15%]">
                  <button
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        toast.error("Please login first to continue");
                      } else {
                        navigate(`product-cart/${product._id}`);
                      }
                    }}
                    className="flex justify-center py-2 w-full cursor-pointer bg-black text-white rounded-md hover:bg-gray-800 transition"
                  >
                    <ShoppingCart />
                  </button>

                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Add to cart
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
