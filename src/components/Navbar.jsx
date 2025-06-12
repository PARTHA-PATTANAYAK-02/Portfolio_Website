/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../images/logo.gif";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleNav = () => setNavOpen(!navOpen);
  const closeNav = () => setNavOpen(false);

  const navItems = [
    { name: "Home", to: "home" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "About", to: "about" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#121212] backdrop-blur-md bg-opacity-90 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo with glow effect */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img
            src={logo}
            alt="logo"
            className="h-10 w-10 object-cover rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/20"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Portfolio
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <div
              key={item.to}
              className="relative px-2 py-1"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to={item.to}
                smooth={true}
                duration={500}
                offset={-80}
                className={`relative z-10 px-4 py-2 text-sm font-medium cursor-pointer transition-colors duration-300 ${
                  hoveredItem === index
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {item.name}
              </Link>

              {/* Animated hover underline */}
              {hoveredItem === index && (
                <motion.div
                  layoutId="navHover"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </div>
          ))}

          {/* Contact button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 cursor-pointer"
          >
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleNav}
          whileTap={{ scale: 0.9 }}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none group z-50"
        >
          <span
            className={`absolute block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
              navOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
              navOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
              navOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          />
        </motion.button>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {navOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={closeNav}
                className="fixed inset-0 bg-black z-40 md:hidden"
              />

              {/* Menu */}
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-20 right-4 w-64 bg-[#1e1e1e] rounded-lg shadow-xl z-50 overflow-hidden border border-gray-800 md:hidden"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.to}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border-b border-gray-800 last:border-b-0"
                  >
                    <Link
                      to={item.to}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200"
                      onClick={closeNav}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4"
                >
                  <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="block w-full px-4 py-2 text-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow hover:shadow-purple-500/30 transition-all"
                    onClick={closeNav}
                  >
                    Contact Me
                  </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
