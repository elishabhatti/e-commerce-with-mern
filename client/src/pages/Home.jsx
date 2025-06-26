import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
import RotatingText from "../components/RotatingText"; // Ensure this component is correctly implemented

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const sectionTitleRef = useRef(null);

  useEffect(() => {
    getAllProducts();

    // GSAP animations for the hero section
    if (heroRef.current && headingRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } }); // Softer ease

      tl.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.9 }, "<0.4" // Slightly delayed and softer
      )
      .fromTo(".rotating-text-element",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.03 }, "<0.2"
      );
    }

    // GSAP animation for the section title on scroll
    if (sectionTitleRef.current) {
      gsap.fromTo(sectionTitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: {
            trigger: sectionTitleRef.current,
            start: "top 85%", // Trigger when 85% of the element is in view
            toggleActions: "play none none none"
          }
        }
      );
    }

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
      toast.error("Failed to load products.");
    }
  }

  // Framer Motion variants for product grid and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Subtle stagger
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100, // Softer spring
        damping: 12,
      },
    },
  };

  return (
    <div className="py-8 px-4 sm:px-6 md:px-10 xl:px-20 w-full font-sans bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div
        ref={heroRef}
        className="relative my-5 overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg" // Softer shadow
      >
        <img
          className="h-64 sm:h-96 md:h-[500px] lg:h-[550px] w-full object-cover brightness-[0.85] rounded-lg" // Less intense darkening
          src="https://sunnymate.co/wp-content/uploads/2024/11/%E8%8A%AC%E6%81%A9%E6%A4%85E905E827%E8%BE%B9%E5%87%A0-2048x1536.webp"
          alt="Scenic view of plants"
        />
        <h1
          ref={headingRef}
          className="absolute flex items-center gap-3 top-8 left-8 sm:top-10 sm:left-10 text-white text-3xl sm:text-4xl md:text-5xl font-extrabold"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }} // Subtle text shadow
        >
          What We Sell{" "}
          <RotatingText
            texts={[
              "Shop Smart",
              "New Arrivals",
              "Best Deals",
              "Trending Now",
              "Fast Delivery",
              "Secure Checkout",
              "Big Discounts",
              "Cool Products",
            ]}
            mainClassName="px-3 sm:px-4 md:px-4 bg-white/20 backdrop-blur-sm text-white overflow-hidden py-1.5 sm:py-2 md:py-2.5 rounded-xl shadow-inner flex items-center justify-center border border-white/30" // Translucent, minimalist background
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 rotating-text-element"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </h1>
      </div>

      {/* Section Title */}
      <h1
        ref={sectionTitleRef}
        className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-12 mt-16 text-center text-gray-800 leading-tight tracking-tight"
      >
        Explore Our <span className="text-purple-600">Curated</span> Products
      </h1>

      {/* Products Grid */}
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
              className="border border-gray-100 rounded-xl overflow-hidden flex flex-col min-h-[400px] sm:min-h-[430px] shadow-sm hover:shadow-md transition-shadow duration-200 bg-white group" // Softer shadows, rounded less
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }} // Lift effect on hover
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
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.1 }}
                    className="absolute top-4 right-4 text-xs font-semibold text-white bg-blue-500 rounded-full px-3 py-1 shadow-md" // Solid color, smaller tag
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
                  Brand: <span className="font-semibold text-gray-700">{product.brand}</span>
                </p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="text-gray-900 font-bold text-xl">
                    ${product.price}
                  </span>
                  <span className="text-yellow-500 text-sm font-semibold flex items-center">
                    <span className="mr-1">⭐</span> {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex mt-6 justify-between items-center gap-3">
                  <motion.button
                    whileHover={{ backgroundColor: "#1f2937", scale: 1.02 }} // Darken on hover
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        toast.error("Please login first to continue");
                      } else {
                        navigate(`product-details/${product._id}`);
                      }
                    }}
                    className="flex-1 p-3 cursor-pointer bg-gray-900 text-white rounded-lg transition-colors duration-200 text-center font-medium text-base shadow-sm" // Simpler button style
                  >
                    Buy Now
                  </motion.button>

                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05, rotate: 5 }} // More subtle rotation
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (!token) {
                          toast.error("Please login first to continue");
                        } else {
                          navigate(`product-cart/${product._id}`);
                        }
                      }}
                      className="flex justify-center items-center p-3 w-12 h-12 cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm" // Simpler cart button
                    >
                      <ShoppingCart size={20} />
                    </motion.button>

                    {/* Tooltip */}
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2.5 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-sm transform translate-y-1 group-hover:translate-y-0">
                      Add to cart
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">No products found. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default Home;