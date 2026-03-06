import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "./types";

export const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["Auth"],
    }),
    getUserById: builder.query<User, number>({
      query: (id: number) => `users/${id}`,
      providesTags: ["Auth"],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "users",
        body: user,
        method: "POST",
      }),
      invalidatesTags:['Auth']
    }),
  }),
});

export const { useGetUserByIdQuery, useGetUsersQuery, useCreateUserMutation } =
  authSlice;
