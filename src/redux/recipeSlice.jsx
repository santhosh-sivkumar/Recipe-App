import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    favorites: [],
    searchQuery: "",
    filters: {
      category: "all",
      dietary: "all",
    },
    currentPage: 1,
  },
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const {
  setRecipes,
  setSearchQuery,
  setCurrentPage,
  addFavorite,
  removeFavorite,
  setFilters,
} = recipeSlice.actions;

export default recipeSlice.reducer;
