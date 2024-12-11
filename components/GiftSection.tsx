import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; 
import Image from "next/image"; 

const GiftsSection = () => {
  return (
    <section className="py-12 px-6 sm:px-8 md:px-10 lg:px-12 text-black">
      {/* Improved heading */}
      <motion.h2
        className="text-4xl sm:text-5xl font-semibold text-center text-gray-900 mb-12 leading-tight tracking-wide uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Gifts for Your Special One
      </motion.h2>

      {/* Refined Grid Layout with responsive design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Image 1 with hover scale animation and link */}
        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/category/Women">
            <Image
              src="/For-her.jpg"
              alt="Gift for Women"
              width={500}
              height={400}
              className="w-full h-72 object-cover rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            />
          </Link>
        </motion.div>

        {/* Image 2 with hover scale animation and link */}
        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/category/Mens">
            <Image
              src="/For-Him.jpg"
              alt="Gift for Men"
              width={500}
              height={400}
              className="w-full h-72 object-cover rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            />
          </Link>
        </motion.div>

        {/* Image 3 with hover scale animation and link */}
        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/category/shawls">
            <Image
              src="/For-Unisex.jpg"
              alt="Gift for Unisex"
              width={500}
              height={400}
              className="w-full h-72 object-cover rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftsSection;
