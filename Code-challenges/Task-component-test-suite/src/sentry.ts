import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://5b5c018102e98ec151c7d118621e7700@o4511054031618048.ingest.us.sentry.io/4511054034173952",
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: 1.0,
  sendDefaultPii: true

});