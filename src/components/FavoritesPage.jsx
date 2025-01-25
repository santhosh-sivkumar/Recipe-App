import React from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { setRecipes } from "../redux/recipeSlice";
import { useDispatch, useSelector } from "react-redux";

const FavoritesPage = () => {
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
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:bg-blue-100 rounded-md px-4 py-2 cursor-pointer mb-4"
      >
        &larr; Back
      </button>
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Your Favorites
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {favorites.length > 0 ? (
          favorites.map((recipeData) => (
            <RecipeCard
              key={recipeData.recipe.uri}
              recipe={recipeData.recipe}
              isFavorite={recipeData.isFavorite}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No favorites to show.
          </p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
