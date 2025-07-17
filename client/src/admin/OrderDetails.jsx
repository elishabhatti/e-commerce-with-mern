import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const OrderDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log(id);

        const res = await axios.get(
          `http://localhost:3000/api/admin/get-purchase-product/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(res);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading)
    return (
      <div className="p-10">
        <LoadingSpinner />
      </div>
    );

  return <div></div>;
};

export default OrderDetails;
