import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  setRecipes,
  setSearchQuery,
  setFilters,
} from "../redux/recipeSlice.jsx";
import { FaRegHeart } from "react-icons/fa";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import RecipeList from "./RecipeList";
import axios from "axios";
import Loading from "./Loading";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recipes, searchQuery, filters } = useSelector(
    (state) => state.recipes
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipes = async (query) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://www.edamam.com/api/recipes/v2?q=${query}&field=uri&field=label&field=image&field=cautions&field=dietLabels&field=calories&field=yield&field=source&field=ingredientLines&field=ingredients&field=totalNutrients&field=totalWeight&field=healthLabels&field=dishType&field=shareAs&field=totalTime&field=url&field=cuisineType&field=mealType&from=0&to=100&_cont=CHcVQBtNNQphDmgVQntAEX4BYkt0BAMDRG1IC2URYld1AQcVX3cVVjQRNlxyAlZSRWdBUjAaN1YlAwBTQGFCA2UVYl13VhFqX3cWQT1OcV9xBE4%3D&calories=1-10000&type=public&_=1737965331693`
      );
      const fetchedRecipes = res.data.hits.map((recipe) => ({
        ...recipe,
        isFavorite: false,
      }));

      localStorage.setItem("recipes", JSON.stringify(fetchedRecipes));
      dispatch(setRecipes(fetchedRecipes));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeRecipes = () => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      dispatch(setRecipes(JSON.parse(storedRecipes)));
    } else {
      fetchRecipes(searchQuery || "salad");
    }
  };

  useEffect(() => {
    initializeRecipes();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchRecipes(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleAddFavorite = (recipe) => {
    const updatedRecipes = recipes.map((r) =>
      r.recipe.uri === recipe.uri ? { ...r, isFavorite: true } : r
    );
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    dispatch(setRecipes(updatedRecipes));
  };

  const handleRemoveFavorite = (recipe) => {
    const updatedRecipes = recipes.map((r) =>
      r.recipe.uri === recipe.uri ? { ...r, isFavorite: false } : r
    );
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    dispatch(setRecipes(updatedRecipes));
  };

  const handleFilterChange = (category, dietary) => {
    dispatch(setFilters({ category, dietary }));
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const { category, dietary } = filters;
    let isMatch = true;

    if (
      category !== "all" &&
      !recipe.recipe.mealType.some((type) =>
        type.toLowerCase().includes(category.toLowerCase())
      )
    ) {
      isMatch = false;
    }

    if (
      dietary !== "all" &&
      !recipe.recipe.healthLabels.some((label) =>
        label.toLowerCase().includes(dietary.toLowerCase())
      )
    ) {
      isMatch = false;
    }

    return isMatch;
  });

  const favorites = recipes.filter((recipe) => recipe.isFavorite);

  // Carousel state and logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselItems = recipes.slice(0, 5); // Show first 5 recipes in the carousel

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4 bg-gray-50">
      <motion.h1
        className="text-4xl text-center font-semibold text-gray-800 mb-10 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Discover Delicious Recipes
      </motion.h1>

      {/* Carousel Section */}
      <motion.div
        className="mb-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-hidden relative rounded-lg shadow-lg">
          <motion.div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {carouselItems.map((recipe, index) => (
              <motion.div
                key={index}
                className="w-full flex-shrink-0 p-6 bg-white rounded-lg shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img
                  src={recipe.recipe.image}
                  alt={recipe.recipe.label}
                  className="w-full h-64 object-cover rounded-md"
                />
                <h2 className="text-xl font-semibold mt-4 text-gray-700">
                  {recipe.recipe.label}
                </h2>
              </motion.div>
            ))}
          </motion.div>

          {/* Carousel Controls */}
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
              )
            }
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition-all duration-300"
          >
            &#10094;
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
              )
            }
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition-all duration-300"
          >
            &#10095;
          </button>
        </div>
      </motion.div>

      {/* Search Bar, Filters, and Favorites Icon */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-6">
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <Filters filters={filters} handleFilterChange={handleFilterChange} />
        <motion.button
          onClick={() => navigate("/favorites")}
          className="relative cursor-pointer lg:w-2/12 sm:w-[75%] md:w-[25%] px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 flex items-center justify-center transition-all duration-300"
          whileHover={{ scale: 1.03 }}
        >
          <FaRegHeart size={20} className="mr-2" />
          Favorites
          <span className="absolute -top-2 -right-2 bg-white text-red-500 border border-red-500 rounded-full px-2 py-1 text-xs font-bold">
            {favorites.length}
          </span>
        </motion.button>
      </div>

      {/* Content Section */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-[500px] relative bg-gray-200 rounded-lg shadow-md">
          <Loading />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <RecipeList
            recipes={filteredRecipes}
            favorites={favorites}
            handleAddFavorite={handleAddFavorite}
            handleRemoveFavorite={handleRemoveFavorite}
          />
        </motion.div>
      )}
    </div>
  );
}

export default HomePage;
