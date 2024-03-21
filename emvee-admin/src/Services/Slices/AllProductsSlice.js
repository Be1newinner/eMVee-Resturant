import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const AllProductsSlice = createSlice({
  name: "AllProducts",
  initialState,
  reducers: {
    addProducts(state, action) {
      state.push(...action.payload);
    },
  },
});

export const { addProducts } = AllProductsSlice.actions;
