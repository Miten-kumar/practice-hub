import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "./types";

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummy-json.mock.beeceptor.com/users/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || error.message
        );
      }

      return rejectWithValue("Something went wrong");
    }
  },
);

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [] as User[],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
