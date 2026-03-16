import axios from "axios";
import * as Sentry from "@sentry/react";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (!error.response) {
      // Network error
      console.error("Network error");
    } else if (error.response.status >= 500) {
      // Server error
      console.error("Server error");
    } else if (error.response.status === 401) {
      console.error("Unauthorized");
    }

    Sentry.captureException(error);

    return Promise.reject(error);
  }
);

export default api;