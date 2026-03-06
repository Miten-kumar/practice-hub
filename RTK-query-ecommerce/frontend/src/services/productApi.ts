import { baseApi } from "./baseApi";

export interface Product {
  id: number;
  title: string;
}

const PAGE_SIZE = 10;

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], number>({
      query: (pageNumber = 1) =>
        `/products?limit=${PAGE_SIZE}&offset=${(pageNumber - 1) * PAGE_SIZE}`,

      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, meta) => {
        const pageNumber = meta.arg;

        if (pageNumber === 1) {
          currentCache.splice(0, currentCache.length, ...newItems);
          return;
        }

        const seenIds = new Set(currentCache.map((item) => item.id));
        for (const item of newItems) {
          if (!seenIds.has(item.id)) {
            currentCache.push(item);
          }
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,

      providesTags: (result) =>
        result
          ? [
              ...result.map((product) => ({
                type: "Products" as const,
                id: product.id,
              })),
              { type: "Products" as const, id: "LIST" },
            ]
          : [{ type: "Products" as const, id: "LIST" }],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
