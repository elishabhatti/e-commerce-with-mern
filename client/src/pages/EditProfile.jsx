import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner"; // Ensure this path is correct for your project

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state for fetching initial data
  const [isSaving, setIsSaving] = useState(false); // Added state for save button loading
  const [profilePhoto, setProfilePhoto] = useState(""); // State for profile photo

  const navigate = useNavigate();

  const fetchUserProfileData = async () => {
    setLoading(true); // Set loading to true when fetching starts
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
      setProfilePhoto(avatar);

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
      toast.error("Failed to fetch profile data.");
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  };
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch(
        "http://localhost:3000/api/users/profile/upload-photo",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorText = await res.text(); // Read raw text response
        console.error("Server returned:", errorText);
        toast.error("Upload failed. Check server log or route.");
        return;
      }

      const data = await res.json(); // Now safe to parse
      toast.success("Avatar uploaded!");
      setUserData((prev) => ({ ...prev, avatar: data.photo }));
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Unexpected error during photo upload");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true); // Set saving to true when update starts

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3000/api/users/update-profile",
        userData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsSaving(false); // Set saving to false when update ends
    }
  };

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-xl w-full max-w-3xl border border-gray-200" // Increased max-w for two columns
      >
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Edit Your Profile
        </h2>

        {/* Avatar Preview */}
        <div className="mb-6 flex justify-center">
          <img
            src={
              profilePhoto
                ? `http://localhost:3000${profilePhoto}`
                : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80"
            }
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-md"
          />
        </div>

        {/* Input Fields Container: Two Columns on md screens and up, single column on small screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              placeholder="Your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-gray-50 cursor-not-allowed"
              value={userData.email}
              disabled
              title="Email cannot be changed directly from here."
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              placeholder="Your delivery address"
            />
          </div>

          {/* Avatar URL takes full width at the bottom */}
          <div className="md:col-span-2">
            {" "}
            {/* This makes it span both columns */}
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Avatar
            </label>
            <input
              type="file"
              id="avatar"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              accept="image/*" // Optional: restrict to images
              onChange={handlePhotoUpload}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
