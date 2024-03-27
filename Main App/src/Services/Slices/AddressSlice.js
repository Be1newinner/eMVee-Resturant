import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState = {
  addresses: [
    // {
    //   h: "h449a. g13",
    //   l: "asthan lsndir",
    //   n: "Vijay",
    //   p: "8130506844",
    //   pi: "110062",
    //   t: 0,
    //   k: 0,
    // },
    // {
    //   h: "h4492. g13",
    //   l: "asthan lsndir",
    //   n: "Vijay",
    //   p: "8130506844",
    //   pi: "110062",
    //   t: 1,
    //   k: 1,
    // },
    // {
    //   h: "h4495. g13",
    //   l: "asthan lsndir",
    //   n: "Vijay",
    //   p: "8130506844",
    //   pi: "110062",
    //   t: 1,
    //   k: 2,
    // },
    // {
    //   h: "h4493. g13",
    //   l: "asthan lsndir",
    //   n: "Vijay",
    //   p: "8130506844",
    //   pi: "110062",
    //   t: 2,
    //   k: 3,
    // },
  ],
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
        });
        draft.default = state.addresses.length + 1;
      });
    },
    addAddressArray(state, action) {
      return produce(state, (draft) => {
        action.payload?.slice(0, 4)?.map((item, index) => {
          draft.addresses.push({
            ...item,
            k: index,
          });
        });

        draft.default = 0;
      });
    },
    removeAddress(state, action) {
      console.log("remove clicked!");
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

export const {
  addNewAddress,
  changeDefaultAddress,
  removeAddress,
  addAddressArray,
} = AddressSlice.actions;
