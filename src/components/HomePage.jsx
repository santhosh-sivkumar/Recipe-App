import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
        `https://api.edamam.com/search?q=${query}&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=100`
      );

      // Add isFavorite property to each recipe
      const fetchedRecipes = res.data.hits.map((recipe) => ({
        ...recipe,
        isFavorite: false, // Add default isFavorite property
      }));

      // Store recipes in local storage
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
      fetchRecipes(searchQuery || "pizza");
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
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // Update local storage
    dispatch(setRecipes(updatedRecipes));
  };

  const handleRemoveFavorite = (recipe) => {
    const updatedRecipes = recipes.map((r) =>
      r.recipe.uri === recipe.uri ? { ...r, isFavorite: false } : r
    );
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // Update local storage
    dispatch(setRecipes(updatedRecipes));
  };

  const handleFilterChange = (category, dietary) => {
    dispatch(setFilters({ category, dietary }));
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const { category, dietary } = filters;
    let isMatch = true;

    // Check if category matches any item in mealType
    if (
      category !== "all" &&
      !recipe.recipe.mealType.some((type) =>
        type.toLowerCase().includes(category.toLowerCase())
      )
    ) {
      isMatch = false;
    }

    // Check if dietary matches any item in healthLabels
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
  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">
        Recipe Finder
      </h1>

      {/* Search Bar, Filters, and Favorites Icon */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-4">
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <Filters filters={filters} handleFilterChange={handleFilterChange} />
        <button
          onClick={() => navigate("/favorites")}
          className="relative sm:w-[75%]  md:w-[25%] lg:w-2/12 px-4 py-2 cursor-pointer bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
        >
          <FaRegHeart size={20} className="mr-2" />
          Favorites
          <span className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full px-2 py-1 text-xs font-bold">
            {favorites.length}
          </span>
        </button>
      </div>

      {/* Content Section */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-[500px] relative">
          <Loading />
        </div>
      ) : (
        <RecipeList
          recipes={filteredRecipes}
          favorites={favorites}
          handleAddFavorite={handleAddFavorite}
          handleRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </div>
  );
}

export default HomePage;
