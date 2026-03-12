import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserList from "../UserList";

beforeEach(() => {
  globalThis.fetch = jest.fn() as jest.Mock;
});


test("loading", async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ],
  });

  render(<UserList />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await screen.findByText("John");
});

test("success", async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ],
  });

  render(<UserList />);

  const user = await screen.findByText("John");

  expect(user).toBeInTheDocument();
});

test("error", async () => {
  (fetch as jest.Mock).mockRejectedValueOnce(new Error("API error"));

  render(<UserList />);

  const error = await screen.findByText("Failed to load users");

  expect(error).toBeInTheDocument();
});

test("empty", async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  render(<UserList />);

  const empty = await screen.findByText("No Users Found");

  expect(empty).toBeInTheDocument();
});

test("handles API response error", async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
  });

  render(<UserList />);

  const error = await screen.findByText("Failed to load users");

  expect(error).toBeInTheDocument();
});