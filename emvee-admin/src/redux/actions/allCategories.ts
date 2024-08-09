import {
  ADD_SINGLE_CATEGORY,
  EDIT_SINGLE_CATEGORY,
  LOAD_CATEGORIES,
  REMOVE_SINGLE_CATEGORY,
  RESET_CATEGORIES,
} from "../constants/allCategories";

export const loadCategories = (categories) => ({
  type: LOAD_CATEGORIES,
  payload: categories,
});
export const resetCategories = () => ({
  type: RESET_CATEGORIES,
});

export const addSingleCategory = (categoryItem) => ({
  type: ADD_SINGLE_CATEGORY,
  payload: categoryItem,
});
export const editSingleCategory = (categoryItem) => ({
  type: EDIT_SINGLE_CATEGORY,
  payload: categoryItem,
});
export const deleteSingleCategory = (categoryItem) => ({
  type: REMOVE_SINGLE_CATEGORY,
  payload: categoryItem,
});
