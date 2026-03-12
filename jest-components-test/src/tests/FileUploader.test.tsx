import { render, screen, fireEvent } from "@testing-library/react";
import FileUploader from "../components/FileUploader";
import "@testing-library/jest-dom";

describe("FileUploader", () => {
  test("shows file name when valid image is uploaded", () => {
    const { container } = render(<FileUploader />);

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const file = new File(["dummy"], "photo.png", { type: "image/png" });

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText("photo.png")).toBeInTheDocument();
  });

  test("shows error when non-image file uploaded", () => {
    const { container } = render(<FileUploader />);

    const file = new File(["dummy"], "document.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(container.querySelector('input[type="file"]')!, {
      target: { files: [file] },
    });

    expect(screen.getByRole("alert")).toHaveTextContent("Only images allowed");
  });

  test("does nothing when no file selected", () => {
    const { container } = render(<FileUploader />);

    fireEvent.change(container.querySelector('input[type="file"]')!, {
      target: { files: [] },
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
