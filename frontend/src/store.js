import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import modalReducer from "./store/modalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer
  },
});

export default store;