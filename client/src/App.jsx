import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs";
import Page404 from "./pages/Page404";
import AboutUs from "./pages/AboutUs";
import Home from "./Home";
import Services from "./pages/Services";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/service" element={<Services />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
