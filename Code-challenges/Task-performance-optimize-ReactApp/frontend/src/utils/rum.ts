import { onLCP, onCLS, onINP } from 'web-vitals';

type MetricPayload = {
  name: string;
  value: number;
  id: string;
  url: string;
  userAgent: string;
};

function sendMetric(metric: MetricPayload) {
  navigator.sendBeacon('http://localhost:3000/analytics', JSON.stringify(metric));
  console.log("metric",metric)
}

export function collectVitals() {
  onLCP((metric) => {
    sendMetric({
      name: 'LCP',
      value: metric.value,
      id: metric.id,
      url: location.href,
      userAgent: navigator.userAgent,
    });
  });

  onCLS((metric) => {
    sendMetric({
      name: 'CLS',
      value: metric.value,
      id: metric.id,
      url: location.href,
      userAgent: navigator.userAgent,
    });
  });

  onINP((metric) => {
    sendMetric({
      name: 'INP',
      value: metric.value,
      id: metric.id,
      url: location.href,
      userAgent: navigator.userAgent,
    });
  });
}

