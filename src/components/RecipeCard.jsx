import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { motion } from "framer-motion"; // Import motion from framer-motion

const RecipeCard = ({
  recipe,
  isFavorite,
  handleAddFavorite,
  handleRemoveFavorite,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false); // Handle error by showing a placeholder if necessary
  };

  return (
    <motion.div
      key={recipe.label}
      className="max-w-sm w-full bg-white rounded-lg overflow-hidden shadow-lg flex flex-col"
      initial={{ opacity: 0, scale: 0.9 }} // Start with lower opacity and scale
      animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and normal scale
      exit={{ opacity: 0, scale: 0.9 }} // Exit with the same effect
      transition={{ duration: 0.3 }} // Smooth transition
    >
      <div className="relative">
        {isLoading && (
          <div className="bg-gray-200">
            <Loading />
          </div>
        )}
        <img
          src={recipe.image}
          alt={recipe.label}
          className="w-full h-48 object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">{recipe.label}</h2>
        <p className="text-gray-600 text-sm mt-2">{recipe.source}</p>

        <div className="flex-grow"></div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() =>
              isFavorite
                ? handleRemoveFavorite(recipe)
                : handleAddFavorite(recipe)
            }
            className="text-red-500 cursor-pointer hover:text-red-700 focus:outline-none flex items-center"
          >
            {isFavorite ? (
              <FaHeart size={22} className="mr-2" />
            ) : (
              <FaRegHeart size={22} className="mr-2" />
            )}
            <span className="text-sm">Favorite</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate(`/recipe/${recipe.uri.split("_")[1]}`)}
            className="px-4 cursor-pointer py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-sm"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
