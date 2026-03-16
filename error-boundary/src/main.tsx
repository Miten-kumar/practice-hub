// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./services/sentry.ts";
import GlobalErrorBoundary from "./errors/components/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <GlobalErrorBoundary>
    <App />
  </GlobalErrorBoundary>
  // </StrictMode>,
);
