import { buildRoute } from "../routes/builder";
import { routes } from "../routes/routes";

export const url1 = buildRoute(routes.user, { id: "123" });

export const url2 = buildRoute(
  routes.post,
  { id: "1", postId: "99" },
  { page: 2, published: true },
);

// ❌ missing param → ERROR
// buildRoute(routes.user, {});

// ❌ extra param → ERROR
// buildRoute(routes.user, { id: "123", extra: "nope" });

// ❌ invalid route → ERROR
// buildRoute("/random", {});
