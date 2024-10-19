import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promo: null,
};

const promoDetailSlice = createSlice({
  name: "promoDetails",
  initialState,
  reducers: {
    setPromoDetails: (state, action) => {
      state.promo = action.payload;
    },
    updatePromoDetails: (state, action) => {
      state.promo = action.payload;
    },
  },
});

export const { setPromoDetails, updatePromoDetails } = promoDetailSlice.actions; // destructuring
export const promoDetailsReducer = promoDetailSlice.reducer;
