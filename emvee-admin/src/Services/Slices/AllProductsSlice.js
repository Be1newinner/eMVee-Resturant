import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const AllProductsSlice = createSlice({
  name: "AllProducts",
  initialState,
  reducers: {
    addProducts(state, action) {
      state.data.push(...action.payload);
    },
    addSingleProduct(state, action) {
      state.data.push(action.payload);
    },
    resetProducts(state) {
      state.data = [];
      console.log("RESET Products");
    },
  },
});

export const { addProducts, resetProducts, addSingleProduct } =
  AllProductsSlice.actions;
