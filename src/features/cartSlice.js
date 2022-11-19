import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const nodeIndex = state.cart.findIndex(
        (element) => element.id === action.payload.id
      );
      state.cart.splice(nodeIndex, 1);
    },
    addQty: (state, action) => {
      state.cart.forEach((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (cartItem.quantity <= 9) {
            cartItem.quantity += 1;
          }
        }
      });
    },
    removeQty: (state, action) => {
      state.cart.forEach((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
          }
        }
      });
    },
  },
});

export const { addToCart, removeFromCart, addQty, removeQty } =
  cartSlice.actions;

export const selectCart = (state) => state.user.user;

export default cartSlice.reducer;
