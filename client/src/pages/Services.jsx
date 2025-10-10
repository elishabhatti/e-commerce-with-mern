import React, { useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const whyUsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const faqRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);
  const controls = useAnimation();

  // Parallax effect for hero image
  useEffect(() => {
    gsap.to(heroRef.current.querySelector("img"), {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Floating elements animation
    gsap.to(".floating-element", {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Rotating elements animation
    gsap.to(".rotating-element", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    // Scroll-triggered animations
    const sections = gsap.utils.toArray(".animated-section");
    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    // Text reveal animation
    gsap.utils.toArray(".text-reveal").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      });
    });

    // Interactive card animations
    gsap.utils.toArray(".interactive-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card.querySelector(".card-overlay"), {
          opacity: 1,
          duration: 0.3,
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card.querySelector(".card-overlay"), {
          opacity: 0,
          duration: 0.3,
        });
      });
    });

    // Background pattern animation
    gsap.to(".background-pattern", {
      x: 100,
      y: 50,
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // CTA pulse animation
    gsap.to(".pulse-element", {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const serviceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "back.out",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const hoverEffect = {
    scale: 1.03,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  };

  const tapEffect = {
    scale: 0.98,
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section with Parallax */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full background-pattern"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-500 rounded-full opacity-20 floating-element"
            animate={{
              y: [0, 40, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500 rounded-full opacity-15 floating-element"
            animate={{
              y: [0, 60, 0],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-green-500 rounded-full opacity-15 floating-element"
            animate={{
              y: [0, 50, 0],
              x: [0, 40, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="absolute inset-0 bg-black/40 z-10 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <span className="block">Transform Your</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
                Living Space
              </span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            Innovative interior solutions tailored to your unique style and
            functional needs
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg shadow-lg"
            >
              Explore Our Services
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold text-lg border border-white/20"
            >
              View Portfolio
            </motion.button>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </motion.div>
        </div>

        <motion.img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=100"
          alt="Luxury interior design"
          className="absolute inset-0 w-full h-full object-cover z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.6, 0.01, -0.05, 0.9] }}
        />
      </motion.div>

      {/* Introduction Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <motion.div
            className="absolute top-0 left-0 w-full h-full rotating-element"
            style={{
              backgroundImage:
                "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Award-winning Design Studio
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-8 text-gray-900"
            >
              Crafting Spaces That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Inspire
              </span>{" "}
              and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Elevate
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              At Devias Interiors, we don't just design spaces - we create
              experiences. Our holistic approach combines innovative design with
              practical functionality to craft environments that resonate with
              your personality and lifestyle. With over 15 years of industry
              expertise, we've perfected the art of transforming ordinary spaces
              into extraordinary places.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row justify-center gap-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg text-gray-900">
                    500+ Projects
                  </h4>
                  <p className="text-gray-600">Successfully completed</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg text-gray-900">
                    98% Satisfaction
                  </h4>
                  <p className="text-gray-600">Client happiness rate</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0 bg-pink-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg text-gray-900">15+ Years</h4>
                  <p className="text-gray-600">Industry experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <section
        ref={servicesRef}
        className="py-28 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Comprehensive
              </span>{" "}
              Services
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              From initial concept to final installation, we offer end-to-end
              solutions tailored to your unique needs and vision.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {[
              {
                title: "Residential Design",
                description:
                  "Transform your home into a sanctuary that reflects your personality and lifestyle. Our residential design services cover everything from single-room makeovers to whole-house renovations.",
                icon: (
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                ),
                features: [
                  "Custom space planning",
                  "Material & finish selection",
                  "3D visualizations",
                  "Project management",
                ],
                color: "blue",
              },
              {
                title: "Commercial Spaces",
                description:
                  "Create productive and inspiring work environments that align with your brand identity and enhance employee satisfaction and productivity.",
                icon: (
                  <svg
                    className="w-12 h-12 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                ),
                features: [
                  "Workplace strategy",
                  "Brand integration",
                  "Ergonomic solutions",
                  "Wayfinding design",
                ],
                color: "purple",
              },
              {
                title: "Custom Furniture",
                description:
                  "Bespoke furniture pieces crafted to your exact specifications, blending functionality with artistic expression for truly unique interiors.",
                icon: (
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    ></path>
                  </svg>
                ),
                features: [
                  "Handcrafted joinery",
                  "Sustainable materials",
                  "Personalized design",
                  "Quality guarantee",
                ],
                color: "green",
              },
              {
                title: "Lighting Design",
                description:
                  "Illuminate your space with carefully designed lighting schemes that enhance architecture, create ambiance, and improve functionality.",
                icon: (
                  <svg
                    className="w-12 h-12 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                ),
                features: [
                  "Ambient lighting",
                  "Task lighting solutions",
                  "Accent lighting design",
                  "Smart lighting systems",
                ],
                color: "yellow",
              },
              {
                title: "Space Planning",
                description:
                  "Optimize your space with intelligent layouts that maximize functionality while maintaining aesthetic appeal and flow.",
                icon: (
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    ></path>
                  </svg>
                ),
                features: [
                  "Traffic flow analysis",
                  "Furniture arrangement",
                  "Storage optimization",
                  "Accessibility compliance",
                ],
                color: "red",
              },
              {
                title: "Renovation Services",
                description:
                  "Complete renovation solutions from structural modifications to finishing touches, handled by our experienced team of professionals.",
                icon: (
                  <svg
                    className="w-12 h-12 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                ),
                features: [
                  "Structural assessment",
                  "Permit acquisition",
                  "Contractor coordination",
                  "Quality control",
                ],
                color: "indigo",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={serviceVariants}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:border-${service.color}-200 transition-all duration-300 interactive-card`}
                whileHover="hover"
                whileTap="tap"
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${service.color}-100 to-${service.color}-50 flex items-center justify-center`}
                  >
                    {service.icon}
                  </div>
                  <div className="card-overlay absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`px-6 py-3 bg-${service.color}-600 text-white rounded-lg font-medium`}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className={`w-5 h-5 text-${service.color}-500 mr-2 mt-0.5 flex-shrink-0`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      backgroundColor:
                        service.color === "yellow"
                          ? "#d97706"
                          : service.color === "green"
                          ? "#059669"
                          : service.color === "red"
                          ? "#dc2626"
                          : service.color === "purple"
                          ? "#7c3aed"
                          : service.color === "indigo"
                          ? "#4f46e5"
                          : "#2563eb",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3 bg-${service.color}-600 text-white rounded-lg font-medium transition-colors`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={whyUsRef}
        className="py-28 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <motion.div
            className="absolute top-0 left-0 w-full h-full rotating-element"
            style={{
              backgroundImage:
                "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-block mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Why Choose Devias
                </span>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold mb-8 text-gray-900"
              >
                The Devias{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Difference
                </span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-12 leading-relaxed"
              >
                We go beyond conventional design to deliver exceptional results
                through our unique approach and unwavering commitment to
                excellence.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-8">
                {[
                  {
                    title: "Holistic Design Philosophy",
                    description:
                      "We consider every aspect of your space - from lighting and acoustics to ergonomics and psychology - to create environments that truly enhance your quality of life.",
                    icon: (
                      <svg
                        className="w-8 h-8 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                        ></path>
                      </svg>
                    ),
                  },
                  {
                    title: "Cutting-Edge Technology",
                    description:
                      "We utilize the latest design technologies including 3D rendering, virtual reality walkthroughs, and AI-powered space planning to bring your vision to life before construction begins.",
                    icon: (
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        ></path>
                      </svg>
                    ),
                  },
                  {
                    title: "Sustainable Practices",
                    description:
                      "We're committed to environmentally responsible design, sourcing eco-friendly materials and implementing energy-efficient solutions without compromising on style or quality.",
                    icon: (
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        ></path>
                      </svg>
                    ),
                  },
                  {
                    title: "Client-Centric Process",
                    description:
                      "Your satisfaction is our top priority. We maintain transparent communication throughout the project and adapt to your evolving needs with flexible solutions.",
                    icon: (
                      <svg
                        className="w-8 h-8 text-pink-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex">
                    <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-md mr-6">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Design team at work"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Our Creative Process
                    </h3>
                    <p className="text-white/90 mb-4">
                      See how we transform ideas into reality through our
                      meticulous design process
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium flex items-center"
                    >
                      Watch Video
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="py-28 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              What Our Clients{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Say About Us
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Hear directly from those who have experienced the Devias
              Difference in their homes and businesses.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {[
              {
                quote:
                  "Devias Interiors transformed our outdated living room into a modern, functional, and breathtaking space. Their attention to detail and ability to capture our vision was truly remarkable.",
                name: "Sarah M.",
                title: "Homeowner, Clifton",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg",
              },
              {
                quote:
                  "Working with Devias for our new office design was a seamless experience. They created an environment that not only looks incredible but has also significantly boosted our team's productivity and morale.",
                name: "Ahmed K.",
                title: "CEO, Tech Solutions",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                quote:
                  "The custom furniture Devias designed for our dining area is a true masterpiece. It perfectly fits our space and is a constant conversation starter. Highly recommend their bespoke services!",
                name: "Fatima R.",
                title: "Art Collector",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col justify-between h-full"
              >
                <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-md">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className="py-28 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <motion.div
            className="absolute top-0 left-0 w-full h-full rotating-element"
            style={{
              backgroundImage:
                "radial-gradient(circle, #8b5cf6 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
                Questions
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Find answers to common questions about our interior design
              services.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-8"
          >
            {[
              {
                question: "What is your typical design process?",
                answer:
                  "Our process typically begins with an initial consultation to understand your needs and vision, followed by concept development, detailed design, material selection, and finally, project execution and installation. We keep you informed at every step.",
              },
              {
                question:
                  "How long does an interior design project usually take?",
                answer:
                  "The duration varies greatly depending on the scope and complexity of the project. A single-room refresh might take a few weeks, while a full home renovation could take several months. We provide a detailed timeline during the proposal phase.",
              },
              {
                question: "Do you work with specific budgets?",
                answer:
                  "Yes, we are experienced in working with a range of budgets. We believe in transparent pricing and will discuss your budget openly during our initial consultation to ensure our design proposals align with your financial expectations.",
              },
              {
                question:
                  "Can you incorporate existing furniture or decor into the new design?",
                answer:
                  "Absolutely! We strive to create designs that are unique to you. If you have cherished pieces you'd like to keep, we'll creatively integrate them into the new design to ensure a cohesive and personalized aesthetic.",
              },
              {
                question: "What areas do you serve?",
                answer:
                  "While our primary focus is on local projects, we do take on select remote projects depending on their scope and requirements. Please contact us to discuss your location and project details.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-md border border-gray-100 p-6 interactive-card"
                whileHover={hoverEffect}
                whileTap={tapEffect}
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-bold text-gray-900 cursor-pointer text-xl">
                    {faq.question}
                    <span className="transition group-open:rotate-180">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        ref={ctaRef}
        className="py-28 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 left-0 w-full h-full background-pattern"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "-100% -100%"],
            }}
            transition={{
              duration: 80,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
            >
              Ready to Redefine Your Space?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-12"
            >
              Let's turn your design dreams into a stunning reality. Contact us
              today for a personalized consultation.
            </motion.p>
            <motion.button
              onClick={() => {
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=elishahameel270@gmail.com&su=Free Consultation&body=Hi, I’d like to request a free consultation.",
                  "_blank"
                );
              }}
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#fff",
                color: "#3b82f6",
              }}
              whileTap={{ scale: 0.95 }}
              className="pulse-element px-10 py-5 bg-white text-blue-600 rounded-full font-extrabold text-xl shadow-lg transition-all duration-300 transform hover:shadow-2xl"
            >
              Get Your Free Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
