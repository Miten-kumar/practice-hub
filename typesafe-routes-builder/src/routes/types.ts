export type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends `${string}:${infer Param}`
      ? { [K in Param]: string }
      : {};

export type StrictParams<TActual, TExpected> = TActual &
  Record<Exclude<keyof TActual, keyof TExpected>, never>;
