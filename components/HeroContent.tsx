import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LuxuryHeroSection = () => {
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const imageY = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <motion.div 
      style={{ y, opacity }}
      className="flex flex-col md:flex-row items-center min-h-screen w-full pt-32 md:pt-40 pb-16 px-4 md:px-10 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Left Side: Content */}
      <motion.div 
        style={{ scale }}
        className="w-full md:w-1/2 flex flex-col items-start justify-center space-y-8 md:pr-12"
      >
        <motion.h1 
          className="text-gray-900 text-4xl md:text-6xl font-bold leading-tight"
        >
          Luxury in Every Stitch,
          <br />
          Tradition in Every Thread.
        </motion.h1>
        <motion.p 
          className="text-gray-600 text-lg md:text-xl max-w-xl"
        >
          Discover timeless craftsmanship designed for modern elegance. Each piece tells a story of heritage and innovation.
        </motion.p>
        <motion.div>
          <Link href="/products">
            <button className="bg-black text-white font-medium py-4 px-8 rounded-lg hover:bg-gray-800 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500 shadow-lg">
              Shop Collection
              <ChevronRight className="inline-block ml-2" />
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Side: Image */}
      <motion.div 
        style={{ y: imageY }}
        className="w-full md:w-1/2 h-[400px] md:h-[600px] relative mt-8 md:mt-0"
      >
        <Image
          src="/hero.jpg"
          alt="Luxury Collection"
          fill
          priority
          className="rounded-2xl object-cover  transform hover:scale-105 transition-transform duration-700"
          style={{ objectPosition: "center" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LuxuryHeroSection;
