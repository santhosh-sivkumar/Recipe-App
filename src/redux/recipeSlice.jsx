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
  },
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
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
  addFavorite,
  removeFavorite,
  setFilters,
} = recipeSlice.actions;

export default recipeSlice.reducer;
