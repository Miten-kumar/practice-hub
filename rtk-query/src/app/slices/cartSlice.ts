import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Cart } from "./types";

export const cartSlice = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),
  tagTypes: ["Carts"],
  endpoints: (builder) => ({
    getCarts: builder.query<Cart[], void>({
      query: () => "carts",
      providesTags: ["Carts"],
    }),
    getCartById: builder.query<Cart, number>({
      query: (id: number) => `carts/${id}`,
      providesTags: ["Carts"],
    }),
    updateCart: builder.mutation({
      query: ({ cart_id, payload }) => ({
        url: `carts/${cart_id}`,
        method: "PUT",
        body: payload,
      }),
      async onQueryStarted({ cart_id, payload }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartSlice.util.updateQueryData("getCartById", cart_id, (draft) => {
            draft.products = payload.products;
          }),
        );
        try {
          await queryFulfilled;
          console.log("succes");
        } catch (error) {
          patchResult.undo();
          console.log("error", error);
        }
      },
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useGetCartsQuery, useGetCartByIdQuery, useUpdateCartMutation } =
  cartSlice;
