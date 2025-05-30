import React from "react";
import { NavLink } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="pt-20 flex justify-center items-center flex-col gap-2">
      <h1 className="text-5xl font-bold">404 Page not Found </h1>
      <NavLink className="text-blue-500 underline" to="/register">Go Back </NavLink>
    </div>
  );
};

export default Page404;
