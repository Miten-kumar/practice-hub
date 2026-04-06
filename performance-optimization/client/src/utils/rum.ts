import { onCLS, onLCP, onINP } from "web-vitals";
import type { Metric } from "web-vitals";

type RumPayload = {
  name: string;
  value: number;
  id: string;
  url: string;
  userAgent: string;
};

const sendToAnalytics = (metric: Metric) => {
  const payload: RumPayload = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    url: window.location.pathname,
    userAgent: navigator.userAgent,
  };

  const body = new Blob([JSON.stringify(payload)], {
    type: "application/json",
  });

  navigator.sendBeacon("http://localhost:3001/rum", body);
};

export const initRUM = () => {
  onCLS(sendToAnalytics);
  onLCP(sendToAnalytics);
  onINP(sendToAnalytics);
};
