import { createSelector } from "reselect";
import type { RootState } from "./store";

const selectUserState = (state: RootState) => state.auth;

export const selectUsers = createSelector(
    [selectUserState],
    (userState) => userState.users
);

export const selectUserLoading = createSelector(
    [selectUserState],
    (userState) => userState.loading
);

export const selectUserError = createSelector(
    [selectUserState],
    (userState) => userState.error
);

const selectProductState = (state: RootState) => state.products;

export const selectProducts = createSelector(
  [selectProductState],
  (productState) => productState.products
);

export const selectProductLoading = createSelector(
    [selectProductState],
  (productState) => productState.loading
);

export const selectProductError = createSelector(
    [selectProductState],
    (productState) => productState.error
);

const selectCartState = (state: RootState) => state.cart;

export const selectCarts = createSelector(
  [selectCartState],
  (cartState) => cartState.carts
);

export const selectCartLoading = createSelector(
    [selectCartState],
  (cartState) => cartState.loading
);

export const selectCartError = createSelector(
    [selectCartState],
    (cartState) => cartState.error
);