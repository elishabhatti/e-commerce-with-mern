import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!email || !oldPassword || !newPassword) {
      return setError("All fields are required");
    }

    if (oldPassword === newPassword) {
      return setError("New password must be different from old password");
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await axios.post(
        "http://localhost:3000/api/users/change-password",
        {
          email,
          currentPassword: oldPassword,
          newPassword,
        }
      );

      if (res.data.success) {
        setMessage("Password changed successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center pt-30">
      <form
        onSubmit={handleChangePassword}
        className="flex flex-col gap-4 border border-gray-500 rounded-md p-10 w-96"
      >
        <h2 className="text-xl font-semibold text-center">
          Change Your Password
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-400 py-2 px-3 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Old Password"
          className="border border-gray-400 py-2 px-3 rounded-md"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="border border-gray-400 py-2 px-3 rounded-md"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
