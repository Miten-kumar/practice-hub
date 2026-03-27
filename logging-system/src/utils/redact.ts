// src/utils/redact.ts

const SENSITIVE_FIELDS = ["password", "token", "authorization"];

export function redact(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;

  const result: any = {};

  for (const key in obj) {
    if (SENSITIVE_FIELDS.includes(key.toLowerCase())) {
      result[key] = "***REDACTED***";
    } else if (typeof obj[key] === "object") {
      result[key] = redact(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}