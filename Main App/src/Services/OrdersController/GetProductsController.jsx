// import { useDispatch } from "react-redux";

import {
  fetchAllCategories,
  fetchAllProducts,
} from "../AllProducts/AllProductsService";
// import { addProducts } from "../Slices/AllProductsSlice";
// import { addCategories } from "../Slices/AllCategoriesSlice";

export default async function GetProductsController() {
  // const dispatch = useDispatch();
  try {
    const products = await fetchAllProducts();
    const category = await fetchAllCategories();
    return { products, category };
  } catch (error) {
    console.log(error);
  }
}
