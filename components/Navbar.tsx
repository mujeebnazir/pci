import { categories } from "@/constants";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex space-x-6">
      <ul className="flex flex-col md:flex-row space-x-8">
        {categories.map((item, index) => (
          <li key={index} className="relative list-none overflow-hidden">
            <Link
              href={item.link}
              className="relative inline-block px-3 py-1 text-md font-sans  text-gray-700 hover:text-gray-900 pb-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
