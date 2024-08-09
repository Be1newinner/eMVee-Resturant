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
    editSingleProduct(state, action) {
      state.data = state.data.filter((e) => e.k != action.payload.k);
      state.data.push(action.payload);
    },
    deleteProduct(state, action) {
      state.data = state.data.filter((e) => e.k != action.payload.k);
    },
    resetProducts(state) {
      state.data = [];
    },
  },
});

export const {
  addProducts,
  resetProducts,
  addSingleProduct,
  editSingleProduct,
  deleteProduct,
} = AllProductsSlice.actions;
