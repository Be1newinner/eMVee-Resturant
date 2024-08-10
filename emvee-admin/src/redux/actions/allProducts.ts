import {
  ADD_SINGLE_PRODUCT,
  EDIT_SINGLE_PRODUCT,
  LOAD_PRODUCTS,
  REMOVE_SINGLE_PRODUCT,
  RESET_PRODUCTS,
} from "../constants/allProducts";

export const loadPRODUCTS = (products) => ({
  type: LOAD_PRODUCTS,
  payload: products,
});
export const resetPRODUCTS = () => ({
  type: RESET_PRODUCTS,
});

export const addSinglePRODUCT = (productItem) => ({
  type: ADD_SINGLE_PRODUCT,
  payload: productItem,
});
export const editSinglePRODUCT = (productItem) => ({
  type: EDIT_SINGLE_PRODUCT,
  payload: productItem,
});
export const deleteSinglePRODUCT = (productItem) => ({
  type: REMOVE_SINGLE_PRODUCT,
  payload: productItem,
});
