import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  const handleScroll = (id) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <header className="fixed w-full top-0 left-0 backdrop-blur-md bg-transparent text-black z-50">
      <nav className="relative w-full py-4 flex items-center">

        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold pl-4">
          PD
        </NavLink>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium absolute left-1/2 -translate-x-1/2">

          <li>
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>
          </li>

          <li>
            <button onClick={() => handleScroll("skills")} className="hover:text-blue-600">
              Skills
            </button>
          </li>

          <li>
            <button onClick={() => handleScroll("projects")} className="hover:text-blue-600">
              Projects
            </button>
          </li>

          <li>
            <NavLink to="/competitive" className={navClass}>
              Competitive Programming
            </NavLink>
          </li>

          <li>
            <button onClick={() => handleScroll("achievements")} className="hover:text-blue-600">
              Achievements
            </button>
          </li>

          <li>
            <button onClick={() => handleScroll("about")} className="hover:text-blue-600">
              About
            </button>
          </li>
        </ul>

        {/* Resume */}
        <a
          href="/resume.pdf"
          className="ml-auto mr-4 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          Resume
        </a>
      </nav>
    </header>
  );
};

const navClass = ({ isActive }) =>
  isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600";

export default Navbar;