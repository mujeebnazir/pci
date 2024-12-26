"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const KashmirEmbroidery = () => {
  const products = [
    {
      id: 1,
      name: "Pashmina Shawl",
      description:
        "The luxurious Pashmina shawl, handwoven with intricate Kashmiri embroidery, has been a symbol of elegance since ancient times. Each piece is meticulously crafted by skilled artisans using the finest wool from the Changthangi goat.",
      image: "./PashminaShawl.jpeg",
      category: "Premium Collection",
      material: "Pure Pashmina Wool",
      type: ["Limited Edition", "Handcrafted"],
    },
    {
      id: 2,
      name: "Kashmiri Kurta",
      description:
        "A traditional Kashmiri kurta that exemplifies the pinnacle of regional craftsmanship. Each garment features exquisite threadwork executed with remarkable precision, incorporating classic motifs like the chinar leaf.",
      image: "./Kurta.jpeg",
      category: "Signature Series",
      material: "Pure Cotton",
      type: ["Artisanal", "Custom Made"],
    },
    {
      id: 3,
      name: "Kashmiri Stole",
      description:
        "This elegant Kashmiri stole, made from the softest wool, features intricate embroidery inspired by the traditional paisley and floral motifs of the region. Lightweight and versatile, it is perfect for adding a touch of sophistication to both casual and formal outfits, making it a must-have accessory.",
      image: "./Stole.jpeg",
      category: "Luxury Accessories",
      material: "Fine Wool",
      type: ["Handcrafted", "Limited Edition"],
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "40px" }}
              className="h-px bg-black mb-8"
            />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight mb-6">
              The Art of Kashmiri Embroidery
            </h2>
            <p className="text-gray-600 text-lg md:text-xl text-center max-w-2xl">
              Discover the timeless beauty of Kashmir's heritage through our
              collection of handcrafted masterpieces.
            </p>
          </div>
        </motion.div>

        <div className="space-y-24">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden border-none ring-1 ring-black/5">
                <CardContent className="p-0">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 ${
                      index % 2 === 0 ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    <div className="relative overflow-hidden">
                      <div className="aspect-[4/3] lg:aspect-auto lg:h-[450px]">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-white text-black text-xs px-3 py-1">
                          {product.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between bg-white">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            {product.type.map((type, i) => (
                              <span
                                key={i}
                                className="text-xs uppercase tracking-wider text-gray-500"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-3xl lg:text-4xl font-bold">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Material</span>
                          <span className="text-gray-600">•</span>
                          <span>{product.material}</span>
                        </div>
                      </div>

                      <motion.div
                        className="mt-8 group/arrow cursor-pointer flex items-center gap-2 text-sm font-medium"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        View Details
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/arrow:translate-x-1 group-hover/arrow:-translate-y-1" />
                      </motion.div>
                    </div>
                  </div>
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
