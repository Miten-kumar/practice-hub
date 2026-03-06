import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";

const store = configureStore({
  reducer: {
    [productSlice.reducerPath]: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productSlice.middleware,
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
