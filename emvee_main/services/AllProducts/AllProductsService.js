import { collection, getDocs } from "firebase/firestore";
import { query } from "firebase/database";
import { firestoreDB } from "../../infrastructure/firebase.config";

export const fetchAllProducts = async () => {
  const products = [];
  const data = await getDocs(query(collection(firestoreDB, "pr47")));

  data.forEach((item) => {
    products.push({
      ...item.data(),
      k: item.id,
    });
  });

  return products;
};

export const fetchPopularProducts = async () => [
  ...AllProductsData.filter((e) => e.s === true),
];
export const fetchPopularCategories = async () => [
  ...TotalCategoryList.filter((e) => e.p === true),
];
export const fetchAllCategories = async () => {
  const categories = [];
  const data = await getDocs(query(collection(firestoreDB, "ca8")));

  data.forEach((item) => {
    categories.push({
      ...item.data(),
      k: item.id,
    });
  });

  return categories;
};
