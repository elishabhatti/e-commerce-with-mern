import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="border-b border-gray-300 px-6 md:px-10 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-black">
          <NavLink to="/">DEVIAS</NavLink>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 items-center">
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
              <>
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/cart">Cart</NavLink>
                </li>
                <li>
                  <NavLink to="/purchase">Purchase</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
     {/* Mobile Menu */}
{isOpen && (
  <nav className="md:hidden mt-4">
    <ul className="flex flex-col gap-4">
      <li>
        <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
      </li>
      <li>
        <NavLink to="/service" onClick={toggleMenu}>Services</NavLink>
      </li>
      <li>
        <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
      </li>

      {!isLoggedIn && (
        <>
          <li>
            <NavLink to="/register" onClick={toggleMenu}>Register</NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={toggleMenu}>Login</NavLink>
          </li>
        </>
      )}

      {isLoggedIn && (
        <>
          <li>
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="text-blue-500 text-left"
            >
              Logout
            </button>
          </li>
          <li>
            <NavLink to="/profile" onClick={toggleMenu}>Profile</NavLink>
          </li>
          <li>
            <NavLink to="/cart" onClick={toggleMenu}>Cart</NavLink>
          </li>
          <li>
            <NavLink to="/purchase" onClick={toggleMenu}>Purchase</NavLink>
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
