import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Products } from "../types/types";
import type { CartItem } from "../types/types";

export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com"
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<Products[],void>({
      query: () => ({
        url :'/products',
        method:'get'
      })
    }),

    addToCart : builder.mutation<CartItem,{productId :number}>({
      query:() => ({
        url:'/carts',
        method:'post',
        body:'productId'
      })
    })
})
})

export const {useGetProductsQuery,useAddToCartMutation} = ecommerceApi