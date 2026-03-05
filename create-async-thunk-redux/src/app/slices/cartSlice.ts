import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Cart } from "./types";

export const getCartById = createAsyncThunk(
  "cart/getCartById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummyjson.com/carts/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }

      return rejectWithValue("Something went wrong");
    }
  },
);

const initialState = {
  carts: [] as Cart[],
  loading: true,
  error: {},
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCartById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartById.fulfilled, (state, action) => {
        state.loading = false;
        state.carts.push(action.payload);
      })
      .addCase(getCartById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default cartsSlice.reducer;
