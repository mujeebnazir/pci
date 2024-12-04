import React from "react";
import {
  FaRegFlag,
  FaHandPaper,
  FaRegCheckCircle,
  FaShippingFast,
  FaUndo,
} from "react-icons/fa"; // Importing relevant icons

const WhyPCIBanner = () => {
  return (
    <section className="py-12 px-6 sm:px-8 md:px-12 lg:px-16 bg-gray-100 text-gray-800 relative transition-transform duration-500 ease-out transform hover:scale-105 hover:translate-y-2 shadow-lg hover:shadow-2xl">
      {/* Heading: Why PCI? */}
      <h2 className="text-3xl sm:text-4xl font-mono font-bold text-center text-gray-900 mb-8">
        Why PCI?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {/* First Column: Handloom Fabrics */}
        <div className="flex flex-col items-center text-center">
          <FaRegFlag className="text-4xl mb-4 text-black" />
          <h3 className="text-xl font-light">Handloom Fabrics</h3>
        </div>

        {/* Second Column: Hand Made */}
        <div className="flex flex-col items-center text-center">
          <FaHandPaper className="text-4xl mb-4 text-black" />
          <h3 className="text-xl font-light">Hand Made</h3>
        </div>

        {/* Third Column: Pure Pashmina */}
        <div className="flex flex-col items-center text-center">
          <FaRegCheckCircle className="text-4xl mb-4 text-black" />
          <h3 className="text-xl font-light">Pure Pashmina</h3>
        </div>

        {/* Fourth Column: Woolmark Certified */}
        <div className="flex flex-col items-center text-center">
          <FaRegCheckCircle className="text-4xl mb-4 text-black" />
          <h3 className="text-xl font-light">Woolmark Certified</h3>
        </div>

        {/* Fifth Column: Easy Returns */}
        <div className="flex flex-col items-center text-center">
          <FaUndo className="text-4xl mb-4 text-black" />
          <h3 className="text-xl font-light">Easy Returns</h3>
        </div>
      </div>
    </section>
  );
};

export default WhyPCIBanner;
