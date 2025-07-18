import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import modalReducer from "./store/modalSlice";
import themeReducer from "./store/themeSlice";
import scrapReducer from "./store/scrapSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    theme: themeReducer,
    scrap: scrapReducer
  },
});

export default store;