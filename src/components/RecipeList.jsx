// components/RecipeList.js
import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({
  recipes,
  handleAddFavorite,
  handleRemoveFavorite,
  handleRecipeDetails,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {recipes.map((recipeData) => {
      return (
        <RecipeCard
          key={recipeData.recipe.uri}
          recipe={recipeData.recipe}
          isFavorite={recipeData.isFavorite}
          handleAddFavorite={handleAddFavorite}
          handleRemoveFavorite={handleRemoveFavorite}
          handleRecipeDetails={handleRecipeDetails}
        />
      );
    })}
  </div>
);

export default RecipeList;
