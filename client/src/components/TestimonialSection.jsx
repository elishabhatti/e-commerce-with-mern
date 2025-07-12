import { Twitter } from "lucide-react";
import React from "react";

const TestimonialSection = () => {
  return (
    <div className="gap-5 border border-gray-300 rounded-sm p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center justify-center">
          <img
            className="w-20 rounded-full h-20 object-cover"
            src="https://assets.entrepreneur.com/content/3x2/2000/20150820205507-single-man-outdoors-happy-bliss.jpeg"
            alt="Clients"
          />
          <div>
            <h2>Harry Man</h2>
            <p>harryman@gmail.com</p>
          </div>
        </div>
        <div>
          <Twitter />
        </div>
      </div>
      <div className="pt-4">
        <p>
          We are all aware of the unstoppable growth of eCommerce and the rising
          competitiveness that comes along with it.{" "}
        </p>
      </div>
    </div>
  );
};

export default TestimonialSection;
