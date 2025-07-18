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
        console.log(res);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchContactDetails();
    }
  }, [id]);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        ".dashboard-button",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [loading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
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
      className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-2xl mt-10 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="text-center text-2xl font-bold text-gray-800"
        variants={itemVariants}
      >
        Contact Message Details
      </motion.div>

      <motion.div
        className="flex items-center justify-center"
        variants={itemVariants}
      >
        <img
          src={`http://localhost:3000${contact.user.avatar}`}
          alt="User Avatar"
          className="w-32 h-32 rounded-full shadow-md border-4 border-blue-500 object-cover"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-lg font-semibold">Name:</p>
        <p className="text-gray-700">{contact.name}</p>
        <hr className="border border-gray-300" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-lg font-semibold">Email:</p>
        <p className="text-gray-700">{contact.email}</p>
        <hr className="border border-gray-300" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-lg font-semibold">Phone:</p>
        <p className="text-gray-700">{contact.user.phone}</p>
        <hr className="border border-gray-300" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-lg font-semibold">Address:</p>
        <p className="text-gray-700">{contact.user.address}</p>
        <hr className="border border-gray-300" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-lg font-semibold">Message:</p>
        <p className="text-gray-700 whitespace-pre-line">{contact.message}</p>
        <hr className="border border-gray-300" />
      </motion.div>

      <motion.div className="text-center" variants={itemVariants}>
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="dashboard-button px-6 py-2 mt-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go To Dashboard
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ContactDetails;
