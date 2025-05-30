import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header>
        <div className="flex mb-20 justify-between border-b border-gray-300 items-center py-3 px-10">
          <div className="text-2xl">
            <NavLink to="/">DEVIAS</NavLink>
          </div>

          <nav >
            <ul className="flex gap-5">
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>
              <li>
                <NavLink to="/service"> Services </NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact </NavLink>
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
              <>
                <li>
                  <NavLink to="/register"> Register </NavLink>
                </li>
                <li>
                  <NavLink to="/login"> Login </NavLink>
                </li>
              </>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
