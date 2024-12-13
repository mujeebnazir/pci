"use client";
import { motion } from "framer-motion";

const logoData = [
  {
    src: "https://logo-showcase.fra1.cdn.digitaloceanspaces.com/prod/uploads/the-kashmir-crafts-1719058369466.png",
    subtitle: "Positive climate impact",
  },
  {
    src: "https://logo-showcase.fra1.cdn.digitaloceanspaces.com/prod/uploads/the-kashmir-crafts-1719057569806.png",
    subtitle: "4.98 out of 5 ratings",
  },
  {
    src: "https://logo-showcase.fra1.cdn.digitaloceanspaces.com/prod/uploads/the-kashmir-crafts-1719057713457.png",
    subtitle: "Eco-friendly products",
  },
  {
    src: "https://logo-showcase.fra1.cdn.digitaloceanspaces.com/prod/uploads/the-kashmir-crafts-1719065925701.png",
    subtitle: "Sustainable craftsmanship",
  },
  {
    src: "https://logo-showcase.fra1.cdn.digitaloceanspaces.com/prod/uploads/the-kashmir-crafts-1722248005561.png",
    subtitle: "Certified organic materials",
  },
];

const LogoCarousel = () => {
  return (
    <div className="logo-showcase-container flex flex-col md:flex-row items-center justify-center h-auto mb-4 mx-4 md:mx-10 w-full">
      {/* "In Partnership with" block */}
      <div className="ls-header-wrapper mb-4 md:mb-0 md:mr-8 ">
        <div className="ls-header-wrapper-subtitle text-center md:text-left text-lg md:text-xl font-normal">
          In Partnership with
        </div>
      </div>

      {/* Logo Carousel */}
      <div className="splide-container overflow-hidden relative border-l border-gray-400 w-full md:w-auto">
        <motion.div
          className="splide-track flex items-center"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          exit={{ x: "100%" }}
          transition={{
            duration: 15, // Adjust speed for desktop
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <ul className="splide__list flex">
            {logoData.map((logo, index) => (
              <motion.li
                key={index}
                className="splide__slide mx-4 md:mx-10 flex-shrink-0 w-24 md:w-28"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="slide-item flex flex-col justify-center items-center">
                  <span className="ls-logo">
                    <img
                      src={logo.src}
                      alt="Logo"
                      className="w-24 h-24 md:w-28 md:h-28 object-contain"
                    />
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default LogoCarousel;
