import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LuxuryHeroSection = () => {
  const fadeUpVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const textFadeVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div className="relative min-h-screen text-black pb-10">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/hero.jpg" // Replace with your actual image path
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="filter grayscale-[50%] blur-[0px]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-80" />

      {/* Urdu Text */}
      <div className="absolute inset-0 text-center text-white/50 font-serif opacity-80">
        <motion.div
          variants={textFadeVariant}
          initial="hidden"
          animate="visible"
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2"
        >
          <span className="block text-9xl sm:text-[12rem] md:text-[15rem] font-bold">
            کشمیر آرٹ
          </span>
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-28 pb-40">
        <div className="max-w-6xl">
          {/* Decorative Line */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px bg-gray-500/30 w-20" />
            <span className="text-sm tracking-[0.3em] text-gray-950 uppercase">
              Since 1892
            </span>
            <div className="h-px bg-gray-500/30 w-20" />
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="font-serif text-5xl sm:text-7xl md:text-6xl leading-tight text-gray-950 mb-6 tracking-wider"
          >
            Luxury in Every Stitch, Tradition in Every Thread
          </motion.h1>

          {/* Hero Description */}
          <motion.p
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl text-gray-800 mb-12 font-serif italic leading-relaxed"
          >
            Experience the timeless artistry of{" "}
            <span className="text-2xl font-extrabold text-white italic">
              کشمیر,
            </span>{" "}
            where each stitch tells a story of tradition, passion, and unmatched
            craftsmanship. Elevate your space with the elegance of handcrafted
            embroidery passed down through generations.
          </motion.p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-6">
            <motion.button
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#333333",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              }}
              className="group bg-gray-900 text-white px-10 py-4 flex items-center justify-center text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Link href="/shop">
                <p className="flex items-center">
                  Shop the Collection
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </p>
              </Link>
            </motion.button>

            <motion.button
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#444444",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              }}
              className="group border-2 border-gray-700 text-gray-900 px-10 py-4 flex items-center justify-center text-lg hover:bg-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <Link href="/artisans">
                <p className="flex items-center">
                  Discover the Artisans
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </p>
              </Link>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryHeroSection;
