// userSlice atau userStore adalah sebuah store yang menyimpan state user
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // kita butuh Cookies dari js-cookie untuk menyimpan token ke dalam cookies web browser

// initial state adalah state awal ketika app pertama kali dijalankan
const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user", // name ini akan digunakan di dalam store
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // simpan tokennya di dalam cookies
      Cookies.set("token", action.payload.token); // set menerima 2 parameter key value
    },
    logout: (state) => {
      state.user = null; // mengosongkan state user ketika action logout
      state.token = null;

      // menghapus cookies dari web browser
      Cookies.remove("token"); // cukup pake key nya
    },
  },
});

export const { login, logout } = userSlice.actions; // destructuring
export const userReducer = userSlice.reducer;
