import { combineReducers } from "redux";
import AllProducts from "./reducers/allProducts";
import AllCategories from "./reducers/allCategories";
import { OrdersSlice } from "./Slices/OrdersSlice";

const rootReducer = combineReducers({
  AllProducts,
  AllCategories,
  Orders: OrdersSlice.reducer,
});

export default rootReducer;
