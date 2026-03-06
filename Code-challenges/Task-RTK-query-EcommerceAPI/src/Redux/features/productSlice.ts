import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Products } from "../../types/types";
import type { Products } from "../../types/types";

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["Products"],

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1"
  }),

  endpoints: (builder) => ({
    // getProducts: builder.query<Products[],void>({
    //   query: () => ({
    //     url :'/products',
    //     method:'get'
    //   })
    // }),

    getProducts: builder.query<Products[],{ offset: number; limit: number }>({
      query: ({ offset ,limit }) => `/products?offset=${offset}&limit=${limit}`,
       providesTags: (result) =>
        result
          ? [
              ...result.map((product: Products) => ({
                type: "Products" as const,
                id: product.id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

})
})

export const {useGetProductsQuery} = productApi