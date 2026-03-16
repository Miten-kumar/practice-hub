import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import * as Sentry from "@sentry/react";
import GlobalErrorBoundary from "./errorBoundaries/GlobalErrorBoundary.tsx";

// Sentry.init({
//   dsn: "https://bd93261bee703fcc7938bfa023c1422e@o4511053784547328.ingest.us.sentry.io/4511053788545025",
//   // Setting this option to true will send default PII data to Sentry.
//   // For example, automatic IP address collection on events
//   sendDefaultPii: true,
//   // Enable logs to be sent to Sentry
//   enableLogs: true,
// });
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>,
);
