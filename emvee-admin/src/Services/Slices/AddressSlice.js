import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState = {
  addresses: [],
  default: 0,
};

export const AddressSlice = createSlice({
  name: "Address",
  initialState,
  reducers: {
    addNewAddress(state, action) {
      return produce(state, (draft) => {
        draft.addresses.push({
          ...action.payload,
          k: state.addresses.length + 1,
        });
        draft.default = state.addresses.length + 1;
      });
    },
    removeAddress(state, action) {
      // console.log("remove clicked!");
      return produce(state, (draft) => {
        draft.addresses = state.addresses.filter((e) => e.k != action.payload);
        if (action.payload === state.default) {
          if (state.addresses[0]?.k === state.default) {
            draft.default = state.addresses[1]?.k || 0;
          } else {
            draft.default = state.addresses[0]?.k || 0;
          }
        }
      });
    },
    changeDefaultAddress(state, action) {
      return produce(state, (draft) => {
        draft.default = action.payload;
      });
    },
  },
});

export const { addNewAddress, changeDefaultAddress, removeAddress } =
  AddressSlice.actions;
