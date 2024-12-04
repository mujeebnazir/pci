"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Loading from "./Loading";

const LazyCard = React.lazy(() => import("@/components/Card"));

type Product = {
  $id: string; // Add this property
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  sizesAvailable: string[]; // Ensure this matches
  images: string[]; // Add this property
};

interface ProductsProps {
  products: Product[];
  onClick?: () => void; // Optional click handler for products
}

const Products: React.FC<ProductsProps> = ({ products, onClick }) => {
  const [visibleProductsCount, setVisibleProductsCount] = useState(8);
  const visibleProducts = products.slice(0, visibleProductsCount);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col items-center h-full" onClick={onClick}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Suspense fallback={<Loading />}>
          {visibleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <LazyCard product={product}  />
            </motion.div>
          ))}
        </Suspense>
      </div>

      {visibleProductsCount < products.length && (
        <motion.button
          onClick={() => setVisibleProductsCount(prev => prev + 8)}
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
