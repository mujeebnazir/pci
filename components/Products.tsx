"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";

const LazyCard = React.lazy(() => import("@/components/Card"));

type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  discountedPrice: number;
  rating: number;
  isOnSale: boolean;
  size?: string;
  color?: string;
  quantity?: number;
  category?: string;
  subcategory?: string;
};

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  const [visibleProductsCount, setVisibleProductsCount] = useState(8);

  // Handler to load more products
  const handleLoadMore = () => {
    setVisibleProductsCount((prevCount) => prevCount + 8); // Load 8 more products
  };

  const visibleProducts = products.slice(0, visibleProductsCount);

  // Animation variants for product cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col items-center">
      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Suspense fallback={<div>Loading...</div>}>
          {visibleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <LazyCard product={product} />
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
