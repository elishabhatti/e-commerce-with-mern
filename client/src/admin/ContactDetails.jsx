import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Original imports
import LoadingSpinner from "../components/LoadingSpinner"; // Original import
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { getRequest } from "../../utils/api";

const ContactDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const data = await getRequest(`/admin/get-contact/${id}`);
        console.log(data); // or console.log(res) if you want raw data
        setContact(data);
      } catch (error) {
        console.error(
          "Error fetching contact details:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchContactDetails();
  }, [id]);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        ".dashboard-button",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [loading]);

  // Framer Motion variants for staggered animation of elements
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50, // Softer spring for overall container
        damping: 10,
        staggerChildren: 0.08, // Stagger animation for child elements
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 }, // Firmer spring for individual items
    },
  };

  if (loading) return <LoadingSpinner />;

  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="p-10 rounded-2xl text-center border border-gray-100">
          <p className="text-xl font-semibold text-red-600 mb-6">
            Contact not found or an error occurred.
          </p>
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="dashboard-button px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Go To Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    // Main container with a subtle gradient background for a modern feel
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-10 border border-gray-300"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Title */}
        <motion.div
          className="text-center text-4xl font-extrabold text-gray-800 mb-8 tracking-tight"
          variants={itemVariants}
        >
          <span className="text-indigo-600">📬</span> Message Details
        </motion.div>

        {/* User Avatar and Basic Info Section */}
        <motion.div
          className="flex flex-col items-center gap-4 mb-8"
          variants={itemVariants}
        >
          <div className="relative group">
            {/* Avatar image with original source */}
            <img
              src={`http://localhost:3000${contact.user.avatar}`}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-indigo-400 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl"
            />
            {/* Email verification status badge */}
            {contact.user.isEmailVerified ? (
              <span className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2.5 py-1 rounded-full shadow-md font-semibold transform group-hover:scale-110 transition-transform duration-200">
                Verified
              </span>
            ) : (
              <span className="absolute bottom-2 right-2 bg-red-500 text-white text-xs px-2.5 py-1 rounded-full shadow-md font-semibold transform group-hover:scale-110 transition-transform duration-200">
                Not Verified
              </span>
            )}
          </div>
          {/* User's Name */}
          <motion.p
            className="text-2xl font-semibold text-gray-900 mt-2"
            variants={itemVariants}
          >
            {contact.name}
          </motion.p>
          {/* User's Email */}
          <motion.p className="text-md text-gray-600" variants={itemVariants}>
            {contact.email}
          </motion.p>
        </motion.div>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 mb-8">
          {/* Phone Number */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <p className="text-sm font-medium text-gray-500 mb-1">Phone</p>
            <p className="text-lg text-gray-800 font-semibold">
              {contact.user.phone}
            </p>
          </motion.div>

          {/* User ID (assuming contact.user.id exists and you want to display it) */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <p className="text-sm font-medium text-gray-500 mb-1">User ID</p>
            <p className="text-lg text-gray-800 font-semibold truncate">
              {contact.user._id || "N/A"} {/* Added a fallback for ID */}
            </p>
          </motion.div>
        </div>

        {/* Address */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
          <p className="text-lg text-gray-800 font-semibold">
            {contact.user.address}
          </p>
        </motion.div>

        {/* Message Content Section */}
        <motion.div
          className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-inner"
          variants={itemVariants}
        >
          <p className="text-sm font-medium text-gray-500 mb-3">
            Message Content
          </p>
          <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
            {contact.message}
          </p>
        </motion.div>

        {/* Back to Dashboard Button */}
        <motion.div className="text-center mt-12" variants={itemVariants}>
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="dashboard-button px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out tracking-wide"
          >
            ⬅️ Back to Dashboard
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactDetails;
