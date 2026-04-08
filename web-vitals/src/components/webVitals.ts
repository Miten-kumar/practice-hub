import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

function sendToAnalytics(metric: object) {
  console.log(metric);
}

export function initWebVitals() {
  onCLS(sendToAnalytics, { reportAllChanges: true });
  onFCP(sendToAnalytics, { reportAllChanges: true });
  onINP(sendToAnalytics, { reportAllChanges: true });
  onLCP(sendToAnalytics, { reportAllChanges: true });
  onTTFB(sendToAnalytics, { reportAllChanges: true });
}
