import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState = {};

export const OrdersSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {
    addOrder(state, action) {
      return produce(state, (draft) => {
        let payload = {};
        try {
          payload = JSON.parse(action.payload);
        } catch (error) {
          console.log("unknwon error!");
        }

        if (payload.key)
          draft[payload.key] = {
            ...state[payload.key],
            ...payload.value,
            orderID: payload.key,
          };
      });
    },
    resetOrders(state) {
      state = null;
      console.log("RESET Orders");
    },
  },
});

export const { addOrder, resetOrders } = OrdersSlice.actions;
1;
