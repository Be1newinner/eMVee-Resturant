import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

import {
  fetchAllProducts,
  fetchPopularProducts,
  fetchPopularCategories,
  fetchAllCategories,
} from "./AllProductsService";

export const AllProductContext = createContext();

export const AllProductContextProvider = ({ children }) => {
  const [AllProducts, setAllProducts] = useState([]);
  const [PopularProducts, setPopularProducts] = useState([]);
  const [PopularCategories, setPopularCategories] = useState([]);
  const [AllCategories, setAllCategories] = useState([]);

  useEffect(() => {
    (async function () {
      const data1 = await fetchAllProducts();
      const data2 = await fetchPopularProducts();
      const data3 = await fetchPopularCategories();
      const data4 = await fetchAllCategories();

      setAllProducts(data1);
      setAllCategories(data4);
      setPopularProducts(data2);
      setPopularCategories(data3);
    })();
  }, []);

  return (
    <AllProductContext.Provider
      value={{
        AllProducts,
        AllCategories,
        PopularProducts,
        PopularCategories,
      }}
    >
      {children}
    </AllProductContext.Provider>
  );
};
