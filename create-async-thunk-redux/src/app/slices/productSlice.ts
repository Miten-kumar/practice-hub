import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "./types";

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
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
  products: [] as Product[],
  loading: true,
  error: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default productsSlice.reducer;
