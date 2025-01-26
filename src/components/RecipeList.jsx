import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import { setCurrentPage } from "../redux/recipeSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion"; // Import motion from framer-motion

const RecipeList = ({
  recipes,
  handleAddFavorite,
  handleRemoveFavorite,
  handleRecipeDetails,
}) => {
  const { currentPage } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const recipesPerPage = 10; // Number of recipes per page

  // Calculate the indices for the recipes to display
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Total number of pages
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  // Handle changing pages
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage((prev) => prev + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage((prev) => prev - 1));
    }
  };

  const handlePageClick = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <div>
      {/* Recipe Grid with motion */}
      <motion.div
        className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 50 }} // Initial state: fade and move up
        animate={{ opacity: 1, y: 0 }} // Animate to full opacity and no vertical movement
        exit={{ opacity: 0, y: -50 }} // Exit state: fade and move up
        transition={{ duration: 0.3 }} // Smooth transition
      >
        {currentRecipes.map((recipeData) => (
          <RecipeCard
            key={recipeData.recipe.uri}
            recipe={recipeData.recipe}
            isFavorite={recipeData.isFavorite}
            handleAddFavorite={handleAddFavorite}
            handleRemoveFavorite={handleRemoveFavorite}
            handleRecipeDetails={handleRecipeDetails}
          />
        ))}
      </motion.div>

      {/* Conditional Pagination Controls with motion */}
      {totalPages > 1 && (
        <motion.div
          className="flex justify-center items-center mt-8 space-x-4"
          initial={{ opacity: 0 }} // Initial state: invisible
          animate={{ opacity: 1 }} // Animate to full opacity
          transition={{ duration: 0.3 }} // Smooth transition
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-white ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageClick(page + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md text-white ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default RecipeList;
