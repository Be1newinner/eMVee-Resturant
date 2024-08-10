import {
  ADD_SINGLE_PRODUCT,
  EDIT_SINGLE_PRODUCT,
  LOAD_PRODUCTS,
  REMOVE_SINGLE_PRODUCT,
  RESET_PRODUCTS,
} from "../constants/allProducts";

export const loadProducts = (products) => ({
  type: LOAD_PRODUCTS,
  payload: products,
});
export const resetProducts = () => ({
  type: RESET_PRODUCTS,
});

export const addSingleProduct = (productItem) => ({
  type: ADD_SINGLE_PRODUCT,
  payload: productItem,
});
export const editSingleProduct = (productItem) => ({
  type: EDIT_SINGLE_PRODUCT,
  payload: productItem,
});
export const deleteSingleProduct = (productItem) => ({
  type: REMOVE_SINGLE_PRODUCT,
  payload: productItem,
});
