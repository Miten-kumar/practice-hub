export type QueryValue = string | number | boolean;
export type QueryParams = Record<string, QueryValue>;

export function buildQuery(query?: QueryParams): string {
  if (!query) return "";

  const queryString = new URLSearchParams(
    Object.entries(query).map(([k, v]) => [k, String(v)]),
  ).toString();

  return queryString ? `?${queryString}` : "";
}
