/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJava,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaAws,
  FaFigma,
  FaNpm,
  FaYarn,
  FaDocker,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiC,
  SiVercel,
  SiNetlify,
  SiRender,
  SiFirebase,
  SiPostman,
  SiCanva,
  SiNodemon,
  SiSocketdotio,
  SiRedux,
  SiJsonwebtokens,
} from "react-icons/si";
import { motion } from "framer-motion";
import { VscAzure, VscVscode } from "react-icons/vsc";

const skills = [
  {
    name: "C",
    icon: <SiC className="text-gray-700" />,
    color: "from-gray-400 to-gray-200",
  },
  {
    name: "Java",
    icon: <FaJava className="text-blue-900" />,
    color: "from-blue-500 to-blue-300",
  },
  {
    name: "Python",
    icon: <FaPython className="" style={{ color: "#E0FF70" }} />,
    color: "from-yellow-700 to-yellow-300",
  },
  {
    name: "HTML",
    icon: <FaHtml5 className="text-orange-800" />,
    color: "from-orange-600 to-orange-400",
  },
  {
    name: "CSS",
    icon: <FaCss3Alt className="text-blue-800" />,
    color: "from-blue-600 to-blue-400",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-sky-900" />,
    color: "from-sky-500 to-sky-300",
  },
  {
    name: "JavaScript",
    icon: <SiJavascript className="text-yellow-600" />,
    color: "from-yellow-500 to-yellow-300",
  },
  {
    name: "React",
    icon: <FaReact className="text-cyan-800" />,
    color: "from-cyan-500 to-cyan-300",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="text-green-800" />,
    color: "from-green-600 to-green-400",
  },
  {
    name: "Express.js",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/express.svg"
        alt="Express.js"
        className="w-10 h-10 text-yellow-900"
      />
    ),
    color: "from-yellow-800 to-yellow-600",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-800" />,
    color: "from-emerald-600 to-emerald-400",
  },
  {
    name: "MySQL",
    icon: <SiMysql className="text-blue-900" />,
    color: "from-blue-700 to-blue-500",
  },
];

const toolsAndPlatforms = [
  {
    category: "IDEs/Editors",
    items: [
      {
        name: "VS Code",
        icon: <VscVscode className="text-blue-500" />,
        color: "from-blue-400 to-blue-200",
      },
    ],
  },
  {
    category: "Version Control",
    items: [
      {
        name: "Git",
        icon: <FaGitAlt className="text-orange-600" />,
        color: "from-orange-500 to-orange-300",
      },
      {
        name: "GitHub",
        icon: <FaGithub className="text-gray-800" />,
        color: "from-gray-600 to-gray-400",
      },
    ],
  },
  {
    category: "Deployment",
    items: [
      {
        name: "Vercel",
        icon: <SiVercel className="text-black" />,
        color: "from-gray-200 to-gray-100",
      },
      {
        name: "Netlify",
        icon: <SiNetlify className="text-teal-500" />,
        color: "from-teal-400 to-teal-200",
      },
      {
        name: "Render",
        icon: <SiRender className="text-gray-700" />,
        color: "from-gray-500 to-gray-300",
      },
    ],
  },
  // {
  //   category: "Cloud & DevOps",
  //   items: [
  //     {
  //       name: "AWS",
  //       icon: <FaAws className="text-orange-600" />,
  //       color: "from-orange-500 to-orange-300",
  //     },
  //     {
  //       name: "Azure",
  //       icon: <VscAzure className="text-blue-600" />,
  //       color: "from-blue-500 to-blue-300",
  //     },
  //     {
  //       name: "Firebase",
  //       icon: <SiFirebase className="text-yellow-500" />,
  //       color: "from-yellow-400 to-yellow-200",
  //     },
  //   ],
  // },
  {
    category: "API Tools",
    items: [
      {
        name: "Postman",
        icon: <SiPostman className="text-orange-500" />,
        color: "from-orange-400 to-orange-200",
      },
    ],
  },
  // {
  //   category: "Design",
  //   items: [
  //     {
  //       name: "Figma",
  //       icon: <FaFigma className="text-purple-600" />,
  //       color: "from-purple-500 to-purple-300",
  //     },
  //     {
  //       name: "Canva",
  //       icon: <SiCanva className="text-blue-500" />,
  //       color: "from-blue-400 to-blue-200",
  //     },
  //   ],
  // },
  {
    category: "Package Managers",
    items: [
      {
        name: "npm",
        icon: <FaNpm className="text-red-600" />,
        color: "from-red-500 to-red-300",
      },
      // {
      //   name: "yarn",
      //   icon: <FaYarn className="text-blue-500" />,
      //   color: "from-blue-400 to-blue-200",
      // },
    ],
  },
  // {
  //   category: "Other Tools",
  //   items: [
  //     {
  //       name: "nodemon",
  //       icon: <SiNodemon className="text-green-600" />,
  //       color: "from-green-500 to-green-300",
  //     },
  //     {
  //       name: "JWT",
  //       icon: <SiJsonwebtokens className="text-purple-600" />,
  //       color: "from-purple-500 to-purple-300",
  //     },
  //     {
  //       name: "Socket.io",
  //       icon: <SiSocketdotio className="text-black" />,
  //       color: "from-gray-500 to-gray-300",
  //     },
  //     {
  //       name: "Docker",
  //       icon: <FaDocker className="text-blue-500" />,
  //       color: "from-blue-400 to-blue-200",
  //     },
  //     {
  //       name: "Redux",
  //       icon: <SiRedux className="text-purple-600" />,
  //       color: "from-purple-500 to-purple-300",
  //     },
  //   ],
  // },
];

const Skills = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredToolIndex, setHoveredToolIndex] = useState(null);

  return (
    <section
      id="skills"
      className="relative py-16 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              My Skills
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies I’ve learned and applied
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="relative perspective-1000"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <motion.div
                className={`relative h-32 rounded-xl shadow-lg bg-gradient-to-br ${skill.color} p-4 flex flex-col items-center justify-center cursor-pointer`}
                whileHover={{
                  y: -10,
                  rotateX: 10,
                  rotateY: 5,
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                animate={{
                  rotateX: hoveredIndex === index ? 10 : 0,
                  rotateY: hoveredIndex === index ? 5 : 0,
                  y: hoveredIndex === index ? -10 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {/* Glow effect */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0"
                    style={{
                      background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)`,
                    }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                <div className="text-4xl mb-2 transform transition-transform duration-300 group-hover:scale-110">
                  {skill.icon}
                </div>
                <h3 className="text-sm md:text-base font-semibold text-white text-center">
                  {skill.name}
                </h3>

                {/* Floating particles on hover */}
                {hoveredIndex === index && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                          width: Math.random() * 4 + 2,
                          height: Math.random() * 4 + 2,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 0.8, 0],
                          y: [0, -Math.random() * 30 - 10],
                          x: [0, (Math.random() - 0.5) * 20],
                        }}
                        transition={{
                          duration: Math.random() * 1 + 1,
                          delay: Math.random() * 0.5,
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tools & Platforms Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Tools & Platforms
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Tools and platforms I use to build, deploy, and manage applications
          </p>
        </motion.div>

        <div className="space-y-8">
          {toolsAndPlatforms.map((category, catIndex) => (
            <div key={catIndex} className="mb-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h3 className="text-xl font-bold text-purple-300 whitespace-nowrap">
                  {category.category}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 to-purple-900/10"></div>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="relative perspective-1000"
                    onMouseEnter={() =>
                      setHoveredToolIndex(`${catIndex}-${itemIndex}`)
                    }
                    onMouseLeave={() => setHoveredToolIndex(null)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: itemIndex * 0.03 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={`relative h-24 w-24 rounded-lg shadow-lg bg-gradient-to-br ${item.color} p-3 flex flex-col items-center justify-center cursor-pointer`}
                      whileHover={{
                        y: -5,
                        rotateX: 10,
                        rotateY: 5,
                        scale: 1.05,
                        boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2)",
                      }}
                      animate={{
                        rotateX:
                          hoveredToolIndex === `${catIndex}-${itemIndex}`
                            ? 10
                            : 0,
                        rotateY:
                          hoveredToolIndex === `${catIndex}-${itemIndex}`
                            ? 5
                            : 0,
                        y:
                          hoveredToolIndex === `${catIndex}-${itemIndex}`
                            ? -5
                            : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      <div className="text-3xl mb-1">{item.icon}</div>
                      <h3 className="text-xs font-semibold text-white text-center">
                        {item.name}
                      </h3>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
