import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"
import productsReducer from "./features/productsSlice"
import cartReducer from "./features/cartSlice"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productsReducer,
        cart:cartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch