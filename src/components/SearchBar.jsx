// components/SearchBar.js
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, handleSearch }) => (
  <div className="flex items-center sm:w-[75%] lg:w-8/12 gap-0.5">
    <div className="px-4 py-[0.79rem] bg-blue-500 rounded-sm">
      <FaSearch className="text-white" />
    </div>
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearch}
      placeholder="Search for recipes"
      className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:border-0 focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default SearchBar;
