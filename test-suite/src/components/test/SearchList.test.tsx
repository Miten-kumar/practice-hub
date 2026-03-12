import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchList from "../SearchList";

const items = ["Apple", "Banana", "Orange"];

test("renders all items initially", () => {
  render(<SearchList items={items} />);

  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.getByText("Banana")).toBeInTheDocument();
  expect(screen.getByText("Orange")).toBeInTheDocument();
});

test("filters items based on search query", async () => {
  render(<SearchList items={items} />);

  const input = screen.getByPlaceholderText(/search/i);

  await userEvent.type(input, "app");

  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  expect(screen.queryByText("Orange")).not.toBeInTheDocument();
});

test("shows no results message when nothing matches", async () => {
  render(<SearchList items={items} />);

  const input = screen.getByPlaceholderText(/search/i);

  await userEvent.type(input, "xyz");

  expect(screen.getByText(/no results found/i)).toBeInTheDocument();
});