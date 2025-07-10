import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import modalReducer from "./store/modalSlice";
import themeReducer from "./store/themeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    theme: themeReducer
  },
});

export default store;