import { render, screen } from "@testing-library/react";
import { jest } from "@jest/globals";
import UserList from "../components/UserList";
import { fetchUsers } from "../services/api";
import "@testing-library/jest-dom";

jest.mock("../services/api");

const mockedFetchUsers = jest.mocked(fetchUsers);

describe("UserList", () => {
  test("shows loading initially", () => {
    mockedFetchUsers.mockImplementation(() => new Promise(() => {}));

    render(<UserList />);

    expect(screen.getByText("Loading users...")).toBeInTheDocument();
  });

  test("renders users when API succeeds", async () => {
    mockedFetchUsers.mockResolvedValue([
      { id: 1, name: "Manush" },
      { id: 2, name: "John" },
    ]);

    render(<UserList />);

    expect(await screen.findByText("Manush")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  test("shows error when API fails", async () => {
    mockedFetchUsers.mockRejectedValue(new Error("API failed"));

    render(<UserList />);

    const error = await screen.findByRole("alert");

    expect(error).toHaveTextContent("Failed to fetch");
  });

  test("shows message when no users found", async () => {
    mockedFetchUsers.mockResolvedValue([]);

    render(<UserList />);

    expect(await screen.findByText("No users found")).toBeInTheDocument();
  });
});
