import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllWishListProducts()
  },[])
  async function getAllWishListProducts() {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/users/get-wishlist-product",
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products.");
    } finally {
      setIsLoading(false); 
    }
  }
  if (isLoading) return <LoadingSpinner />;
  return <div>Wishlist</div>;
};

export default Wishlist;
