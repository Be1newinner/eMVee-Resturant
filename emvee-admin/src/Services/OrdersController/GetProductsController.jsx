import { fetchAllCategories, fetchAllProducts } from "./AllProductsService";

export default async function GetProductsController() {
  try {
    const products = await fetchAllProducts();
    const category = await fetchAllCategories();
    return { products, category };
  } catch (error) {
    console.log(error);
  }
}
