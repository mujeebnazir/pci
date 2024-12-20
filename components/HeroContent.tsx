"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";


const LuxuryHeroSection = () => {
  const { scrollY } = useScroll();
  const scrolltoBestSellers = () =>{
    const element = document.getElementById("bestSellers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

  }
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between min-h-[100vh] w-full px-4 sm:px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 mt-20">
      {/* Left Side: Content */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center space-y-6 md:space-y-8 z-10">
        <span className="text-sm md:text-base text-gray-600 font-medium tracking-wider uppercase">
          Premium Collection
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
          Luxury in Every <span className="text-gray-700">Stitch</span>
          <br />
          Tradition in Every <span className="text-gray-700">Thread</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
          Discover timeless craftsmanship designed for modern elegance. Each
          piece tells a story of heritage and innovation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={scrolltoBestSellers} className="group bg-black text-white font-medium py-4 px-8 rounded-full hover:bg-gray-800 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500 flex items-center justify-center">
              Shop Collection
              <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          
         
        </div>
      </div>

      {/* Right Side: Image */}
      <motion.div 
        style={{ y }}
        className="w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-[600px] relative mt-12 md:mt-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200/30 to-transparent rounded-3xl" />
        <Image
          src="/hero.jpg"
          alt="Luxury Collection"
          fill
          priority
          className="rounded-3xl object-cover"
          style={{ objectPosition: "center" }}
        />
      </motion.div>
    </div>
  );
};

export default LuxuryHeroSection;
