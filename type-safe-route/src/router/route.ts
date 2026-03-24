export const routes = [
  "/",
  "/home",
  "/user/:id",
  "/user/:id/posts/:postId",
  "/search",
] as const;

export type Route = typeof routes[number];

// Extract ":id" → "id"
type ExtractParam<S extends string> =
  S extends `:${infer Param}` ? Param : never;

// Recursively split by "/"
type ExtractParams<Path extends string> =
  Path extends `${infer A}/${infer B}`
    ? ExtractParam<A> | ExtractParams<B>
    : ExtractParam<Path>;

// Convert to object
type Params<Path extends string> =
  [ExtractParams<Path>] extends [never]
    ? Record<string,never>
    : {
        [K in ExtractParams<Path>]: string;
      };

type QueryMap = {
  "/search": {
    query: string;
    page?: number;
  };
  "/user/:id": {
    tab?: string;
  };
};

// Get query for route
type Query<R extends Route> =
  R extends keyof QueryMap ? QueryMap[R] : Record<string,never>;


type Exact<T, Shape> =
  T extends Shape
    ? Exclude<keyof T, keyof Shape> extends never
      ? T
      : never
    : never;


type NavigateOptions<R extends Route> =
  keyof Params<R> extends never
    ? {
        route: R;
        query?: Exact<Query<R>, Query<R>>;
      }
    : {
        route: R;
        params: Exact<Params<R>, Params<R>>;
        query?: Exact<Query<R>, Query<R>>;
      };

export function navigate<R extends Route>(
  options: NavigateOptions<R>
): string {
  let path = options.route as string;

  // Replace params
  if ("params" in options) {
    const params = options.params as Record<string, string>;

    for (const key in params) {
      path = path.replace(`:${key}`, params[key]);
    }
  }

  // Add query string
  if (options.query) {
    const search = new URLSearchParams();

    for (const key in options.query) {
      const value = options.query[key as keyof typeof options.query];
      if (value !== undefined) {
        search.append(key, String(value));
      }
    }

    const qs = search.toString();
    if (qs) {
      path += `?${qs}`;
    }
  }

  return path;
}


const url = navigate({
  route: "/search",
  params:{},
  query:{query:"ssss"}
});

console.log(url);