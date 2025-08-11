"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative overflow-hidden  text-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isAnimating ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Text content */}
          <div className="lg:w-1/2 space-y-6">
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-100 bg-gray-700 bg-opacity-50 rounded-full">
                Start learning your way.
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
            >
              Build Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
                Personalized
              </span>{" "}
              Learning Companion
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 max-w-2xl"
            >
              Pick a name, subject, voice, & personality — and start learning
              through voice conversations that feel natural and fun.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-4">
              <Link href="/companions/new">
                <button className="relative group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-600 rounded-lg font-medium hover:bg-gray-600 text-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
                  <span className="relative z-10 flex items-center">
                    <Image
                      src="/icons/plus.svg"
                      alt="plus"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                    Build a New Companion
                  </span>
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Image/Illustration */}
          <motion.div
            variants={fadeInUp}
            className="lg:w-1/2 relative"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative p-12">
              {/* Radiant shadow background */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <div
                    className="absolute inset-0 bg-radial from-gray-100 via-gray-300 to-gray-50 opacity-20 rounded-full filter blur-3xl"
                    style={{
                      width: "450%",
                      height: "450%",
                      //   marginLeft: "-25%",
                      //   marginTop: "-25%",
                    }}
                  />
                </div>
              </div>

              {/* Image with subtle glow */}
              <div className="relative z-10">
                <Image
                  src="images/cta.svg"
                  alt="Learning Companion"
                  width={500}
                  height={400}
                  className="w-full h-auto drop-shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
