import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState = {
  addresses: [],
  default: 0,
  isFetched: false,
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
        draft.default = action.payload?.k;
      });
    },
    addAddressArray(state, action) {
      return produce(state, (draft) => {
        if (!state.isFetched) {
          action.payload?.slice(0, 4)?.map((item, index) => {
            draft.addresses.push({
              ...item,
            });
          });

          draft.default = action.payload[0]?.k;
          if (action.payload?.length > 0) {
            draft.isFetched = true;
          }
        }
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
    resetAddress(state) {
      state.addresses = [];
      state.default = 0;
      state.isFetched = false
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
  resetAddress,
} = AddressSlice.actions;
