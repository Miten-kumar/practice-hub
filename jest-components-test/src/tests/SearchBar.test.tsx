import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";
import SearchBar from "../components/SearchBar";
import "@testing-library/jest-dom";

describe("SearchBar", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test("renders search input", () => {
    render(<SearchBar onSearch={jest.fn()} />);

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  test("allows user to type", async () => {
    render(<SearchBar onSearch={jest.fn()} />);

    const input = screen.getByPlaceholderText("Search...");

    await userEvent.type(input, "react");

    expect(input).toHaveValue("react");
  });

  test("calls onSearch after 500ms debounce", async () => {
    jest.useFakeTimers();

    const mockSearch = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText("Search...");

    await user.type(input, "react");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockSearch).toHaveBeenCalledWith("react");
  });

  test("does not call onSearch when input is empty", () => {
    jest.useFakeTimers();

    const mockSearch = jest.fn();

    render(<SearchBar onSearch={mockSearch} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockSearch).not.toHaveBeenCalled();
  });
});
