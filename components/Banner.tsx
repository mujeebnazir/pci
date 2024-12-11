"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const WhyPCIBanner = () => {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white items-center justify-center overflow-hidden  ">
      <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">
        Our Process
      </h2>
      <InfiniteMovingCards
        items={embroiderySteps}
        direction="right"
        speed="slow"
        className="p-4"
      />
    </div>
  );
}
export default WhyPCIBanner;
const embroiderySteps = [
  {
    quote: "Handpicked fabrics chosen for their quality and durability.",
    name: "Foundation of Excellence",
    title: "Fabric Selection",
  },
  {
    quote: "Traditional Kashmiri embroidery patterns are carefully sketched.",
    name: "Artistic Vision",
    title: "Design Creation",
  },
  {
    quote: "Artisans use needle and thread to create intricate embroidery.",
    name: "Masterful Craftsmanship",
    title: "Hand Embroidery",
  },
  {
    quote: "Final products are inspected and finished with precision.",
    name: "Perfecting the Art",
    title: "Quality Assurance",
  },
];
