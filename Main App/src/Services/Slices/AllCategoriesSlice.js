import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const AllCategoriesSlice = createSlice({
  name: "AllCategories",
  initialState,
  reducers: {
    addCategories(state, action) {
      state.push(...action.payload);
    },
  },
});

export const { addCategories } = AllCategoriesSlice.actions;
