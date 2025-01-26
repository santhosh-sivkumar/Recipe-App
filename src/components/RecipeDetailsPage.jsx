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
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:bg-blue-100 rounded-md px-4 py-2 cursor-pointer mb-4"
      >
        &larr; Back
      </button>

      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        {recipe.label}
      </h2>

      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={recipe.image}
            alt={recipe.label}
            className="w-full h-56 object-cover rounded-lg shadow-lg border-4 border-gray-200"
          />
        </div>
        <div className="md:w-1/2 sm:pt-4 md:pt-0 md:ml-8 flex flex-col justify-start">
          <div className="flex bg-gray-100 p-4 rounded-lg justify-between text-sm text-gray-700 mb-4">
            <div>
              <strong>Preparation Time:</strong> {recipe.totalTime} minutes
            </div>
            <div>
              <strong>Yield:</strong> {recipe.yield} servings
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
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
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Tags Section */}
        <div className="bg-blue-100 p-4 rounded-lg mb-6">
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
        </div>

        {/* Health Labels Section */}
        <div className="bg-green-100 p-4 rounded-lg">
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
        </div>

        {/* Ingredients Section */}
        <div className="bg-cyan-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaUtensils className="text-blue-600" /> Ingredients:
          </p>
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
            {recipe.ingredients.map((ingredient, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
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
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Details */}
        <div className="bg-yellow-100 p-4 rounded-lg mb-6">
          <p className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FaUtensils className="text-yellow-600" /> Nutrition Details:
          </p>

          <div className="flex flex-wrap gap-8">
            {/* Table 1 */}
            <div className="flex-1">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead className="bg-yellow-200">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                      Nutrient
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(recipe.totalNutrients)
                    .slice(
                      0,
                      Math.ceil(Object.keys(recipe.totalNutrients).length / 2)
                    ) // First half
                    .map((key) => (
                      <tr key={key} className="border-b border-gray-200">
                        <td className="py-2 px-4 text-sm text-gray-700">
                          {recipe.totalNutrients[key].label}
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-700">
                          {recipe.totalNutrients[key].quantity.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-700">
                          {recipe.totalNutrients[key].unit}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Table 2 */}
            <div className="flex-1">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead className="bg-yellow-200">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                      Nutrient
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(recipe.totalNutrients)
                    .slice(
                      Math.ceil(Object.keys(recipe.totalNutrients).length / 2)
                    ) // Second half
                    .map((key) => (
                      <tr key={key} className="border-b border-gray-200">
                        <td className="py-2 px-4 text-sm text-gray-700">
                          {recipe.totalNutrients[key].label}
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-700">
                          {recipe.totalNutrients[key].quantity.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-700">
                          {recipe.totalNutrients[key].unit}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Diet Labels Section */}
        <div className="bg-purple-100 p-4 rounded-lg mb-6">
          <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaAppleAlt className="text-purple-600" /> Diet Labels:
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            {recipe.dietLabels.length > 0 ? (
              recipe.dietLabels.map((label, idx) => (
                <span
                  key={idx}
                  className="bg-white text-purple-800 text-sm font-medium px-4 py-2 rounded-full shadow-md"
                >
                  {label}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No diet labels available.</span>
            )}
          </div>
        </div>

        {/* Cautions Section */}
        <div className="bg-red-100 p-4 rounded-lg mb-6">
          <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaExclamationTriangle className="text-red-600" /> Cautions:
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            {recipe.cautions.length > 0 ? (
              recipe.cautions.map((caution, idx) => (
                <span
                  key={idx}
                  className="bg-white text-red-800 text-sm font-medium px-4 py-2 rounded-full shadow-md"
                >
                  {caution}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No cautions specified.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
