// components/Filters.js
import React from "react";
import { FaFilter } from "react-icons/fa";

const Filters = ({ filters, handleFilterChange }) => (
  <div className="relative w-full sm:w-1/4">
    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md flex items-center justify-between focus:outline-none">
      <FaFilter /> Filters
    </button>
    <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-full z-10">
      <div className="p-4">
        <div>
          <label className="block mb-2 text-gray-700">Category</label>
          <select
            value={filters.category}
            onChange={(e) =>
              handleFilterChange(e.target.value, filters.dietary)
            }
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="all">All</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-gray-700">Dietary</label>
          <select
            value={filters.dietary}
            onChange={(e) =>
              handleFilterChange(filters.category, e.target.value)
            }
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="all">All</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default Filters;
