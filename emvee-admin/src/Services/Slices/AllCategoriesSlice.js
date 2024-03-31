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
    resetCategories(state) {
      state.data = [];
      length = 0;
      console.log("RESET Categories");
    },
  },
});

export const { addCategories, resetCategories, addSingleCategory } =
  AllCategoriesSlice.actions;
