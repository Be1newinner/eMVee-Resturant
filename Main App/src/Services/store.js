import { configureStore } from "@reduxjs/toolkit";
import { AllProductsSlice } from "./Slices/AllProductsSlice";
import { AllCategoriesSlice } from "./Slices/AllCategoriesSlice";

export const store = configureStore({
  reducer: {
    AllProducts: AllProductsSlice.reducer,
    AllCategories: AllCategoriesSlice.reducer,
  },
});
