"use client";

import React, { Suspense, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useSearchProducts from "@/hooks/useSearchProducts";
import Loading from "./Loading";
import { motion } from "framer-motion";
const LazyCard = React.lazy(() => import("@/components/Card"));

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { products, loadingProducts, error, hasMore, loadMore } =
    useSearchProducts({ query: searchQuery });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchQuery(""); // Clear search query on modal close
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleLoadMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    loadMore();
  };

  return (
    <>
      {/* Search Form */}
      <form
        className="relative w-full md:w-[400px] mx-auto"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 ps-5 text-sm rounded-full text-gray-900 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
          placeholder="Search Shawls, Handbags, Wallets..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsModalOpen(true)}
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-1.5 bg-black hover:bg-gray-800 transition transform scale-100 hover:scale-105 font-medium text-sm w-7 h-7 rounded-full flex items-center justify-center"
        >
          <IoSearchOutline size={16} />
        </button>
      </form>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-16 w-full  animate-fadeIn overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-[90%] max-w-4xl p-6 relative overflow-y-auto transform animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
              onClick={closeModal}
            >
              ✕
            </button>

            <div className="mb-6">
              <p className="text-center font-semibold text-lg">
                Total Search Results{" "}
                <span className="bg-black text-white py-1 px-3 rounded-full text-sm ml-2">
                  {products.length}
                </span>
              </p>
            </div>

            {/* Loading Spinner */}
            {loadingProducts && <Loading />}

            {/* Error Message */}
            {error && (
              <div className="mt-4 text-center bg-red-50 text-red-600 py-3 px-4 rounded-lg shadow-sm">
                Error: {error.message}
              </div>
            )}

            {/* Search Results */}
            {!loadingProducts && !error && products.length > 0 && (
              <div className="flex flex-col items-center h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <Suspense fallback={<Loading />}>
                    {products.map((product, index) => (
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

                {hasMore && (
                  <motion.button
                    onClick={handleLoadMore}
                    className="px-4 py-2 border bg-black text-sm font-semibold text-white rounded hover:scale-105 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Load More
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
