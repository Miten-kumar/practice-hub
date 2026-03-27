import client from "prom-client";

export const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"],
});

export const responseTimeHistogram = new client.Histogram({
  name: "http_response_time_seconds",
  help: "Response time in seconds",
  labelNames: ["method", "route"],
});
