import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import { postRequest } from "../../utils/api";

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

    const res = await postRequest("/users/change-password", {
      email,
      currentPassword: oldPassword,
      newPassword,
    });

    if (res) {
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleChangePassword}
        className="bg-white p-8 rounded-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Change Your Password
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="your@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Old Password
          </label>
          <Input
            label="Password"
            name="password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="••••••••"
            required
            hint="Password must be at least 6 characters long."
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <Input
            label="Password"
            name="password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            required
            hint="Password must be at least 6 characters long."
          />
        </div>

        {message && (
          <p className="text-green-600 text-center text-sm mb-4 bg-green-50 p-2 rounded-md">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center text-sm mb-4 bg-red-50 p-2 rounded-md">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
