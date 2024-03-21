import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const OrdersSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {
    addNewOrder(state, action) {
      state.push(...action.payload);
    },
  },
});

export const { addNewOrder } = OrdersSlice.actions;
