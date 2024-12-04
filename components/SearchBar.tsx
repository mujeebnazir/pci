"use client";

import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useSearchProducts from "@/hooks/useSearchProducts";
import Products from "./Products";
import Loading from "./Loading";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  const { products, loadingProducts, error } = useSearchProducts({
    query: searchQuery,
    currentPage,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when a new search is made
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
      <form className="relative max-w-md mx-auto" onSubmit={handleSearchSubmit}>
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 ps-5 text-sm rounded-lg text-gray-900 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all duration-200"
          placeholder="Search Shawls, Handbags, Wallets..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsModalOpen(true)} // Open modal on focus
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-1.5 bg-black hover:bg-gray-500 hover:shadow-md transition transform scale-100 hover:scale-110 font-medium text-sm w-7 h-7 rounded shadow flex items-center justify-center"
        >
          <IoSearchOutline size={16} />
        </button>
      </form>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-16 w-screen animate-fadeIn overflow-y-auto hide-scrollbar">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[90%] p-6 relative overflow-y-auto  transform animate-slideDown">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              onClick={closeModal}
            >
              ✕
            </button>

            <div className="mb-4">
              <p className="mt-4 text-center font-semibold text-lg">
                Total Search Results:{" "}
                <span className="bg-black text-white py-1 px-3 rounded-full text-sm ml-2">
                  {products.length}
                </span>
              </p>
            </div>

            {/* Loading Spinner */}
            {loadingProducts && <Loading />}

            {/* Error Message */}
            {error && (
              <div className="mt-4 text-center bg-red-100 text-red-700 py-2 px-4 rounded shadow">
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
                <p className="mt-4 text-center">No products found.</p>
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
