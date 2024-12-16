import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const KashmirEmbroidery = () => {
  const products = [
    {
      id: 1,
      name: "Pashmina Shawl",
      description:
        "The luxurious Pashmina shawl, handwoven with intricate Kashmiri embroidery, has been a symbol of elegance since ancient times. Each piece is meticulously crafted by skilled artisans using the finest wool from the Changthangi goat, found in the high altitudes of Ladakh. Our artisans spend months perfecting each shawl, ensuring that every stitch tells a story of Kashmir's rich cultural heritage. The delicate embroidery patterns are inspired by nature, featuring motifs of flowers, leaves and traditional paisley designs that have been passed down through generations.",
      image: "./pashmina.jpg",
    },
    {
      id: 2,
      name: "Kashmiri Kurta",
      description:
        "A traditional Kashmiri kurta that exemplifies the pinnacle of regional craftsmanship. Each garment features exquisite threadwork executed with remarkable precision, incorporating classic motifs like the chinar leaf, lotus flowers, and intricate paisley patterns. Our master craftsmen use age-old techniques to create these wearable pieces of art, taking inspiration from Kashmir's breathtaking landscapes and rich cultural tapestry. The intricate embroidery work can take weeks to complete, with each stitch carefully placed to create stunning visual narratives.",
      image: "./pashmina.jpg",
    },
    {
      id: 3,
      name: "Chain Stitch Cushion Cover",
      description:
        "These masterfully crafted cushion covers showcase the iconic Kashmiri chain stitch, known locally as 'Zalakdozi'. Each piece tells a story through its vibrant colors and intricate patterns, featuring traditional motifs inspired by Kashmir's natural landscape. Our skilled artisans use premium quality threads and fabrics to create these stunning home decor pieces. The chain stitch technique requires immense skill and patience, with each design carefully mapped out before the intricate embroidery process begins. These cushion covers are not just decorative items, but pieces of Kashmir's living artistic heritage.",
      image: "./pashmina.jpg",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-background to-muted py-16 sm:py-24">
      <div className="container px-6 sm:px-8 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16 sm:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight px-4 text-gray-800">
            The Art of Kashmiri Embroidery
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 leading-relaxed">
            Discover the timeless beauty of Kashmir's heritage through our
            collection of handcrafted masterpieces.
          </p>
        </motion.div>

        <div className="mt-12 space-y-20 sm:space-y-32">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="border-none  bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <CardContent
                  className={`flex flex-col gap-8 sm:gap-12 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center p-6 sm:p-10`}
                >
                  <div className="w-full lg:w-2/5">
                    <motion.div
                      className="relative group overflow-hidden rounded-2xl"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="overflow-hidden aspect-[4/3] sm:aspect-[3/2]">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]"></div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="w-full lg:w-3/5 space-y-4 sm:space-y-6 px-4 sm:px-6"
                    whileHover={{ x: index % 2 === 0 ? [0, 8, 0] : [0, -8, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed line-clamp-4 sm:line-clamp-none">
                      {product.description}
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KashmirEmbroidery;
