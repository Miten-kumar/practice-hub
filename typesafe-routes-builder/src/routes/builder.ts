import { buildQuery, type QueryParams } from "../utils/query";
import type { AppRoute } from "./routes";
import type { ExtractParams, StrictParams } from "./types";

export function buildRoute<
  T extends AppRoute,
  P extends ExtractParams<T>,
  A extends P,
>(route: T, params: StrictParams<A, P>, query?: QueryParams): string {
  let result = route as string;
  const typedParams = params as P;
  const keys = Object.keys(typedParams) as Array<keyof P>;

  for (const key of keys) {
    const value = typedParams[key];
    result = result.replace(":" + String(key), value);
  }

  return result + buildQuery(query);
}
