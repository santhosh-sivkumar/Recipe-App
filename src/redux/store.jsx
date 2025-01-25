import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipeSlice";

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableStateInvariant: false,
    }),
});

export default store;
