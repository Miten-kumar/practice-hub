import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: { auth: userReducer, products: productReducer, cart: cartReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;