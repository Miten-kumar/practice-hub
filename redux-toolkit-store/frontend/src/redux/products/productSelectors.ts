import { createSelector } from "reselect";
import type { RootState } from "../store";

const selectProductState = (state: RootState) => state.products;

export const selectProducts = createSelector(
  [selectProductState],
  (products) => (Array.isArray(products.items) ? products.items : []),
);

export const selectProductsLoading = createSelector(
  [selectProductState],
  (products) => products.loading,
);

export const selectProductsError = createSelector(
  [selectProductState],
  (products) => products.error,
);

export const selectExpensiveProducts = createSelector(
  [selectProducts],
  (products) => products.filter((p) => Number(p.price) > 1000),
);
