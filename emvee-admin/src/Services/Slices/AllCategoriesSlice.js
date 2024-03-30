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
    resetCategories(state) {
      state.data = [];
      length = 0;
      console.log("RESET Categories");
    },
  },
});

export const { addCategories, resetCategories } = AllCategoriesSlice.actions;
