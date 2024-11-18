"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import hero from "../public/hero.jpg"; // Ensure this is a unique image
import hero2 from "../public/hero2.jpg"; // Ensure this is a unique image
import hero3 from "../public/hero3.jpg"; // Ensure this is a unique image

const HeroContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [hero, hero2, hero3];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      handleNext();
    }, 4000);

    return () => clearTimeout(interval);
  }, [activeIndex]);

  return (
    <div id="indicators-carousel" className="relative w-full h-[60vh]">
      {/* Carousel wrapper */}
      <div className="relative h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              index === activeIndex ? "opacity-100" : "opacity-0"
            } absolute inset-0 transition-opacity duration-700 ease-in-out`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              priority={index === activeIndex} // Preload active image
            />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full ${
              activeIndex === index ? "bg-white" : "bg-gray-500"
            }`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        onClick={handlePrev}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        aria-label="Previous"
      >
        <span className="w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              d="M5 1L1 5l4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <button
        onClick={handleNext}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        aria-label="Next"
      >
        <span className="w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              d="M1 9l4-4-4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default HeroContent;
