"use client";
import React from "react";
import Image from "next/image";

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
          src="/hero.jpg"
          alt="Hero Background"
          width={700}
          height={900}
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="rounded scale-110"
          priority
        />
      </div>

      {/* Right Side: Text Content */}
    </div>
  );
};

export default LuxuryHeroSection;
