import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const ContactDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/admin/get-contact/${id}`,
          { withCredentials: true }
        );
        setContact(res.data.message);
      } catch (error) {
        console.error("Error fetching contact details:", error);
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

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  if (loading) return <LoadingSpinner />;

  if (!contact) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        <p>Contact not found or an error occurred.</p>
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="dashboard-button mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go To Dashboard
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto my-14 p-8 rounded-3xl border border-gray-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="text-center text-3xl font-extrabold text-gray-800 mb-4"
        variants={itemVariants}
      >
        📬 Contact Message
      </motion.div>

      <motion.div className="flex justify-center mb-6" variants={itemVariants}>
        <img
          src={`http://localhost:3000${contact.user.avatar}`}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover hover:scale-105 transition-transform duration-300"
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-xl text-gray-800">{contact.name}</p>
          <hr className="border border-gray-300" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-xl text-gray-800">{contact.email}</p>
          <hr className="border border-gray-300" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-xl text-gray-800">{contact.user.phone}</p>
          <hr className="border border-gray-300" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-sm text-gray-500">Address</p>
          <p className="text-xl text-gray-800">{contact.user.address}</p>
          <hr className="border border-gray-300" />
        </motion.div>
      </div>

      <motion.div className="mt-8" variants={itemVariants}>
        <p className="text-sm text-gray-500">Message</p>
        <p className="text-lg text-gray-700">{contact.message}</p>
        <hr className="border border-gray-300" />
      </motion.div>

      <motion.div className="text-center mt-10" variants={itemVariants}>
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="dashboard-button px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition duration-300"
        >
          ⬅️ Back to Dashboard
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ContactDetails;
