import { combineReducers } from "redux";
import { AllProductsSlice } from "./Slices/AllProductsSlice";
import AllCategories from "./reducers/allCategories";
import { OrdersSlice } from "./Slices/OrdersSlice";

const rootReducer = combineReducers({
  AllProducts: AllProductsSlice.reducer,
  AllCategories: AllCategories,
  Orders: OrdersSlice.reducer,
});

export default rootReducer;
