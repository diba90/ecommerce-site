import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
import productReducer from "../features/productSlice";

const reducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
});

const store = configureStore({
  reducer,
});

export default store;
