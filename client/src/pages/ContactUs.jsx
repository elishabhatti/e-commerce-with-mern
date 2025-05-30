import React, { useState } from "react";
import Input from "../components/Input";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add Contact:", formData);
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className=" overflow-hidden flex w-full max-w-5xl">
        {/* Left form side */}
        <div className="w-full flex justify-center items-center md:w-1/2 p-8">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <h2 className="text-2xl font-bold">Login User</h2>
            <Input
              label="Name"
              name="name"
              type="text"
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
              label="Message"
              name="message"
              type="text"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full cursor-pointer bg-[#110C30] text-white py-2 rounded-md hover:bg-[#110C30] transition"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Right image side */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="
            https://cdni.iconscout.com/illustration/premium/thumb/contact-us-illustration-download-in-svg-png-gif-file-formats--call-logo-customer-service-support-onboarding-pack-business-illustrations-4849052.png"
            alt="Contact US illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
