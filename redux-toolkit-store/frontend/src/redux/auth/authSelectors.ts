import { createSelector } from "reselect";
import type { RootState } from "../store";

const selectAuthState = (state: RootState) => state.auth;

export const selectAuthUser = createSelector(
  [selectAuthState],
  (auth) => auth.user,
);

export const selectIsAuthenticated = createSelector([selectAuthUser], (user) =>
  Boolean(user?.token),
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading,
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error,
);
