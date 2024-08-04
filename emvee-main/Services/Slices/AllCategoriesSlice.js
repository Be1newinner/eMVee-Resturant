import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isFecthed: false,
};

export const AllCategoriesSlice = createSlice({
  name: "AllCategories",
  initialState,
  reducers: {
    addCategories(state, action) {
      if (!state.isFecthed) {
        state.data.push(...action.payload);
        state.isFecthed = true;
      }
    },
  },
});

export const { addCategories } = AllCategoriesSlice.actions;
