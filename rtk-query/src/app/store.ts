import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { productSlice } from "./slices/productSlice";
import { cartSlice } from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [cartSlice.reducerPath]: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authSlice.middleware,
      cartSlice.middleware,
      productSlice.middleware,
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
