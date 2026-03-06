import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  token: string;
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data as { message?: string } | undefined;
    return apiMessage?.message || error.message || "Login failed";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Login failed";
};

export const loginUser = createAsyncThunk<
  AuthUser,
  LoginCredentials,
  { rejectValue: string }
>("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/login",
      credentials,
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
