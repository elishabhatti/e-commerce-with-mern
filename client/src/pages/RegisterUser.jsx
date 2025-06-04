import React, { useState } from "react";
import Input from "../components/Input";

const RegisterUser = () => {
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
    console.log("Registering user:", formData);
  };

  return (
    <div className="flex items-center mt-20 justify-center">
      <div className="overflow-hidden flex w-full max-w-6xl">
        {/* Left form side */}
        <div className="w-full md:w-1/2 px-2">
          <form onSubmit={handleSubmit} className="space-x-4">
            <h2 className="text-2xl font-bold">REGISTER USER</h2>
            <Input
              label="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
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
              hint="The password must be between 4 and 6 characters"
            />
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="Avatar"
              name="avatar"
              type="url"
              value={formData.avatar}
              onChange={handleChange}
            />

            <div className="flex items-start text-sm">
              <input
                type="checkbox"
                required
                className="mt-1 mr-2 accent-purple-600"
              />
              <p className="text-gray-600">
                I have accepted the{" "}
                <a href="#" className="text-purple-600 underline">
                  Terms and Conditions
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#110C30] text-white py-2 my-2 rounded-md hover:bg-[#110C30] transition"
            >
              SIGN UP NOW
            </button>
          </form>
        </div>

        {/* Right image side */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://img.freepik.com/premium-vector/account-login-line-icon-new-user-register-registration-concept-illustration_1948-2099.jpg" // Replace with your image path
            alt="Sign up illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default RegisterUser;
