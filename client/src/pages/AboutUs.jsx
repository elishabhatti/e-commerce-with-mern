import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChair, FaBoxOpen, FaHandshake, FaGlobe, FaStar, FaCheck } from "react-icons/fa"; // Updated icons for furniture business context
import { MdOutlineDesignServices, MdVerifiedUser, MdRecycling } from "react-icons/md"; // More relevant icons

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const heroHeadingRef = useRef(null);
  const sectionRefs = useRef([]);
  sectionRefs.current = []; // Initialize or clear on each render

  // Function to add refs dynamically
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP Animation for Hero Heading
    const tlHero = gsap.timeline();
    if (heroHeadingRef.current) {
      tlHero.fromTo(heroHeadingRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    }

    // GSAP Animations for sections with ScrollTrigger
    ScrollTrigger.getAll().forEach(trigger => {
        if (sectionRefs.current.includes(trigger.trigger)) {
            trigger.kill();
        }
    });

    sectionRefs.current.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%", // Adjust as needed
            toggleActions: "play none none none",
          }
        }
      );
    });

    return () => {
      tlHero.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Framer Motion variants for page entrance
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const sectionReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="relative w-full min-h-screen font-sans text-gray-800"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
        {/* Subtle Background shapes */}


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Hero Section - Furniture Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          {/* Left Content */}
          <div>
            <h1 ref={heroHeadingRef} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Furnishing Your Life, <br className="hidden sm:block"/> One Piece at a Time.
            </h1>
            <p className="text-lg leading-relaxed text-gray-700 mb-8">
              At FurnishCo, we believe your home should be a reflection of your unique style and a sanctuary of comfort. We offer expertly crafted furniture designed to enhance every living space, combining timeless elegance with modern functionality. Explore our collections and find pieces that tell your story.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                Shop Our Collections
              </button>
              <button className="bg-transparent text-blue-600 border border-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
                Design Your Space
              </button>
            </div>
          </div>

          {/* Right Image (Placeholder for furniture related image) */}
          <div className="flex justify-center items-center">
            <img
              className="w-full max-w-lg h-auto rounded-xl"
              src="
              https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?cs=srgb&dl=pexels-eric-mufasa-578798-1350789.jpg&fm=jpg
              "
              alt="Modern living room with FurnishCo furniture"
            />
          </div>
        </div>

        {/* Section: Our Crafting Process (Features) - Adapted for Furniture */}
        <motion.div
          ref={addToRefs}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-24 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">Our Crafting Process: Quality from Concept to Comfort</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <MdOutlineDesignServices className="text-purple-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Design & Innovation</h3>
              <p className="text-gray-600">
                Our team of seasoned designers blends aesthetic appeal with functional excellence, creating pieces that elevate any space.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <FaBoxOpen className="text-blue-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Materials Sourcing</h3>
              <p className="text-gray-600">
                We meticulously select the finest sustainable woods, durable fabrics, and high-grade metals for lasting quality.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl  border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <FaHandshake className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Skilled Craftsmanship</h3>
              <p className="text-gray-600">
                Each piece is handcrafted by artisans with years of experience, ensuring attention to detail and superior finish.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section: FurnishCo at a Glance (Metrics) - Adapted for Furniture */}
        <motion.div
          ref={addToRefs}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24 p-10 bg-white rounded-3xl border border-gray-100"
        >
          {/* Left Content Column */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">FurnishCo at a Glance: Our Impact & Growth</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Since our founding, FurnishCo has been dedicated to enriching homes with beautiful, durable furniture. Discover the key figures that highlight our commitment to quality, customer satisfaction, and expanding our reach in the furniture industry.
            </p>
          </div>

          {/* Right Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <p className="text-sm text-gray-500 font-semibold mb-1 uppercase">Founded</p>
              <p className="text-4xl font-extrabold text-blue-600">2010</p>
              <p className="text-sm text-gray-600 mt-1">Bringing comfort to homes for over a decade.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <p className="text-sm text-gray-500 font-semibold mb-1 uppercase">Customers</p>
              <p className="text-4xl font-extrabold text-purple-600">500K+</p>
              <p className="text-sm text-gray-600 mt-1">Happy homes furnished worldwide.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <p className="text-sm text-gray-500 font-semibold mb-1 uppercase">Products</p>
              <p className="text-4xl font-extrabold text-teal-600">1000+</p>
              <p className="text-sm text-gray-600 mt-1">Unique designs across all categories.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <p className="text-sm text-gray-500 font-semibold mb-1 uppercase">Sustainability</p>
              <p className="text-4xl font-extrabold text-red-600">80%</p>
              <p className="text-sm text-gray-600 mt-1">Materials sourced sustainably.</p>
            </div>
          </div>
        </motion.div>

        {/* Section: Meet Our Design Visionaries (Leadership) - Adapted for Furniture */}
        <motion.div
          ref={addToRefs}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24"
        >
          {/* Left Content */}
          <div className="p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl h-full flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Meet Our Design Visionaries</h2>
            <p className="text-lg leading-relaxed mb-6">
              Our leadership team comprises renowned designers and business strategists who bring passion and expertise to every aspect of FurnishCo, driving our commitment to innovative and enduring furniture.
            </p>
            <p className="text-md font-semibold opacity-80">Design your dream space with us!</p>
          </div>

          {/* Right Team Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="text-center bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <img
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-200 shadow-md"
                src="https://randomuser.me/api/portraits/women/66.jpg"
                alt="Sarah Chen"
              />
              <h3 className="text-xl font-semibold text-gray-900">Sarah Chen</h3>
              <p className="text-blue-600 text-md">Lead Product Designer</p>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <img
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-purple-200 shadow-md"
                src="https://randomuser.me/api/portraits/men/71.jpg"
                alt="Michael Wong"
              />
              <h3 className="text-xl font-semibold text-gray-900">Michael Wong</h3>
              <p className="text-purple-600 text-md">Head of Manufacturing</p>
            </div>
          </div>
        </motion.div>

        {/* Section: What Our Customers Say (Testimonials) - Adapted for Furniture */}
        <motion.div
          ref={addToRefs}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 p-10 bg-white rounded-3xl border border-gray-100"
        >
          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">What Our Customers Say About FurnishCo?</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Hear directly from our satisfied customers who have transformed their living spaces with FurnishCo. Their experiences speak volumes about our commitment to quality, design, and exceptional service.
            </p>
          </div>
          {/* Right Image Placeholder (Testimonial focused image) */}
          <div className="flex justify-center items-center">
            <img
              className="w-full max-w-lg h-auto rounded-xl shadow-lg"
              src="https://img.freepik.com/free-photo/side-view-customer-service-representatives-office_23-2150654067.jpg?w=1060"
              alt="Customer Service Representative"
            />
          </div>
        </motion.div>

        {/* Section: Exclusive Collections (Pricing/Service Plans) - Adapted for Furniture */}
        <motion.div
          ref={addToRefs}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            Explore Our Exclusive Furniture Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Modern Living Collection */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Modern Living</h3>
              <p className="text-gray-600 mb-6">Sleek designs and contemporary comfort for the modern home. Perfect for urban living.</p>
              <img src="https://img.freepik.com/free-photo/armchair-living-room-with-copy-space_23-2149484837.jpg?w=740" alt="Modern Sofa" className="w-full h-40 object-cover rounded-md mb-6" />
              <ul className="text-left text-gray-700 space-y-3 mb-8">
                <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Minimalist Aesthetics</li>
                <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Space-Saving Solutions</li>
                <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Premium Upholstery Options</li>
              </ul>
              <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                View Collection
              </button>
            </div>

            {/* Classic Elegance Collection */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Classic Elegance</h3>
              <p className="text-gray-600 mb-6">Timeless pieces that bring sophistication and enduring style to any interior.</p>
              <img src="https://img.freepik.com/free-photo/classic-home-interior-design_23-2148769396.jpg?w=740" alt="Classic Dining Room" className="w-full h-40 object-cover rounded-md mb-6" />
              <ul className="text-left text-gray-700 space-y-3 mb-8">
                <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Hand-Carved Details</li>
                <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Rich Wood Finishes</li>
                <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Ornate Craftsmanship</li>
              </ul>
              <button className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-colors">
                View Collection
              </button>
            </div>

            {/* Sustainable Living Collection */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainable Living</h3>
              <p className="text-gray-600 mb-6">Eco-friendly furniture crafted from recycled and responsibly sourced materials.</p>
              <img src="https://img.freepik.com/free-photo/minimalist-scandinavian-interior-design_23-2150917267.jpg?w=740" alt="Sustainable Wooden Furniture" className="w-full h-40 object-cover rounded-md mb-6" />
              <ul className="text-left text-gray-700 space-y-3 mb-8">
                <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Recycled & Upcycled Materials</li>
                <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Non-Toxic Finishes</li>
                <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Low Environmental Impact</li>
              </ul>
              <button className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors">
                View Collection
              </button>
            </div>
          </div>
        </motion.div>


      </div>
    </motion.div>
  );
};

export default AboutUs;