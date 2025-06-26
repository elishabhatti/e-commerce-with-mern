import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const heroHeadingRef = useRef(null);
  const mainHeadingRef = useRef(null);
  const sectionRefs = useRef([]); // Use an array for multiple section references
  sectionRefs.current = []; // Initialize or clear on each render

  // Function to add refs dynamically
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP Animation for Hero Heading
    if (heroHeadingRef.current) {
      gsap.fromTo(heroHeadingRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    }

    // GSAP Animation for Main "About Us" Heading
    if (mainHeadingRef.current) {
      gsap.fromTo(mainHeadingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: {
            trigger: mainHeadingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    }

    // GSAP Animations for sections with ScrollTrigger
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

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 text-gray-800 font-sans bg-gray-50"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Image */}
      <div className="mb-12 md:mb-20 relative rounded-xl overflow-hidden shadow-lg"> {/* Added rounded and shadow */}
        <div ref={heroHeadingRef} className="absolute top-8 left-8 sm:top-12 sm:left-12 text-white text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-md">
          <h1>About Us</h1>
        </div>
        <img
          className="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover rounded-xl brightness-[0.8]" // Slightly darker for text
          src="https://img.freepik.com/premium-vector/diverse-creative-team-looking-happy-flat-vector-illustration-white-background_674398-1414.jpg?semt=ais_items_boosted&w=740"
          alt="Diverse team collaborating"
        />
      </div>

      <h1 ref={mainHeadingRef} className="text-4xl sm:text-5xl font-extrabold mb-16 md:mb-24 text-center text-gray-900 leading-tight">
        Our Journey: Crafting Spaces, Building Trust
      </h1>

      {/* Section 1: Our Story */}
      <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start mb-20 md:mb-32">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Origin Story</h2>
          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            At **Devias**, our journey began with a simple yet profound vision: to transform houses into homes by providing thoughtfully designed and exceptionally crafted furniture. We believe that your living space should be a reflection of your personality and a sanctuary for your well-being.
          </p>
          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            Founded in **2025** by a small team of passionate designers and artisans, Devias emerged from a desire to bridge the gap between high-quality, sustainable furniture and accessibility. We started as a humble workshop, meticulously hand-picking materials and perfecting our techniques, driven by the belief that everyone deserves beautiful, durable pieces that last a lifetime.
          </p>
          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            Today, that small studio has grown into a trusted brand, serving thousands of customers across the nation. Each piece we create carries the essence of our commitment to **purposeful design, ethical craftsmanship, and environmental responsibility.** We are proud to be a part of your home-building journey.
          </p>
          <p className="font-semibold text-xl mt-8 text-gray-900">– The Devias Team</p>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-xl overflow-hidden shadow-md">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-48 object-cover rounded-md"
            src="https://img.freepik.com/premium-vector/back-school-college-students-with-book-laptop_316839-6091.jpg?semt=ais_items_boosted&w=740"
            alt="Students collaborating"
          />
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-48 object-cover rounded-md"
            src="https://static.vecteezy.com/system/resources/thumbnails/002/723/694/small/helping-hand-concept-illustration-worker-helping-each-other-for-business-group-free-vector.jpg"
            alt="Helping hand concept"
          />
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-48 object-cover rounded-md"
            src="https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg"
            alt="Team helping upstairs"
          />
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-48 object-cover rounded-md"
            src="https://img.freepik.com/premium-vector/goal-focused-help-overcoming-obstacles-flat-modern-design-illustration_566886-16.jpg"
            alt="Goal-focused illustration"
          />
        </div>
      </div>

      {/* Section 2: Our Core Values */}
      <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 md:mb-32">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Values: Guiding Principles</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            At Devias, everything we do is anchored by a set of unwavering values that define who we are and how we operate:
          </p>
          <ul className="list-disc ml-6 text-lg leading-relaxed space-y-4 text-gray-700">
            <li>
              <strong className="text-purple-600">Uncompromising Quality:</strong> We handpick the finest materials and employ meticulous craftsmanship to ensure every piece is not just beautiful, but built to last for generations, offering exceptional comfort and durability.
            </li>
            <li>
              <strong className="text-purple-600">Pioneering Sustainability:</strong> Our commitment to the planet is paramount. We prioritize ethically sourced, eco-conscious materials and embrace manufacturing practices that minimize environmental impact, striving for a greener future.
            </li>
            <li>
              <strong className="text-purple-600">Customer-Centric Innovation:</strong> You are at the heart of our design process. We actively listen to your needs and desires, adapting our collections to offer solutions that truly enhance your daily life and elevate your spaces.
            </li>
            <li>
              <strong className="text-purple-600">Timeless Design for Life:</strong> We craft furniture that transcends fleeting trends, designed to seamlessly integrate with and complement the evolving lifestyles of our diverse customers, growing with you through every phase of life.
            </li>
          </ul>
        </div>
        <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-md">
          <motion.img
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="w-full h-[400px] lg:h-[500px] object-cover rounded-xl"
            src="https://media.istockphoto.com/id/1306949457/vector/people-searching-for-creative-solutions-teamwork-business-concept-modern-vector-illustration.jpg?s=612x612&w=0&k=20&c=sn3zEkT0ft7FsKk2Rp6PdsJqT5ZPOCqrQSgzoGeTp64="
            alt="Creative solutions teamwork"
          />
        </div>
      </div>

      {/* Section 3: Why Choose Us */}
      <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="rounded-xl overflow-hidden shadow-md">
          <motion.img
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="w-full h-[400px] lg:h-[500px] object-cover rounded-xl"
            src="https://img.freepik.com/premium-vector/two-men-running-up-hill-reach-target-two-mans-goal-focused-increase-motivation-way-achieve-goal-support-teamwork-simple-minimalist-flat-vector-illustration_538213-119386.jpg"
            alt="Achieving goals illustration"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Devias Difference: Why Choose Us?</h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            Choosing Devias means investing in more than just furniture; it means partnering with a brand that genuinely cares about your home and your experience. We are dedicated to providing an unparalleled level of service and products that exceed expectations.
          </p>
          <ul className="list-disc ml-6 text-lg leading-relaxed space-y-4 text-gray-700">
            <li>
              <strong className="text-purple-600">Seamless Shopping Experience:</strong> From intuitive Browse to secure checkout, we've designed our platform for your convenience.
            </li>
            <li>
              <strong className="text-purple-600">Reliable & Eco-Conscious Delivery:</strong> We ensure your furniture arrives safely and efficiently, minimizing our environmental footprint through sustainable logistics.
            </li>
            <li>
              <strong className="text-purple-600">Personalized Support:</strong> Our team is here to offer expert advice, custom recommendations, and responsive customer support, guiding you every step of the way.
            </li>
            <li>
              <strong className="text-purple-600">Trusted Community:</strong> Join thousands of happy customers who have transformed their homes with Devias, a testament to our commitment to satisfaction.
            </li>
            <li>
              <strong className="text-purple-600">Innovation & Adaptation:</strong> We constantly evolve our designs and practices to meet the changing needs of modern living, ensuring we always offer relevant and beautiful solutions.
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;