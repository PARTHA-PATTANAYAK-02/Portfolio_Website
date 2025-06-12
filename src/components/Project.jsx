/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Authentication_login from "../images/Authentication_login.png";
import Weather from "../images/Weather_app.png";
import Chatbot from "../images/Aichatbot.png";
import Typing from "../images/TypingSpeed.png";
import CurrencyConverter from "../images/CurrencyConverter.png";
import Bmi from "../images/Bmi.png";
const projects = [
  {
    title: "🔐 Authentication App",
    description: "A full-stack user authentication system.",
    details:
      "A full-stack user authentication system built with React, Node.js, Express, and MongoDB Atlas. The app supports user registration, login, logout, protected routes, and toast notifications. JWT is used for authentication and stored in localStorage for persistent login.",
    image: Authentication_login,
    tech: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Node.js",
      "Express.js v5",
      "MongoDB Atlas",
    ],
    live: "https://authentication-frontend-0fye.onrender.com/",
    code: "https://github.com/PARTHA-PATTANAYAK-02/Authentication_App.git",
    accentColor: "from-purple-500 to-indigo-600",
  },
  {
    title: "🌦️ Weather App",
    description:
      "Get real-time weather & 15-day forecast using Visual Crossing API.",
    details:
      "Comprehensive weather dashboard featuring current conditions, hourly forecasts, and extended outlooks. Includes location search, temperature unit toggling, and animated weather representations. Integrates with Visual Crossing API for reliable global weather data.",
    image: Weather,
    tech: ["React", "Tailwind CSS", "API", "Geolocation"],
    live: "https://weather-app-snowy-two-19.vercel.app/",
    code: "https://github.com/PARTHA-PATTANAYAK-02/Weather_App.git",
    accentColor: "from-cyan-500 to-blue-600",
  },
  {
    title: "🤖 Gemini AI Chatbot",
    description: "AI chatbot with chat history, dark mode & Lottie animations.",
    details:
      "Advanced conversational AI interface powered by Google's Gemini API. Features include persistent chat history, markdown rendering of responses, prompt suggestions, and theme customization. Implements efficient state management for seamless conversations.",
    image: Chatbot,
    tech: ["React", "Tailwind CSS", "Gemini API", "AI"],
    live: "https://aichatbot-app-five.vercel.app",
    code: "https://github.com/PARTHA-PATTANAYAK-02/Aichatbot_App.git",
    accentColor: "from-emerald-500 to-teal-600",
  },
  {
    title: "🧠 Typing Speed Checker",
    description:
      "A fast, responsive, and beautifully designed Typing Speed Checker App.",
    details:
      "A fast, responsive, and beautifully designed Typing Speed Checker App built using React and Tailwind CSS. Practice typing with real-time feedback, live stats, dark/light theme, and custom test durations.",
    image: Typing,
    tech: ["React", "Tailwind", "Javascript"],
    live: "https://typing-speed-checker-delta.vercel.app/",
    code: "https://github.com/PARTHA-PATTANAYAK-02/Typing_Speed_Checker.git",
    accentColor: "from-amber-500 to-orange-600",
  },
  {
    title: "💱 Currency Converter",
    description: "A simple and interactive currency converter web app.",
    details:
      "A simple and interactive currency converter web app that allows users to convert from one currency to another using real-time exchange rates. Built using HTML, CSS, and JavaScript.",
    image: CurrencyConverter,
    tech: ["HTML", "CSS", "JavaScript", "ExchangeRate-API", "Flags API"],
    live: "https://currency-converter-brown-sigma.vercel.app/",
    code: "https://github.com/PARTHA-PATTANAYAK-02/Currency_Converter.git",
    accentColor: "from-blue-500 to-indigo-600",
  },
  {
    title: "⚖️ BMI Calculator",
    description:
      "A clean and responsive Body Mass Index (BMI) Calculator built with React.",
    details:
      "A clean and responsive Body Mass Index (BMI) Calculator built with React. Quickly compute your BMI based on your height and weight, with real-time feedback and visually distinct health categories.",
    image: Bmi,
    tech: ["React", "CSS", "Javascript"],
    live: "https://bmi-calculator-gules-five.vercel.app/",
    code: "https://github.com/PARTHA-PATTANAYAK-02/Bmi_Calculator.git",
    accentColor: "from-red-500 to-pink-600",
  },
];

const Project = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const modalRef = useRef();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setActiveProject(null);
      }
    };

    if (activeProject) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeProject]);

  return (
    <section
      id="projects"
      className="relative py-5 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 200 - 100],
              x: [0, Math.random() * 200 - 100],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl pb-4 font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            My Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing my best work with cutting-edge technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative h-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Project card */}
              <motion.div
                className={`h-full bg-gradient-to-br ${project.accentColor} p-0.5 rounded-2xl shadow-2xl`}
                animate={{
                  rotateY: hoveredIndex === index ? 5 : 0,
                  rotateX: hoveredIndex === index ? 5 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="h-full bg-gray-900 rounded-2xl p-6 flex flex-col">
                  {/* Project image with hover effect */}
                  <motion.div
                    className="relative overflow-hidden rounded-xl mb-6"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="aspect-video bg-gray-800 flex items-center justify-center">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {/* Glow effect on hover */}
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-5 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className="text-xs font-medium bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-between items-center mt-auto">
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveProject(project)}
                      className="flex items-center gap-2 text-sm font-medium text-white group cursor-pointer"
                    >
                      View details
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <div className="flex gap-4">
                      <motion.a
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt size={18} />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                        title="Source Code"
                      >
                        <FaGithub size={18} />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements on hover */}
              {hoveredIndex === index && (
                <>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white"
                      style={{
                        width: Math.random() * 6 + 2,
                        height: Math.random() * 6 + 2,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.8, 0],
                        y: [0, -Math.random() * 40 - 20],
                        x: [0, (Math.random() - 0.5) * 40],
                      }}
                      transition={{
                        duration: Math.random() * 1.5 + 1,
                        delay: Math.random() * 0.5,
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* More Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block">
            <motion.a
              href="https://github.com/PARTHA-PATTANAYAK-02?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2 text-lg">
                View More Projects on GitHub
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute -bottom-0 -right-0 w-full h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-10 filter blur-lg group-hover:opacity-30 transition-all duration-500"></span>
              <span className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 flex items-center justify-center p-4 z-50"
            >
              <div
                ref={modalRef}
                className={`relative max-w-2xl w-full bg-gradient-to-br ${activeProject.accentColor} p-0.5 rounded-3xl shadow-2xl`}
              >
                <div className="bg-gray-900 rounded-3xl overflow-hidden">
                  <button
                    onClick={() => setActiveProject(null)}
                    className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-gray-800/80 p-2 rounded-full backdrop-blur-sm cursor-pointer"
                  >
                    <FaTimes size={20} />
                  </button>

                  {activeProject.image && (
                    <div className="relative h-50 w-full overflow-hidden">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    <h3 className="text-3xl font-bold mb-4 text-white">
                      {activeProject.title}
                    </h3>
                    <p className="text-gray-300 mb-6 whitespace-pre-line">
                      {activeProject.details}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeProject.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="text-xs font-medium bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        href={activeProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-medium"
                      >
                        View Live Demo
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        href={activeProject.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        View Source Code
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Project;
