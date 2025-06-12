/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-10 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:via-black dark:to-gray-900 overflow-hidden"
    >
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10">
        <motion.div
          className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl pb-4 font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
            My Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building solutions that bridge technology and human needs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            <p>
              I'm{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Partha Pattanayak
              </span>
              , a final-year B.Tech IT student and full-stack developer
              specializing in creating intuitive digital experiences. My work
              combines strong technical expertise with a passion for solving
              real-world problems through code.
            </p>

            {/* Quote Box - Reintroduced from previous version */}
            <div className="relative p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
              <p className="italic">
                "I thrive at the intersection of logic and creativity,
                transforming complex requirements into elegant solutions that
                exceed expectations."
              </p>
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                ❝
              </div>
            </div>

            <div className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
              <p className="mb-4">
                With expertise in both{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  MERN stack
                </span>{" "}
                and{" "}
                <span className="font-semibold text-orange-500 dark:text-orange-400">
                  Java development
                </span>
                , I build solutions that are:
              </p>
              <ul className="space-y-3 pl-5 list-disc">
                <li>Scalable and maintainable</li>
                <li>User-focused with clean interfaces</li>
                <li>Performance-optimized</li>
                <li>Secure by design</li>
              </ul>
            </div>

            <p>
              What drives me is the challenge of transforming complex
              requirements into elegant solutions. I believe great software
              should be{" "}
              <span className="font-medium text-green-600 dark:text-green-400">
                powerful under the hood
              </span>{" "}
              while remaining{" "}
              <span className="font-medium text-cyan-600 dark:text-cyan-400">
                simple to use
              </span>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
