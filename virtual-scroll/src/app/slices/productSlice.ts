import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "./types";

export const productSlice = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1/",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], number>({
      query: () =>  `products`,
      providesTags: ["products"],
    }),
    getProductById: builder.query<Product, number>({
      query: (id: number) => `products/${id}`,
      providesTags: ["products"],
    }),
  }),
});

export const { useGetProductByIdQuery, useGetProductsQuery } = productSlice;
