import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";
// import React from "react";

// Component that throws error
export default function BuggyComponent() {
    throw new Error("Test error");
  return(<></>)
}

test("renders children when no error occurs", () => {
  render(
    <ErrorBoundary>
      <p>Child component</p>
    </ErrorBoundary>
  );

  expect(screen.getByText("Child component")).toBeInTheDocument();
});

test("renders fallback UI when child throws error", () => {
  // silence React error logs
  jest.spyOn(console, "error").mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});