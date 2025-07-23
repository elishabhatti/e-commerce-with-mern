import React, { useState } from 'react';
import axios from 'axios';
import { postRequest } from '../../utils/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');

      const data = await postRequest('/users/forgot-password', { email });
      if (data) {
        setMessage("Check your email for password reset link.");
      } else {
        setError(res.data.error || "Something went wrong");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center pt-30">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border rounded-md border-gray-300 p-10 w-96"
      >
        <h2 className="text-xl font-semibold mb-2 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-600">
          <b>Note:</b> Please enter a valid email address.
        </p>

        <label htmlFor="email" className="font-medium">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="border border-gray-400 py-2 px-3 rounded-md"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
