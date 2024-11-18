import React, { useState } from "react";
import { FcClearFilters } from "react-icons/fc";

type FiltersSidebarProps = {
  filters?: {
    price: number;
    color: string;
    size: string;
  };
  applyFilter?: () => void;
};

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  applyFilter,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFeatured, setSelectedFeatured] = useState("");

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFeaturedChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedFeatured(event.target.value);
  };
  return (
    <div className="relative w-full px-10 flex items-center justify-between ">
      {/* Filter Button */}
      <button
        onClick={handleSidebarToggle}
        className="bg-gray-100 h-10 w-25 space-x-2 border border-black flex flex-row items-center justify-center px-4 py-2 text-sm font-normal"
      >
        <span className="mr-3 cursor-pointer scale-100 hover:scale-110">
          <FcClearFilters size={20} />
        </span>
        Filters
      </button>

      {/* Featured Dropdown */}
      <div className="bg-gray-100 h-10 w-32 border border-black flex items-center justify-center px-4 py-2 cursor-pointer hover:shadow-sm">
        <select
          className=" bg-gray-100 text-sm px-2 font-normal w-full cursor-pointer scale-100 hover:scale-110"
          value={selectedFeatured}
          onChange={handleFeaturedChange}
        >
          <option value="">Featured</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popularity">Most Popular</option>
        </select>
      </div>

      {/* Sliding Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-1/4 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 border-b">
          <p className="text-2xl font-semibold uppercase ">Filter</p>
        </div>
        <div className="p-4">
          <h3 className="text-md font-medium mb-2">Categories</h3>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Category 1
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Category 2
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Category 3
            </label>
          </div>

          <h3 className="text-md font-medium mt-4 mb-2">Subcategories</h3>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Subcategory 1
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Subcategory 2
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Subcategory 3
            </label>
          </div>
        </div>
        <button
          onClick={handleSidebarToggle}
          className="absolute top-4 right-4 text-black text-xl font-bold hover:text-gray-700 scale-105 hover:scale-110 transnsion duration-300 ease-in-out"
        >
          &times;
        </button>
      </div>

      {/* Overlay to close sidebar */}
      {isSidebarOpen && (
        <div
          onClick={handleSidebarToggle}
          className="fixed inset-0 bg-black opacity-25 z-40"
        ></div>
      )}
    </div>
  );
};

export default FiltersSidebar;
