import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const navigate = useNavigate();

  const fetchUserProfileData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { name, email, phone, address, avatar } = response.data.data;

      setUserData({
        name: name || "",
        email: email || "",
        phone: phone || "",
        address: address || "",
        avatar: avatar || "",
      });
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response?.data || error.message
      );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/api/users/update-profile",
        userData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      toast.warning("Failed to update profile.");
    }
  };

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white text-black rounded-xl border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            className="w-full border border-black rounded px-3 py-2 bg-white text-black"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-semibold">Phone</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-semibold">Address</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black"
            value={userData.address}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-semibold">Avatar URL</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black"
            value={userData.avatar}
            onChange={(e) =>
              setUserData({ ...userData, avatar: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
