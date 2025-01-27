import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { setRecipes } from "../redux/recipeSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const FavoritesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when this component is rendered
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipes);
  const favorites = recipes.filter((recipe) => recipe.isFavorite);

  const handleRemoveFavorite = (recipe) => {
    const updatedRecipes = recipes.map((r) =>
      r.recipe.uri === recipe.uri ? { ...r, isFavorite: false } : r
    );
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // Update local storage
    dispatch(setRecipes(updatedRecipes));
  };

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:bg-blue-100 rounded-md px-4 py-2 cursor-pointer mb-4"
      >
        &larr; Back
      </button>

      {/* Header */}
      <motion.h1
        className="text-4xl text-center font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Favorites
      </motion.h1>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <AnimatePresence>
          {favorites.length > 0 ? (
            favorites.map((recipeData) => (
              <motion.div
                key={recipeData.recipe.uri}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <RecipeCard
                  recipe={recipeData.recipe}
                  isFavorite={recipeData.isFavorite}
                  handleRemoveFavorite={handleRemoveFavorite}
                />
              </motion.div>
            ))
          ) : (
            <motion.p
              key="no-favorites"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center col-span-full text-gray-500"
            >
              No favorites to show.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FavoritesPage;
