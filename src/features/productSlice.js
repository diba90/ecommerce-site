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
    visibilityShow: (state, action) => {
      state.products.items.map((product) => {
        if (product.id === action.payload.id) {
          product.selected = true;
        }
      });
    },
    visibilityHidden: (state, action) => {
      state.products.items.map((product) => {
        if (product.id === action.payload.id) {
          product.selected = false;
        }
      });
    },
  },
});

export const { listProducts, visibilityShow, visibilityHidden } =
  productSlice.actions;

export default productSlice.reducer;
