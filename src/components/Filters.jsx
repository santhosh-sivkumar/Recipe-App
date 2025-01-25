import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/recipeSlice.jsx";
const Filters = ({ filters, handleFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative lg:w-2/12 sm:w-[75%]  md:w-[25%]">
      {/* Filter Button */}
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-md flex items-center justify-between focus:outline-none"
      >
        <span className="flex items-center">
          <FaFilter className="mr-2" /> Filters
        </span>
      </button>

      {/* Filter Dropdown */}
      <div
        className={`absolute top-12 right-0 bg-white border border-[#9fdaff] shadow-lg rounded-md w-full z-10 transform transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-4 pb-0">
          {/* Category Filter */}

          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => {
              handleFilterChange(e.target.value, "all");
              dispatch(setCurrentPage(1));
              toggleDropdown();
            }}
            className=" w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className="p-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Dietary
          </label>
          <select
            value={filters.dietary}
            onChange={(e) => {
              handleFilterChange("all", e.target.value);
              dispatch(setCurrentPage(1));
              toggleDropdown();
            }}
            className=" w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Gluten-free">Gluten-Free</option>
            <option value="Vegan">Vegan</option>
          </select>
        </div>{" "}
      </div>
    </div>
  );
};

export default Filters;
