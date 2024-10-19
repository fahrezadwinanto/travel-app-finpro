// userSlice atau userStore adalah sebuah store yang menyimpan state user
import { createSlice } from "@reduxjs/toolkit";

// initial state adalah state awal ketika app pertama kali dijalankan
const initialState = {
  user: null,
};

const userDetailSlice = createSlice({
  name: "userDetail", // name ini akan digunakan di dalam store
  initialState,
  reducers: {
    detail: (state, action) => {
      state.user = action.payload;
    },
    updateUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { detail, updateUserDetails } = userDetailSlice.actions; // destructuring
export const userDetailsReducer = userDetailSlice.reducer;
