import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import axios from "axios";
import UserList from "../components/UserList";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UserList", () => {

  test("shows loading initially", () => {
    render(<UserList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("fetches and displays users", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [{ id: 1, name: "John" }]
    });

    render(<UserList />);

    const user = await screen.findByText("John");

    expect(user).toBeInTheDocument();
  });

  test("shows empty state when no users found", async () => {
    mockedAxios.get.mockResolvedValue({
      data: []
    });

    render(<UserList />);

    const message = await screen.findByText("No users found");

    expect(message).toBeInTheDocument();
  });

  test("shows error message when API fails", async () => {
    mockedAxios.get.mockRejectedValue(new Error("API Error"));

    render(<UserList />);

    const error = await screen.findByText("Failed to load users");

    expect(error).toBeInTheDocument();
  });

});