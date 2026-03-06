import { baseApi } from "./baseApi";

interface CartItem {
  productId: number;
  quantity: number;
}

interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
}

interface AddToCartInput {
  userId: number;
  productId: number;
  quantity: number;
}

const CART_BASE_URL =
  import.meta.env.VITE_CART_API_BASE_URL ?? "https://fakestoreapi.com";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartByUser: builder.query<CartItem[], number>({
      query: (userId) => `${CART_BASE_URL}/carts/user/${userId}`,
      transformResponse: (response: Cart[]) => response[0]?.products ?? [],
      providesTags: (result, _error, userId) => [
        { type: "Cart", id: `USER-${userId}` },
        ...(result ?? []).map((item) => ({
          type: "Cart" as const,
          id: item.productId,
        })),
      ],
    }),

    addToCart: builder.mutation<Cart, AddToCartInput>({
      query: ({ userId, productId, quantity }) => ({
        url: `${CART_BASE_URL}/carts/${userId}`,
        method: "POST",
        body: {
          userId,
          date: new Date().toISOString(),
          products: [{ productId, quantity }],
        },
      }),

      async onQueryStarted(
        { userId, productId, quantity },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCartByUser", userId, (draft) => {
            const existingItem = draft.find(
              (item) => item.productId === productId,
            );

            if (existingItem) {
              existingItem.quantity += quantity;
            } else {
              draft.push({ productId, quantity });
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: (_result, _error, { userId, productId }) => [
        { type: "Cart", id: `USER-${userId}` },
        { type: "Cart", id: productId },
      ],
    }),
  }),
});

export const { useGetCartByUserQuery, useAddToCartMutation } = cartApi;
