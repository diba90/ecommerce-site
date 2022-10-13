import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userReducer from "../features/userSlice";
// import postReducer from "../features/postSlice";

const reducer = combineReducers({
  user: userReducer,
  //   post: postReducer,
});

const store = configureStore({
  reducer,
});

export default store;
