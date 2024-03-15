import { TotalCategoryList, AllProductsData } from "../OfflineDataToLive";

export const fetchAllProducts = async () => [...AllProductsData];
export const fetchPopularProducts = async () => [
  ...AllProductsData.filter((e) => e.p === true),
];
export const fetchPopularCategories = async () => [
  ...TotalCategoryList.filter((e) => e.p === true),
];
export const fetchAllCategories = async () => [...TotalCategoryList];
