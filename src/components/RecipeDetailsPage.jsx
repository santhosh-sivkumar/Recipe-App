import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaUtensils,
  FaLeaf,
  FaAppleAlt,
  FaFireAlt,
  FaTags,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion } from "framer-motion"; // Import framer-motion

const RecipeDetailsPage = () => {
  let { id } = useParams();
  console.log(id);
  id = "http://www.edamam.com/ontologies/edamam.owl#recipe_" + id;
  const navigate = useNavigate();
  let { recipes } = useSelector((state) => state.recipes);
  if (recipes.length == 0) {
    recipes = JSON.parse(localStorage.getItem("recipes"));
  }
  const recipe = recipes.find((r) => r.recipe.uri === id)?.recipe;

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  return (
    <motion.div
      className="max-w-screen-xl mx-auto py-8 px-4"
      initial={{ opacity: 0 }} // Initial state for fade-in effect
      animate={{ opacity: 1 }} // Target state when component is rendered
      transition={{ duration: 0.5 }} // Transition duration
    >
      <motion.button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:bg-blue-100 rounded-md px-4 py-2 cursor-pointer mb-4"
        whileHover={{ scale: 1.1 }} // Hover animation for button
        whileTap={{ scale: 0.95 }} // Button tap effect
      >
        &larr; Back
      </motion.button>

      <motion.h1
        className="text-4xl text-center font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {recipe.label}
      </motion.h1>

      <motion.div
        className="flex flex-col md:flex-row justify-between mb-6"
        initial={{ y: 50 }} // Initial position for slide-up effect
        animate={{ y: 0 }} // Target position for final render
        transition={{ type: "spring", stiffness: 300 }} // Spring animation for smooth slide-up
      >
        <div className="md:w-1/2 flex justify-center">
          <motion.img
            src={recipe.image}
            alt={recipe.label}
            className="w-full h-56 object-cover rounded-lg shadow-lg border-4 border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
        </div>
        <div className="md:w-1/2 sm:pt-4 md:pt-0 md:ml-8 flex flex-col justify-start">
          <motion.div
            className="flex bg-gray-100 p-4 rounded-lg justify-between text-sm text-gray-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div>
              <strong>Preparation Time:</strong> {recipe.totalTime} minutes
            </div>
            <div>
              <strong>Yield:</strong> {recipe.yield} servings
            </div>
          </motion.div>

          {/* Nutritional Information Section */}
          <motion.div
            className="bg-gray-100 p-4 rounded-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaFireAlt className="text-gray-600" /> Nutritional Information:
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 pt-4">
              <div>
                <strong>Calories:</strong>{" "}
                {recipe.totalNutrients?.ENERC_KCAL?.quantity} kcal
              </div>
              <div>
                <strong>Fat:</strong> {recipe.totalNutrients?.FAT?.quantity} g
              </div>
              <div>
                <strong>Carbs:</strong>{" "}
                {recipe.totalNutrients?.CHOCDF?.quantity} g
              </div>
              <div>
                <strong>Protein:</strong>{" "}
                {recipe.totalNutrients?.PROCNT?.quantity} g
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tags, Health Labels, and Ingredients Sections with animations */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        {/* Tags Section */}
        <motion.div
          className="bg-blue-100 p-4 rounded-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FaTags className="text-blue-600" /> Tags:
          </p>
          <div className="flex flex-wrap gap-2">
            {recipe.cuisineType.map((type, idx) => (
              <span
                key={idx}
                className="bg-white text-blue-800 text-sm font-medium flex items-center justify-center h-10 px-4 rounded-full shadow-md"
              >
                Cuisine: {type}
              </span>
            ))}
            {recipe.mealType.map((type, idx) => (
              <span
                key={idx}
                className="bg-white text-purple-800 text-sm font-medium flex items-center justify-center h-10 px-4 rounded-full shadow-md"
              >
                Meal: {type}
              </span>
            ))}
            {recipe.dishType.map((type, idx) => (
              <span
                key={idx}
                className="bg-white text-green-800 text-sm font-medium flex items-center justify-center h-10 px-4 rounded-full shadow-md"
              >
                Dish: {type}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Health Labels Section */}
        <motion.div
          className="bg-green-100 p-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FaLeaf className="text-green-600" /> Health Labels:
          </p>
          <div className="flex flex-row flex-wrap gap-4">
            {recipe.healthLabels.map((label, idx) => (
              <div
                key={idx}
                className="bg-white text-green-800 text-sm font-medium flex items-center justify-center h-10 px-4 rounded-full shadow-md"
              >
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ingredients Section */}
        <motion.div
          className="bg-cyan-100 p-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaUtensils className="text-blue-600" /> Ingredients:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
            {recipe.ingredients.map((ingredient, idx) => (
              <motion.div
                key={idx}
                className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + idx * 0.1, duration: 0.3 }}
              >
                {ingredient.image && (
                  <img
                    src={ingredient.image}
                    alt={ingredient.food}
                    className="w-full h-24 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-gray-800 font-medium text-sm mb-2">
                  {ingredient.text}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Food:</strong> {ingredient.food}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Quantity:</strong> {ingredient.quantity}{" "}
                  {ingredient.measure || "unit"}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Category:</strong> {ingredient.foodCategory}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RecipeDetailsPage;
