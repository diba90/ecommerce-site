import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    listProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { listProducts } = productSlice.actions;

export default productSlice.reducer;
