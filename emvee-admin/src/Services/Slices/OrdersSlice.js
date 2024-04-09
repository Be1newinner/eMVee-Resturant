import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";
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
    cancelOrder(state, action) {
      return produce(state, (draft) => {
        const currentData = draft[action.payload];
        currentData.s.c = -1;
        currentData.s["-1"] = Date.now();

        draft[action.payload] = currentData;

        console.log("order data ", draft[action.payload]);
      });
    },
    deliverOrderReducer(state, action) {
      return produce(state, (draft) => {
        const currentData = draft[action.payload];
        currentData.s.c = 2;
        currentData.s["2"] = Date.now();
        draft[action.payload] = currentData;
        // console.log("order data ", draft[action.payload]);
      });
    },
    resetOrders(state) {
      state = null;
      console.log("RESET Orders");
    },
  },
});

export const { addOrder, resetOrders, cancelOrder, deliverOrderReducer } =
  OrdersSlice.actions;
