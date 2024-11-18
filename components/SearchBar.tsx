"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  return (
    <form className="max-w-md mx-auto ">
      {/* <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label> */}
      <div className="relative ">
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 ps-5 text-sm rounded text-gray-900 border border-gray-300  bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search Shawls, Handbags, Wallets..."
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-1.5 bg-black hover:bg-gray-500 hover:shadow-md transition scale-100 hover:scale-110 font-medium  text-sm w-7 h-7 rounded shadow flex items-center justify-center"
        >
          <div className="flex items-center pointer-events-none ">
            <svg
              className="w-4 h-4 text-white dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
