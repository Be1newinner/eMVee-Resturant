import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const AllCategoriesSlice = createSlice({
  name: "AllCategories",
  initialState,
  reducers: {
    addCategories(state, action) {
      state.data.push(...action.payload);
    },
    addSingleCategory(state, action) {
      state.data.push(action.payload);
    },
    editSingleCategory(state, action) {
      state.data = state.data.filter((e) => e.k != action.payload.k);
      state.data.push(action.payload);
    },
    resetCategories(state) {
      state.data = [];
      length = 0;
    },
  },
});

export const {
  addCategories,
  resetCategories,
  addSingleCategory,
  editSingleCategory,
} = AllCategoriesSlice.actions;
