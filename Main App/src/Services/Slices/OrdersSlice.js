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
        console.log("ADDING DATA AGAIN!");
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
        currentData.s["-1"] = JSON.stringify(new Timestamp.now());
        draft[action.payload] = currentData;
        // console.log("order data ", draft[action.payload]);
      });
    },
    resetOrders() {
      try {
        return {};
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { addOrder, resetOrders, cancelOrder } = OrdersSlice.actions;
