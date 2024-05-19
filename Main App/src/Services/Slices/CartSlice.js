import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

const delivery = 0;
const discount = 0;

const initialState = {
  items: {},
  total: 0,
  subtotal: 0,
  tax: 0,
  delivery: 0,
  qty: 0,
  discount: 0,
};

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addInCart(state, action) {
      const data = action.payload;
      const newState = produce(state, (draftState) => {
        draftState.items[data.k] = data;
        draftState.qty = Object.values(draftState.items)?.filter(
          (item) => item.qty > 0
        ).length;
      });

      return produce(newState, (draftState) => {
        const subtotal = Object.values(newState.items).reduce(
          (total, value) => {
            return total + value.qty * value.p;
          },
          0
        );
        const deliveryCharges = subtotal > 300 || subtotal < 1 ? 0 : 50;
        draftState.delivery = deliveryCharges;
        draftState.discount = Math.floor(discount);
        // draftState.tax = Math.floor(delivery * 18) / 100;
        draftState.subtotal = Math.floor(subtotal);
        draftState.total = Math.floor(subtotal + deliveryCharges - discount);
      });
    },
    decreaseCart(state, action) {},
    removeFromCart(state, action) {},
    resetCart(state) {
      try {
        Object.assign(state, initialState);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { addInCart, decreaseCart, removeFromCart, resetCart } =
  CartSlice.actions;
