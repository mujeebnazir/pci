'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'

type Props = {
  images: { src: string; alt: string }[];
};

const Showcase: React.FC<Props> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <Card className="w-full max-w-7xl mx-auto overflow-hidden bg-white border-4 border-black">
      <CardContent className="p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side: Quote, Button, and Featured Image */}
          <div className="space-y-6">
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
                Embrace the Art of Kashmir
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                Where Every Stitch Tells a Story
              </p>
              <Button size="lg" className="w-full sm:w-auto bg-gray-950 hover:bg-gray-800 text-white">
                Explore Collection
              </Button>
            </motion.div>
            
            <motion.div 
              className="relative overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AspectRatio ratio={16/9}>
                <Image
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <Button variant="ghost" size="icon" onClick={prevImage} className="text-white hover:bg-white/20">
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <p className="text-white text-sm font-medium">{images[currentImageIndex].alt}</p>
                <Button variant="ghost" size="icon" onClick={nextImage} className="text-white hover:bg-white/20">
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 text-white hover:bg-white/20"
                onClick={() => setIsExpanded(true)}
              >
                <Expand className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Right Side: Image Grid */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md"
                whileHover={{ scale: 1.05, zIndex: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AspectRatio ratio={1}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white text-sm font-medium text-center px-2">{image.alt}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardContent>

      {/* Expanded Image Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 text-white hover:bg-white/20"
                onClick={() => setIsExpanded(false)}
              >
                <Expand className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default Showcase;

