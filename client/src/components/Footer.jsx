import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-300 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* --- Company Info --- */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">About Us</h2>
          <p className="text-sm leading-relaxed">
            We’re dedicated to delivering high-quality products and exceptional customer experiences.
            Our mission is to blend innovation, sustainability, and design — creating solutions
            that truly make a difference.
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
            <li><a href="/about" className="hover:text-blue-600 transition">About</a></li>
            <li><a href="/products" className="hover:text-blue-600 transition">Products</a></li>
            <li><a href="/contact" className="hover:text-blue-600 transition">Contact</a></li>
            <li><a href="/faq" className="hover:text-blue-600 transition">FAQ</a></li>
          </ul>
        </div>

        {/* --- Contact --- */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Get in Touch</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-center md:justify-start items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <a href="mailto:elishajameel270@gmail.com" className="hover:underline">
                elishajameel270@gmail.com
              </a>
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>+92 300 1234567</span>
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Lahore, Pakistan</span>
            </li>
          </ul>

          {/* --- Social Links --- */}
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a href="#" className="hover:text-blue-600"><Facebook size={18} /></a>
            <a href="#" className="hover:text-blue-600"><Twitter size={18} /></a>
            <a href="#" className="hover:text-blue-600"><Instagram size={18} /></a>
            <a href="#" className="hover:text-blue-600"><Linkedin size={18} /></a>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="font-medium text-gray-700">Your Company</span>.  
        All rights reserved. | Designed with ❤️ by{" "}
        <a
          href="mailto:elishajameel270@gmail.com"
          className="text-blue-600 hover:underline"
        >
          Elisha Jameel
        </a>
      </div>
    </footer>
  );
};

export default Footer;
