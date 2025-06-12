/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-scroll";
const Footer = () => {
  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/PARTHA-PATTANAYAK-02",
      color: "from-gray-700 to-gray-900",
      hover: "hover:from-gray-800 hover:to-black",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/iampartha02",
      color: "from-blue-600 to-blue-800",
      hover: "hover:from-blue-700 hover:to-blue-900",
    },
    {
      icon: <FaTwitter />,
      url: "https://x.com/its_partha_02",
      color: "from-sky-500 to-sky-700",
      hover: "hover:from-sky-600 hover:to-sky-800",
    },
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/iamparthapattanayak",
      color: "from-blue-700 to-blue-900",
      hover: "hover:from-blue-800 hover:to-blue-950",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/iamparthapattanayak/",
      color: "from-pink-600 to-purple-700",
      hover: "hover:from-pink-700 hover:to-purple-800",
    },
    {
      icon: <FaEnvelope />,
      url: "mailto:p.portfolio2002@gmail.com",
      color: "from-red-500 to-red-700",
      hover: "hover:from-red-600 hover:to-red-800",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-100 to-white dark:from-[#0a0a0a] dark:to-gray-900 py-12 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/20 dark:bg-cyan-400/20"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item.toLowerCase()}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Get In Touch
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-600 dark:text-cyan-400" />
                <a
                  href="mailto:p.portfolio2002@gmail.com"
                  className="hover:underline"
                >
                  p.portfolio2002@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>Moyna , West Bengal , India</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Connect With Me
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl bg-gradient-to-br ${social.color} ${social.hover} shadow-md transition-all`}
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Partha Pattanayak. All rights
            reserved.
          </p>
          <p className="text-xs mt-2 text-gray-500 dark:text-gray-500">
            Built with React, Tailwind CSS, and ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
