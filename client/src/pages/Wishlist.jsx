import axios from "axios";
import React, { useEffect, useState } from "react";
import { Heart, HeartOff, PackageOpen, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllWishListProducts();
  }, []);

  async function getAllWishListProducts() {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/users/get-wishlist-product",
        {
          withCredentials: true,
        }
      );

      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const removeFromWishList = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/delete-wishlist-product",
        { id },
        { withCredentials: true }
      );
      toast.success("Removed from Wishlist.");
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove from wishlist.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="py-8 px-4 sm:px-6 md:px-10 xl:px-20 w-full font-sans s min-h-screen">
      <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-12 mt-4 text-center text-gray-800 leading-tight tracking-tight">
        Your <span className="text-purple-600">Wishlist</span> Items
      </h1>

      {products.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id || index}
              className="border border-gray-100 rounded-xl overflow-hidden flex flex-col min-h-[400px] sm:min-h-[430px] shadow-sm hover:shadow-md transition-shadow duration-200 bg-white group"
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-full h-48 sm:h-56 overflow-hidden rounded-t-xl relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.isFeatured && (
                  <motion.span
                    initial={{ x: "100%" }}
                    animate={{ x: "0%" }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: 0.1,
                    }}
                    className="absolute top-4 right-4 text-xs font-semibold text-white bg-blue-500 rounded-full px-3 py-1 shadow-md"
                  >
                    Featured
                  </motion.span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-1 mb-1">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-snug">
                  {product.description}
                </p>
                <p className="text-gray-500 text-xs mb-3 font-medium uppercase tracking-wide">
                  Brand:{" "}
                  <span className="font-semibold text-gray-700">
                    {product.brand}
                  </span>
                </p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="text-gray-900 font-bold text-xl">
                    ${product.price}
                  </span>
                  <span className="text-yellow-500 text-sm font-semibold flex items-center">
                    <span className="mr-1">⭐</span> {product.rating} (
                    {product.reviews})
                  </span>
                </div>

                <div className="flex mt-6 justify-between items-center gap-3">
                  <motion.button
                    whileHover={{ backgroundColor: "#1f2937", scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        toast.error("Please login first to continue");
                      } else {
                        navigate(`/product-details/${product._id}`);
                      }
                    }}
                    className="flex-1 p-3 cursor-pointer bg-gray-900 text-white rounded-lg transition-colors duration-200 text-center font-medium text-base shadow-sm"
                  >
                    Buy Now
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        toast.error("Please login first to continue");
                      } else {
                        navigate(`/product-cart/${product._id}`);
                      }
                    }}
                    className="flex justify-center items-center p-3 w-12 h-12 cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm"
                  >
                    <ShoppingCart size={20} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeFromWishList(product._id)}
                    className="flex justify-center items-center p-3 w-12 h-12 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm"
                  >
                    <HeartOff size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex justify-center flex-col items-center pt-34">
          <p className="text-xl text-gray-500">Your wishlist is empty.</p>
          <NavLink className="text-blue-500 underline" to="/">
            Add To WishList
          </NavLink>
          <PackageOpen size={50} />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
