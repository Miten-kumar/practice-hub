
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import SearchList from "../components/SearchList";

describe("SearchList", () => {

  test("renders all items initially", () => {
    render(<SearchList items={["Apple", "Banana", "Orange"]} />);

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Orange")).toBeInTheDocument();
  });

  test("filters items based on search input", () => {
    render(<SearchList items={["Apple", "Banana", "Orange"]} />);

    fireEvent.change(screen.getByLabelText("search"), {
      target: { value: "app" }
    });

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  test("shows no results message", () => {
    render(<SearchList items={["Apple", "Banana"]} />);

    fireEvent.change(screen.getByLabelText("search"), {
      target: { value: "xyz" }
    });

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

});