"use client";

import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useSearchProducts from "@/hooks/useSearchProducts";
import Products from "./Products";
import Loading from "./Loading";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { products, loadingProducts, error } = useSearchProducts({
    query: searchQuery,
    currentPage,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchQuery(""); // Clear search query on modal close
  };

  const handleProductClick = () => {
    setIsModalOpen(false); // Close modal when product is clicked
    setSearchQuery(""); // Clear the search query
  };

  return (
    <>
      {/* Search Form */}
      <form className="relative w-[300px] md:w-[400px] mx-auto" onSubmit={handleSearchSubmit}>
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
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-16 w-screen animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-4xl p-6 relative overflow-y-auto transform animate-slideDown">
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
              <Products products={products} onClick={handleProductClick} />
            )}

            {/* No Results */}
            {!loadingProducts &&
              !error &&
              searchQuery.trim() &&
              products.length === 0 && (
                <p className="mt-4 text-center text-gray-600">No products found.</p>
              )}

            {/* Default State */}
            {!loadingProducts && !error && !searchQuery.trim() && (
              <p className="mt-4 text-center text-gray-500">
                Start typing to search for products.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
