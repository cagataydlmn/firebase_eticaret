import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import basketItemsReducer from "./basketItemsReducer";
import likeItemsReducer from "./likeItemsReducer";

const store = configureStore({
  reducer: {
    auth,
    likeItems: likeItemsReducer,
    basketItems:basketItemsReducer
  },
});

export default store;
