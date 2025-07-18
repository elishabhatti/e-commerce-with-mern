import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner"; // Assuming this is already styled
import { motion } from "framer-motion"; // Import motion from framer-motion
import { gsap } from "gsap"; // Import gsap for potential advanced animations

const ContactDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/admin/get-contact/${id}`,
          {
            withCredentials: true,
          }
        );
        setContact(res.data.message);
        console.log(res);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger children animations by 0.1 seconds
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // GSAP animation for the "Go To Dashboard" button (example)
  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        ".dashboard-button",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [loading]);

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  if (!contact) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        <p>Contact not found or an error occurred.</p>
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Go To Dashboard
        </button>
      </div>
    );
  }

  return <div></div>;
};

export default ContactDetails;
