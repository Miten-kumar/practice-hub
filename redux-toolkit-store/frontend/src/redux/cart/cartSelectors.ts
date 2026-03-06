import { createSelector } from "reselect";
import type { RootState } from "../store";

const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items,
);

export const selectCartLoading = createSelector(
  [selectCartState],
  (cart) => cart.loading,
);

export const selectCartError = createSelector(
  [selectCartState],
  (cart) => cart.error,
);

export const selectCartItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((count, item) => count + item.quantity, 0),
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
);
