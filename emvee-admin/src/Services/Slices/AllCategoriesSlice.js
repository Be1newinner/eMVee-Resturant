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
      // state.data.push(action.payload);
      state.data = state.data.filter((e) => e.k != action.payload.k);
      state.data.push(action.payload);
      console.log("editing in Category Selector => ", action.payload);
    },
    resetCategories(state) {
      state.data = [];
      length = 0;
      // console.log("RESET Categories");
    },
  },
});

export const {
  addCategories,
  resetCategories,
  addSingleCategory,
  editSingleCategory,
} = AllCategoriesSlice.actions;
