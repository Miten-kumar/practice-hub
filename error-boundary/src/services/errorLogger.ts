import * as Sentry from "@sentry/react";

export function logError(error: Error, context?: string | null) {
  console.error("Logged error:", {
    message: error.message,
    stack: error.stack,
    context,
  });

  Sentry.withScope((scope) => {
    if (context) {
      scope.setTag("error_context", context);
    }

    scope.setExtra("stack", error.stack);
    Sentry.captureException(error);
  });
}