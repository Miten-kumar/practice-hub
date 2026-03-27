// src/config/metrics.ts

import client from "prom-client";

export const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total requests",
});

export const requestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Request duration",
  buckets: [0.1, 0.5, 1, 2, 5],
});

export const register = client.register;