import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isFecthed: false,
};

export const AllProductsSlice = createSlice({
  name: "AllProducts",
  initialState,
  reducers: {
    addProducts(state, action) {
      if (!state.isFecthed) {
        state.data.push(...action.payload);
        state.isFecthed = true;
      }
    },
  },
});

export const { addProducts } = AllProductsSlice.actions;
