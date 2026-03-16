import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://add06f6fd4ac5bb25515ff5cb2bd2579@o4511053440221184.ingest.us.sentry.io/4511053444218880",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});