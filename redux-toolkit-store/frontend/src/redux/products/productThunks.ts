import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "./productSlice";

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data as { message?: string } | undefined;
    return apiMessage?.message || error.message || "Failed to fetch products";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to fetch products";
};

const normalizeProducts = (data: unknown): Product[] => {
  if (Array.isArray(data)) {
    return data as Product[];
  }

  if (data && typeof data === "object") {
    const maybeProducts = (data as { products?: unknown }).products;
    if (Array.isArray(maybeProducts)) {
      return maybeProducts as Product[];
    }
  }

  return [];
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/products");
      return normalizeProducts(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);
