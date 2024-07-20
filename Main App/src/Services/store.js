import { configureStore } from "@reduxjs/toolkit";
import { AllProductsSlice } from "./Slices/AllProductsSlice";
import { AllCategoriesSlice } from "./Slices/AllCategoriesSlice";
import { CartSlice } from "./Slices/CartSlice";
import { OrdersSlice } from "./Slices/OrdersSlice";
import { AddressSlice } from "./Slices/AddressSlice";
import { AuthSlice } from "./Slices/AuthSlice";

export const store = configureStore({
  reducer: {
    AllProducts: AllProductsSlice.reducer,
    AllCategories: AllCategoriesSlice.reducer,
    Cart: CartSlice.reducer,
    Orders: OrdersSlice.reducer,
    Address: AddressSlice.reducer,
    Authentication: AuthSlice.reducer,
  },
});
