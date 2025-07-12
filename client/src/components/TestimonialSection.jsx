import { Twitter } from "lucide-react";
import React from "react";

const TestimonialSection = ({ img, name, email, review }) => {
  return (
    <div className="gap-5 border border-gray-300 rounded-sm p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center justify-center">
          <img
            className="w-20 rounded-full h-20 object-cover"
            src={img}
            alt="Clients"
          />
          <div>
            <h2>{name}</h2>
            <p>{email}</p>
          </div>
        </div>
        <div>
          <Twitter />
        </div>
      </div>
      <div className="pt-4">
        <p>{review}</p>
      </div>
    </div>
  );
};

export default TestimonialSection;
