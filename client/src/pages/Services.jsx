import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const whyUsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    // Hero section animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    // Services cards animation
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out",
    });

    // Why Us section animation
    gsap.from(whyUsRef.current, {
      scrollTrigger: {
        trigger: whyUsRef.current,
        start: "top 80%",
      },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
    });

    // Testimonials animation
    gsap.from(".testimonial-card", {
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
    });

    // FAQ animation
    gsap.from(".faq-item", {
      scrollTrigger: {
        trigger: faqRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.5,
    });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 text-gray-800">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-16 relative overflow-hidden rounded-lg"
      >
        <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl text-center"
          >
            Elevate Your Space
          </motion.h1>
        </div>
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-[350px] md:h-[600px] object-cover"
          src="https://cdni.iconscout.com/illustration/premium/thumb/relocation-service-worker-loaders-loading-furniture-illustration-download-in-svg-png-gif-file-formats--house-moving-services-picking-up-sofa-couch-delivery-guys-industries-pack-people-illustrations-4315399.png?f=webp"
          alt="Our Services"
        />
      </motion.div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mb-20 text-center max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6">Crafting Spaces That Inspire</h2>
        <p className="text-xl leading-relaxed">
          At Devias, we believe your environment shapes your life. Our comprehensive
          services transform houses into homes, offices into productive spaces,
          and commercial areas into welcoming environments. With over 15 years of
          experience in the industry, we've perfected the art of blending
          functionality with aesthetic appeal.
        </p>
      </motion.div>

      {/* Services Offered */}
      <div ref={servicesRef} className="mb-28">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-center"
        >
          Our Comprehensive Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Interior Design",
              desc: "Our team of certified interior designers will work closely with you to create spaces that reflect your personality and meet your functional needs. We offer 3D visualizations, material selection, and project management to ensure your vision becomes reality.",
              img: "https://img.freepik.com/premium-vector/furniture-store-customer-service-cartoon-composition-with-young-family-packing-purchased-chairs-home-delivery-vector-illustration_1284-69260.jpg",
              features: [
                "Space planning and optimization",
                "Color scheme consultation",
                "Lighting design",
                "Custom storage solutions",
              ],
            },
            {
              title: "Custom Furniture",
              desc: "We craft bespoke furniture tailored to your exact specifications. From unique dining tables to custom built-ins, our master craftsmen use premium materials to create pieces that will last generations.",
              img: "https://thumbs.dreamstime.com/b/home-repair-builders-making-house-renovation-workers-fixing-installing-new-furniture-exact-vector-cartoon-people-original-348112848.jpg",
              features: [
                "Handcrafted joinery",
                "Sustainable materials",
                "Personalized design",
                "Quality guarantee",
              ],
            },
            {
              title: "Delivery & Assembly",
              desc: "Our white-glove delivery service ensures your furniture arrives safely and is assembled perfectly in your home. We handle everything from packaging to placement, with no hidden fees.",
              img: "https://static.vecteezy.com/system/resources/previews/004/379/120/non_2x/furniture-delivery-service-flat-illustration-warehouse-workers-carrying-sofa-cartoon-characters-isolated-on-white-background-courier-deliveryman-loader-men-delivered-couch-shipping-concept-vector.jpg",
              features: [
                "Professional assembly",
                "Debris removal",
                "In-home placement",
                "Quality inspection",
              ],
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              className="service-card rounded-xl shadow-lg hover:shadow-xl transition-all p-6 bg-white"
              whileHover={{ y: -10 }}
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Services */}
      <div className="mb-28">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-center"
        >
          Specialized Solutions
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: "Space Planning",
              icon: (
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
              ),
              desc: "Maximize your space potential with our expert planning services. We analyze your needs and create optimized layouts for any room or building.",
            },
            {
              title: "Commercial Design",
              icon: (
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              ),
              desc: "Create productive and inspiring work environments with our commercial design expertise tailored for offices, retail spaces, and hospitality venues.",
            },
            {
              title: "Renovation Consulting",
              icon: (
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
              ),
              desc: "Navigate your renovation project with confidence using our expert guidance on budgeting, material selection, and contractor coordination.",
            },
            {
              title: "Sustainable Design",
              icon: (
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              ),
              desc: "Eco-conscious solutions that reduce environmental impact without compromising on style or functionality.",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 p-8 rounded-xl hover:bg-white transition-all border border-gray-100"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start mb-6">
                {service.icon}
                <h3 className="text-2xl font-bold ml-4">{service.title}</h3>
              </div>
              <p className="text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Us Section */}
      <div
        ref={whyUsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-28"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Why Choose Devias?</h2>
          <p className="text-lg mb-8">
            We're not just another design firm. Our holistic approach combines
            innovative design with practical functionality to create spaces that
            truly work for you.
          </p>
          <ul className="space-y-6">
            {[
              {
                title: "15+ Years Experience",
                desc: "Our team brings decades of combined experience across residential and commercial projects.",
              },
              {
                title: "Client-Centric Approach",
                desc: "We listen first, then design. Your needs and preferences drive every decision.",
              },
              {
                title: "Quality Assurance",
                desc: "We stand behind our work with industry-leading warranties and guarantees.",
              },
              {
                title: "Sustainable Practices",
                desc: "Ethically sourced materials and eco-friendly processes minimize environmental impact.",
              },
            ].map((item, i) => (
              <li key={i} className="flex">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            className="w-full h-auto rounded-xl shadow-xl"
            src="https://img.freepik.com/free-vector/colleagues-working-together-project_74855-6308.jpg"
            alt="Team at work"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-lg w-3/4"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-xl">500+</h4>
                <p className="text-gray-600">Successful Projects</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Process Section */}
      <div className="mb-28">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-center"
        >
          Our Design Process
        </motion.h2>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
          {[
            {
              title: "Discovery",
              desc: "We start with an in-depth consultation to understand your needs, preferences, and vision for the space.",
              icon: (
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              ),
            },
            {
              title: "Concept Development",
              desc: "Our designers create initial concepts and mood boards to visualize the direction of your project.",
              icon: (
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              ),
            },
            {
              title: "Design Refinement",
              desc: "We refine the selected concept with detailed drawings, material selections, and 3D renderings.",
              icon: (
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
              ),
            },
            {
              title: "Implementation",
              desc: "Our project managers oversee every detail of the installation to ensure flawless execution.",
              icon: (
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              ),
            },
            {
              title: "Final Reveal",
              desc: "We present the completed project and ensure every detail meets your expectations.",
              icon: (
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              ),
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative mb-10 md:flex ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center`}
            >
              <div className="md:w-1/2 mb-6 md:mb-0 md:px-8">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.desc}</p>
              </div>
              <div className="hidden md:block md:w-1/2">
                <div
                  className={`h-64 bg-gray-100 rounded-lg ${
                    i % 2 === 0 ? "ml-auto" : "mr-auto"
                  }`}
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full border-4 border-blue-100">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div ref={testimonialsRef} className="mb-28">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-center"
        >
          What Our Clients Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Homeowner",
              quote:
                "Devias transformed our outdated kitchen into a modern masterpiece. Their attention to detail and creative solutions made the entire process enjoyable.",
              rating: 5,
              avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Michael Chen",
              role: "CEO, TechStart",
              quote:
                "Our office redesign has significantly improved employee satisfaction and productivity. The Devias team understood our brand and culture perfectly.",
              rating: 5,
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Emma Rodriguez",
              role: "Restaurant Owner",
              quote:
                "From concept to completion, Devias delivered beyond our expectations. Our restaurant's new look has doubled our weekend reservations!",
              rating: 5,
              avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              className="testimonial-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition"
              whileHover={{ y: -10 }}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div ref={faqRef} className="mb-28">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-center"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {[
            {
              question: "How long does a typical design project take?",
              answer:
                "Project timelines vary based on scope and complexity. A full home redesign typically takes 8-12 weeks from concept to completion, while smaller projects like single room makeovers can be completed in 4-6 weeks. We provide a detailed timeline during our initial consultation.",
            },
            {
              question: "What's included in your design fees?",
              answer:
                "Our design fees cover initial consultations, space planning, concept development, material selection, 3D visualizations, project management, and final styling. We offer transparent pricing with no hidden costs.",
            },
            {
              question: "Do you work with existing furniture?",
              answer:
                "Absolutely! We specialize in blending existing pieces with new elements to create cohesive designs. During our consultation, we'll assess which items work well in your new space and suggest creative ways to repurpose or refresh them.",
            },
            {
              question: "Can you help with small spaces?",
              answer:
                "Small spaces are our specialty! We excel at maximizing functionality in compact areas through smart storage solutions, multi-functional furniture, and optical illusion techniques that make spaces appear larger.",
            },
            {
              question: "What if I don't like the design?",
              answer:
                "Client satisfaction is our top priority. We work iteratively, refining designs based on your feedback at each stage. If you're not completely happy with the final result, we'll make it right - that's our guarantee.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="faq-item mb-6 border-b border-gray-200 pb-6"
            >
              <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-blue-600 text-white rounded-2xl p-12 text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Space?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Schedule a free consultation with our design team to discuss your
          project and explore how we can bring your vision to life.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition"
        >
          Book Your Consultation
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Services;