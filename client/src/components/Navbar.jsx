import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  House,
  Menu,
  X,
  Info,
  Hammer,
  Phone,
  UserPlus,
  LogIn,
  UserCircle,
  ShoppingCart,
  PackageCheck,
  LogOut,
  Heart,
} from "lucide-react";
import { useAuth } from "../store/auth";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState("");
  const { isLoggedIn } = useAuth();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState("");

  const fetchUserProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
      setProfilePhoto(response.data.data.avatar);
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response?.data || error.message
      );
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleLogout = () => {
    console.log("Logged out");
    navigate("/logout");
  };

  useEffect(() => {
    fetchUserProfileData();
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-b border-gray-300 px-6 md:px-10 py-3">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-black flex gap-2 items-center">
          <div className="bg-black p-2 rounded-full">
            <img className="w-7 h-7" src="/images/logo.png" alt="DEVIAS Logo" />
          </div>
          <NavLink to="/">DEVIAS STORE</NavLink>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className="hidden md:block">
          <ul className="flex gap-6 items-center relative">
            <li>
              <NavLink to="/" className="flex items-center gap-1">
                <House size={18} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="flex items-center gap-1">
                <Info size={18} /> About
              </NavLink>
            </li>
            <li>
              <NavLink to="/service" className="flex items-center gap-1">
                <Hammer size={18} /> Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="flex items-center gap-1">
                <Phone size={18} /> Contact
              </NavLink>
            </li>

            {!isLoggedIn && (
              <>
                <li>
                  <NavLink to="/register" className="flex items-center gap-1">
                    <UserPlus size={18} /> Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="flex items-center gap-1">
                    <LogIn size={18} /> Login
                  </NavLink>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 font-semibold"
                >
                  {user?.avatar && (
                    <img
                      src={
                        profilePhoto
                          ? profilePhoto.startsWith("http")
                            ? profilePhoto
                            : `http://localhost:3000${profilePhoto}`
                          : "https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
                      }
                      alt="Profile"
                      className="w-10 h-10 cursor-pointer rounded-full object-cover"
                    />
                  )}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showDropdown && (
                  <ul className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-lg py-2 z-50">
                    <li>
                      <NavLink
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <UserCircle size={16} /> Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/cart"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <ShoppingCart size={16} /> Cart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/purchase"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <PackageCheck size={16} /> Purchase
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/wishlist"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <Heart size={16} /> Wishlist
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                to="/"
                onClick={toggleMenu}
                className="flex items-center gap-2"
              >
                <House size={18} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={toggleMenu}
                className="flex items-center gap-2"
              >
                <Info size={18} /> About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/service"
                onClick={toggleMenu}
                className="flex items-center gap-2"
              >
                <Hammer size={18} /> Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={toggleMenu}
                className="flex items-center gap-2"
              >
                <Phone size={18} /> Contact
              </NavLink>
            </li>

            {!isLoggedIn && (
              <>
                <li>
                  <NavLink
                    to="/register"
                    onClick={toggleMenu}
                    className="flex items-center gap-2"
                  >
                    <UserPlus size={18} /> Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    onClick={toggleMenu}
                    className="flex items-center gap-2"
                  >
                    <LogIn size={18} /> Login
                  </NavLink>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    onClick={toggleMenu}
                    className="flex items-center gap-2"
                  >
                    <UserCircle size={18} /> Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    onClick={toggleMenu}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart size={18} /> Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/purchase"
                    onClick={toggleMenu}
                    className="flex items-center gap-2"
                  >
                    <PackageCheck size={18} /> Purchase
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/wishlist"
                    onClick={toggleMenu}
                    className="flex items-center gap-2"
                  >
                    <Heart size={18} /> Wishlist
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center gap-2 text-left text-red-500"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
