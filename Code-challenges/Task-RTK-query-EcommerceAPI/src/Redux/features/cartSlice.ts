import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CartItem,Cart } from "../../types/types"

export const cartApi = createApi({
  reducerPath: "cartApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),

  tagTypes: ["Cart"],

  endpoints: (builder) => ({

    getCart: builder.query<Cart, void>({
      query: () => "/carts",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<CartItem, CartItem>({
      query: (item) => ({
        url: "/carts/add",
        method: "POST",
        body: item,
      }),

      async onQueryStarted(item, { dispatch, queryFulfilled }) {

        const patch = dispatch(
          cartApi.util.updateQueryData(
            "getCart",
            undefined,
            (draft) => {
              draft.items.push(item)
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },

      invalidatesTags: ["Cart"],
    }),

  }),
})

export const {
  useGetCartQuery,
  useAddToCartMutation,
} = cartApi