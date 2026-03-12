import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../components/Counter";
import "@testing-library/jest-dom";

describe("Counter Component", () => {
  test("renders counter with initial value 0", () => {
    render(<Counter />);

    expect(screen.getByText("Counter")).toBeInTheDocument();
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("increments count when increment button clicked", async () => {
    render(<Counter />);

    const button = screen.getByText("Increment");

    await userEvent.click(button);

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  test("decrements count when decrement button clicked", async () => {
    render(<Counter />);

    const button = screen.getByText("Decrement");

    await userEvent.click(button);

    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });

  test("shows message when count reaches 5", async () => {
    render(<Counter />);

    const button = screen.getByText("Increment");

    for (let i = 0; i < 5; i++) {
      await userEvent.click(button);
    }

    expect(screen.getByText("You reached five!")).toBeInTheDocument();
  });
});
