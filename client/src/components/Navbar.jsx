import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../store/auth";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState("");
  const { isLoggedIn } = useAuth();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
    // Logout logic here
    console.log("Logged out");
    navigate("/logout");
  };

  // Close dropdown when clicking outside
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
        {/* Logo */}
        <div className="text-2xl font-black">
          <NavLink to="/">DEVIAS</NavLink>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 items-center relative">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/service">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>

            {!isLoggedIn && (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
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
                      src={user.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span>Profile</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showDropdown && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg py-2 z-10">
                    <li>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/cart"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Cart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/purchase"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Purchase
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      >
                        Logout
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
              <NavLink to="/" onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={toggleMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/service" onClick={toggleMenu}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={toggleMenu}>
                Contact
              </NavLink>
            </li>

            {!isLoggedIn && (
              <>
                <li>
                  <NavLink to="/register" onClick={toggleMenu}>
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={toggleMenu}>
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li>
                  <NavLink to="/profile" onClick={toggleMenu}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cart" onClick={toggleMenu}>
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/purchase" onClick={toggleMenu}>
                    Purchase
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="text-left text-red-500"
                  >
                    Logout
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
