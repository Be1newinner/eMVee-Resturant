import { configureStore } from "@reduxjs/toolkit";
import { AllProductsSlice } from "./Slices/AllProductsSlice";
import { AllCategoriesSlice } from "./Slices/AllCategoriesSlice";
import { CartSlice } from "./Slices/CartSlice";

export const store = configureStore({
  reducer: {
    AllProducts: AllProductsSlice.reducer,
    AllCategories: AllCategoriesSlice.reducer,
    Cart: CartSlice.reducer,
  },
});
