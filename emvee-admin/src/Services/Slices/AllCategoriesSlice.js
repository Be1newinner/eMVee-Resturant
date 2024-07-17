import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  updateTime: 0,
};

export const AllCategoriesSlice = createSlice({
  name: "AllCategories",
  initialState,
  reducers: {
    addCategories(state, action) {
      state.data.push(...action.payload);
      state.updateTime = Date.now();
    },
    addSingleCategory(state, action) {
      state.data.push(action.payload);
      state.updateTime = Date.now();
    },
    editSingleCategory(state, action) {
      state.data = state.data.filter((e) => e.k != action.payload.k);
      state.data.push(action.payload);
      state.updateTime = Date.now();
    },
    resetCategories(state) {
      state.data = [];
      length = 0;
      state.updateTime = Date.now();
    },
  },
});

export const {
  addCategories,
  resetCategories,
  addSingleCategory,
  editSingleCategory,
} = AllCategoriesSlice.actions;
