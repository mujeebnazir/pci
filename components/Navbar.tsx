import useCategories from "@/hooks/useCategories";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { categories } = useCategories();

  return (
    <nav className="flex justify-center w-full">
      <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
        {categories.map((item, index) => (
          <li key={index} className="relative list-none">
            <Link
              href={`/category/${item.name}`}
              className="relative inline-block px-4 py-2 text-base font-medium text-gray-700 hover:text-black transition-colors duration-200 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
