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
    <div className="logo-showcase-container flex items-center justify-center h-[7rem] mb-4  mx-10 w-full ">
      {/* "In Partnership with" block */}
      <div className="ls-header-wrapper mr-8  ">
        <div className="ls-header-wrapper-subtitle text-left text-xl font-normal">
          In Partnership with
        </div>
      </div>

      {/* Logo Carousel */}
      <div className="splide-container mt-8 overflow-hidden relative border-l border-gray-400">
        <motion.div
          className="splide-track flex items-center"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          exit={{ x: "100%" }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity, // Loop the animation
          }}
        >
          <ul className="splide__list flex">
            {logoData.map((logo, index) => (
              <motion.li
                key={index}
                className="splide__slide mx-10 flex-shrink-0 w-28 md:w-32 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="slide-item flex flex-col justify-center items-center">
                  <span className="ls-logo">
                    <img
                      src={logo.src}
                      alt="Logo"
                      className="w-28 h-28 object-contain" // Set fixed size and maintain aspect ratio
                    />
                  </span>
                  {/* <div className="slide-item-texts mt-2 text-center">
                    <div className="slide-item-subtitle text-sm text-gray-500">
                      {logo.subtitle}
                    </div>
                  </div> */}
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
