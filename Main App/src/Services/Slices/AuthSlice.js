import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
  user: null,
};

export const AuthSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    login(state, action) {
      let auth = null;
      let user = null;
      try {
        let parsedPayload = {};
        console.log("LOGIN SLICE DATA => ", action.payload);
        if (typeof action.payload == "string") {
          const payloadL1 = JSON.parse(action.payload);

          if (typeof payloadL1 == "string") {
            parsedPayload = JSON.parse(payloadL1);
            // console.log("A");
          } else {
            parsedPayload = payloadL1;
            // console.log("B");
          }
        } else {
          parsedPayload = action.payload;
          // console.log("C");
        }
        if (typeof parsedPayload?.auth == "string") {
          const parsedData = JSON.parse(parsedPayload?.auth);

          if (parsedData?.phone_no) state.auth = parsedData;
        } else {
          if (parsedPayload?.auth) state.auth = parsedPayload?.auth;
        }

        if (parsedPayload?.user) state.user = parsedPayload?.user;
      } catch (error) {
        console.log("unknwon error!", error);
      }
    },
    logout(state) {
      state.auth = null;
      state.user = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
