import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { CartItem } from "./cartSlice";

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data as { message?: string } | undefined;
    return apiMessage?.message || error.message || "Failed to fetch cart";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to fetch cart";
};

export const fetchCartItems = createAsyncThunk<
  CartItem[],
  void,
  { rejectValue: string }
>("cart/fetchCartItems", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/api/cart");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
