export const routes = {
  home: "/",
  user: "/user/:id",
  post: "/user/:id/post/:postId",
  search: "/search",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];
