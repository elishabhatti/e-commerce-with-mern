import React, { useState } from "react";

const LoginUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login user:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="border border-gray-200 rounded-lg overflow-hidden flex w-full max-w-5xl">
        {/* Left form side */}
        <div className="w-full flex justify-center items-center md:w-1/2 p-8">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <h2 className="text-2xl font-bold">Login User</h2>
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full cursor-pointer bg-[#110C30] text-white py-2 rounded-md hover:bg-[#110C30] transition"
            >
              LOGIN NOW
            </button>
          </form>
        </div>

        {/* Right image side */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="
            https://static.vecteezy.com/system/resources/previews/008/197/876/non_2x/mobile-register-concept-icon-sign-in-up-idea-thin-line-illustration-log-in-create-profile-smartphone-account-registration-confirmation-letter-isolated-outline-drawing-editable-stroke-vector.jpg"
            alt="Sign up illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-black text-lg font-bold">Welcome to Devias</h3>
            <p className="text-black text-sm">
              Create an account and get free resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, name, type = "text", value, onChange, hint }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="mt-1 w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-bg-[#110C30] outline-none focus:border-bg-[#110C30] text-md"
    />
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

export default LoginUser;
