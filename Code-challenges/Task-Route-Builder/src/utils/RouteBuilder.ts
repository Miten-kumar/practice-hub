//  Single param extraction
// autocomplete routes
// query params
 
type Routes =
  | "/users"
  | "/users/:id"
  | "/posts/:postId/comments/:commentId";
 
type ParamsObject<T> =
  T extends `${string}:${infer Param}`
    ? { [K in Param]: string }
    : Record<string,string>;
 
type HasParams<T> =
  keyof ParamsObject<T> extends never ? false : true;
 
export function buildRoute<R extends Routes>(
  route: R,
  options: HasParams<R> extends true
    ? {
        params: ParamsObject<R>,
        query?: Record<string, string>
    }
    : {
        params?: never,
        query?: Record<string, string>
    }
) {
    let url = route as string;
 
    if("params" in options && options.params) {
        for(const key in options.params) {
            url = url.replace(`:${key}`, options.params[key] as string);
        }
    }
 
    if(options.query) {
        const queryString = new URLSearchParams(options.query).toString();
        url += `?${queryString.toString()}`;
    }
 
    return url;
}
 
buildRoute("/users/:id", {
  params: { id: "123" }
});
 
buildRoute("/users", {});
 
buildRoute("/users/:id", {
  params: {}
});
 
buildRoute("/users/:id", {});
 
buildRoute("/abc", {});
 
buildRoute("/users", {
  query: { page: "1" }
});
// "/users?page=1"
 
buildRoute("/users/:id", {
  params: { id: "123" },
  query: { tab: "posts" }
});
// "/users/123?tab=posts"
 
buildRoute("/users/:id", {
  params: { id: "123" },
  query: { page: 1 } //  must be string
});
 
 
//multi params extraction
// "/posts/:postId/comments/:commentId"
 
type MultiParamsObject<T> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof MultiParamsObject<Rest>]: string }
    : T extends `${string}:${infer Param}`
      ? { [K in Param]: string }
      : Record<string, never>;
 
type HasMultiParams<T> =
  keyof MultiParamsObject<T> extends never ? false : true;
 
export function buildMultiRoute<T extends string>(
  route: T,
  options: HasMultiParams<T> extends true
    ? { params: MultiParamsObject<T> }
    : {params?: never}
) {
  return route;
}
 
 
buildMultiRoute("/posts/:postId/comments/:commentId", {
  params: {
    postId: "1",
    commentId: "2"
  }
});
 
buildMultiRoute("/posts/:postId/comments/:commentId", {
  params: {
    postId: "1"
  }
});
 
buildMultiRoute("/posts/:postId/comments/:commentId", {
  params: {
    postId: "1",
    commentId: "2",
    extra: "no"
  }
});
 
//auto complete routes