import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const OrdersSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {
    addAllOrders(state, action) {
      state.push(...action.payload);
    },
  },
});

export const { addAllOrders } = OrdersSlice.actions;
