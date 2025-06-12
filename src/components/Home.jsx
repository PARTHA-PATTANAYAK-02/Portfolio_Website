/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDocumentDownload } from "react-icons/hi";
import { SiLeetcode } from "react-icons/si";
import avatar from "../images/partha.png";
import backgroundPattern from "../images/dark.png";

const Home = () => {
  const [hoverAvatar, setHoverAvatar] = useState(false);
  const [hoverProject, setHoverProject] = useState(false);
  const [hoverResume, setHoverResume] = useState(false);

  const textLines = [
    { text: "MERN Stack Developer", emoji: "🚀" },
    { text: "Java Enthusiast", emoji: "☕" },
    { text: "Building Web & Software Solutions", emoji: "💻" },
  ];

  const socialLinks = [
    {
      icon: <FaGithub className="text-xl" />,
      url: "https://github.com/PARTHA-PATTANAYAK-02",
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      url: "https://www.linkedin.com/in/iampartha02/",
    },
    {
      icon: <SiLeetcode className="text-xl" />,
      url: "https://leetcode.com/u/PARTHA_PATTANAYAK/",
    },
  ];

  // Tech stack for floating icons
  const techStack = [
    { name: "React", color: "text-blue-400" },
    { name: "Node.js", color: "text-green-400" },
    { name: "Java", color: "text-red-400" },
    { name: "MongoDB", color: "text-green-500" },
    { name: "Express", color: "text-gray-300" },
    { name: "MySQL", color: "text-blue-300" },
    { name: "JavaScript", color: "text-yellow-400" },
    { name: "Tailwind", color: "text-cyan-400" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4 overflow-hidden"
    >
      {/* Enhanced Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(80)].map((_, i) => {
          const size = Math.random() * 6 + 2;
          const duration = Math.random() * 20 + 20;
          const delay = Math.random() * 5;
          const colors = [
            "bg-cyan-400",
            "bg-blue-400",
            "bg-purple-400",
            "bg-pink-400",
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];

          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${color}`}
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.8,
                filter: "blur(1px)",
              }}
              animate={{
                y: [0, Math.random() * 300 - 150],
                x: [0, Math.random() * 300 - 150],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Enhanced Background Pattern with Animation */}
      <motion.div
        className="absolute inset-0 z-0 opacity-10"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src={backgroundPattern}
          alt=""
          className="w-full h-full object-cover"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black z-1" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-1" />

      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-4 py-20">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Hi, I'm Partha{" "}
                <span className="text-4xl sm:text-6xl">Pattanayak</span>
              </span>
            </h1>
          </motion.div>

          <div className="space-y-4">
            {textLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-300 flex items-center gap-2"
              >
                <span className="text-cyan-400">{line.emoji}</span> {line.text}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoverProject(true)}
              onHoverEnd={() => setHoverProject(false)}
            >
              <Link
                to="projects"
                smooth
                duration={500}
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-full cursor-pointer transition-all shadow-lg shadow-cyan-500/20 relative overflow-hidden"
              >
                {hoverProject && (
                  <motion.span
                    className="absolute inset-0 bg-white opacity-10"
                    initial={{ x: -100 }}
                    animate={{ x: 400 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                View Projects
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoverResume(true)}
              onHoverEnd={() => setHoverResume(false)}
            >
              <a
                href="/Partha_Resume.pdf"
                download
                className="inline-flex items-center gap-2 border-2 border-cyan-400 hover:bg-cyan-400/10 text-cyan-400 px-8 py-3 rounded-full cursor-pointer transition-all shadow-lg shadow-cyan-500/10 relative overflow-hidden"
              >
                {hoverResume && (
                  <motion.span
                    className="absolute inset-0 bg-cyan-400 opacity-10"
                    initial={{ x: -100 }}
                    animate={{ x: 400 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <HiDocumentDownload className="text-xl" />
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex gap-4 justify-center md:justify-start mt-8"
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -5,
                  scale: 1.1,
                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-800 hover:bg-blue-500/20 p-3 rounded-full text-gray-300 hover:text-white transition-colors shadow-md border border-gray-700 hover:border-blue-400"
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Avatar Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
          onHoverStart={() => setHoverAvatar(true)}
          onHoverEnd={() => setHoverAvatar(false)}
        >
          {/* Floating tech icons container */}
          <div className="absolute inset-0 overflow-visible">
            {hoverAvatar &&
              techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className={`absolute right-35 top-35 z-10 bg-gray-900/80 backdrop-blur-sm ${tech.color} rounded-full px-3 py-1 text-xs font-bold shadow-lg border border-gray-700`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: Math.cos((i / techStack.length) * Math.PI * 2) * 120,
                    y: Math.sin((i / techStack.length) * Math.PI * 2) * 120,
                  }}
                  transition={{
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(17, 24, 39, 0.9)",
                  }}
                >
                  {tech.name}
                </motion.div>
              ))}
          </div>

          {/* 3D floating effect */}
          <motion.div
            animate={{
              rotateY: hoverAvatar ? 10 : 0,
              rotateX: hoverAvatar ? -5 : 0,
              y: hoverAvatar ? -10 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative w-full h-full"
          >
            {/* Glowing border */}
            <motion.div
              animate={{
                boxShadow: hoverAvatar
                  ? "0 0 40px 15px rgba(59, 130, 246, 0.6)"
                  : "0 0 20px 8px rgba(59, 130, 246, 0.4)",
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 p-1"
            >
              {/* Inner glow */}
              {hoverAvatar && (
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(59, 130, 246, 0.8) 0%, transparent 70%)",
                  }}
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Avatar image with shine effect */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-transparent">
              <img
                src={avatar}
                alt="Partha Pattanayak"
                className="w-full h-full object-cover"
              />
              {hoverAvatar && (
                <motion.div
                  className="absolute inset-0 bg-white/10 pointer-events-none"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 300, opacity: 0.4 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 20, 0] }}
        transition={{
          delay: 1.5,
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute bottom-10 z-10"
      >
        <Link
          to="projects"
          smooth
          duration={500}
          className="cursor-pointer flex flex-col items-center group"
        >
          <div className="relative w-12 h-20 rounded-full border-2 border-cyan-400 flex justify-center group-hover:border-cyan-300 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-1 h-6 bg-cyan-400 rounded-full mt-3 group-hover:bg-cyan-300 transition-colors"
            />
          </div>
          <span className="text-cyan-400 text-sm mt-3 group-hover:text-cyan-300 transition-colors">
            Scroll Down
          </span>
        </Link>
      </motion.div>
    </section>
  );
};

export default Home;
