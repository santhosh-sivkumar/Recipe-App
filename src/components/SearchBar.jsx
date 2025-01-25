// components/SearchBar.js
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, handleSearch }) => (
  <div className="flex items-center w-full sm:w-1/2">
    <FaSearch className="text-gray-600 mr-2" />
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearch}
      placeholder="Search for recipes"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default SearchBar;
