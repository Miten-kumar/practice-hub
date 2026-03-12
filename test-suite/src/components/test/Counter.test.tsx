import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../Counter";

test("initial state", () => {
  render(<Counter />);

  expect(screen.getByText("0")).toBeInTheDocument();
});

test("increment", async () => {
  render(<Counter />);

  const incrementButton = screen.getByRole("button", { name: /increment/i });

  await userEvent.click(incrementButton);

  expect(screen.getByText("1")).toBeInTheDocument();
});

test("decrement", async () => {
  render(<Counter />);

  const decrementButton = screen.getByRole("button", { name: /decrement/i });

  await userEvent.click(decrementButton);

  expect(screen.getByText("-1")).toBeInTheDocument();
});

test("reset", async () => {
  render(<Counter />);

  const resetButton = screen.getByRole("button", { name: /reset/i });

  await userEvent.click(resetButton);

  expect(screen.getByText("0")).toBeInTheDocument();
});
