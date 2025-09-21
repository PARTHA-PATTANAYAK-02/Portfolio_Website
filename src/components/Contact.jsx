/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaDownload, FaCheck, FaSpinner } from "react-icons/fa";
import emailjs from "@emailjs/browser"; // Install with: npm install @emailjs/browser
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false });

    // Replace with your EmailJS service ID, template ID, and public key
    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLETE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
      (result) => {
        console.log(result.text);
        setStatus({ submitting: false, success: true, error: false });
        setFormData({ name: "", email: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus({ submitting: false, success: false, error: false });
        }, 5000);
      },
      (error) => {
        console.log(error.text);
        setStatus({ submitting: false, success: false, error: true });

        // Reset error message after 5 seconds
        setTimeout(() => {
          setStatus({ submitting: false, success: false, error: false });
        }, 5000);
      }
    );
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden"
    >
      {/* Background elements... */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
            Let's Connect
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to collaborate or just say hello? Drop me a message!
          </p>
        </div>

        






        
        <div className="grid md:grid-cols-1 gap-8">
          {/* Form Card */}


          
          {/* /// send card */}

          {/* Info Card */}
          <motion.div
            className="relative"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {/* 3D Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-2xl shadow-xl blur-lg"></div>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-indigo-400/20 dark:bg-cyan-400/20 rounded-lg"
                  style={{
                    width: `${Math.random() * 100 + 50}px`,
                    height: `${Math.random() * 100 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    rotate: `${Math.random() * 360}deg`,
                  }}
                  animate={{
                    y: [0, Math.random() * 40 - 20],
                    x: [0, Math.random() * 40 - 20],
                    rotate: [0, Math.random() * 90 - 45],
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

            







            {/* Content Card */}
            <div className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg flex flex-col justify-between relative overflow-hidden">
              {/* 3D Icons */}
              <div className="absolute -right-6 -top-6 opacity-20 dark:opacity-30">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M60 120C93.1371 120 120 93.1371 120 60C120 26.8629 93.1371 0 60 0C26.8629 0 0 26.8629 0 60C0 93.1371 26.8629 120 60 120Z"
                    fill="url(#paint0_linear_123)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_123"
                      x1="60"
                      y1="0"
                      x2="60"
                      y2="120"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6366F1" />
                      <stop offset="1" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Connect With Me
                </h3>

                <div className="space-y-6 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-4 p-3 bg-white/50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-300">
                      <FiMail className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email me at
                      </p>
                      <a
                        href="mailto:p.portfolio2002@gmail.com"
                        className="font-medium text-indigo-600 dark:text-cyan-400 hover:underline"
                      >
                        p.portfolio2002@gmail.com
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3">Find me on socials:</p>
                    <div className="flex gap-3">
                      {/* LinkedIn */}
                      <motion.a
                        href="https://www.linkedin.com/in/iampartha02"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        whileHover={{ y: -3, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaLinkedin className="text-xl" />
                      </motion.a>

                      {/* Facebook */}
                      <motion.a
                        href="https://www.facebook.com/iamparthapattanayak"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        whileHover={{ y: -3, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaFacebook className="text-xl" />
                      </motion.a>

                      {/* Add more social icons as needed */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Resume Button */}
              <motion.div
                className="mt-8"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <a
                  href="/Partha_Resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white py-3 px-6 rounded-xl font-medium transition-all shadow-lg hover:shadow-indigo-500/30 w-full"
                >
                  <FaDownload />
                  <span>Download Resume</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
