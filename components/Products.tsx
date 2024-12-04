"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";

const LazyCard = React.lazy(() => import("@/components/Card"));

interface Product {
  id: string | undefined;
  name: string;
  description: string;
  price: number;
  sizesAvailable: string[];
  itemsCount: number;
  category: string;
  images: string[];
  createdAt: string;
}

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  const [visibleProductsCount, setVisibleProductsCount] = useState(8);

  // Handler to load more products
  const handleLoadMore = () => {
    setVisibleProductsCount((prevCount) => prevCount + 8); 
  };

  const visibleProducts = products.slice(0, visibleProductsCount);

  // Animation variants for product cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col items-center h-full">
      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Suspense fallback={<div className="w-full h-60 bg-gray-200 animate-pulse rounded-lg"></div>}>
          {visibleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <LazyCard product={product as any} />
            </motion.div>
          ))}
        </Suspense>
      </div>

      {/* Load More button */}
      {visibleProductsCount < products.length && (
        <motion.button
          onClick={handleLoadMore}
          className="px-4 py-2 border bg-black text-sm font-semibold text-white rounded hover:bg-gray-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More
        </motion.button>
      )}
    </div>
  );
};

export default Products;
