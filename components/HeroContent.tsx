import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LuxuryHeroSection = () => {
  return (
    <div className="flex flex-col my-4 md:flex-row items-center min-h-[80vh]  mx-10 rounded">
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center p-8 md:p-16 space-y-6">
        <h1 className="text-gray-900 text-4xl md:text-5xl font-bold leading-tight">
          Luxury in Every Stitch,
          <br />
          Tradition in Every Thread.
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Discover timeless craftsmanship designed for modern elegance.
        </p>
        <button className="bg-black scale-100 hover:scale-105 text-white font-medium py-3 px-6 rounded hover:bg-gray-800 transition-all focus:outline-none focus:ring-4 focus:ring-gray-500">
          Shop Now
        </button>
      </div>
      {/* Right Side: Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
        <Image
          src="/hero.jpg" // Replace with your actual image path
          alt="Hero Background"
          layout="responsive"
          width={700} // Replace with your image aspect ratio (e.g., width/height)
          height={900} // Use "fill" for full control over scaling
          objectFit="cover"
          className="rounded scale-110" // Zoom effect
          objectPosition="center"
        />
      </div>

      {/* Right Side: Text Content */}
    </div>
  );
};

export default LuxuryHeroSection;
