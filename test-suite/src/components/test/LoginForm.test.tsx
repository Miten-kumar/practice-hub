import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";

test("login with valid inputs", async () => {
  const mockSubmitHandler = jest.fn();
  render(<LoginForm onSubmit={mockSubmitHandler} />);

  const nameInput = await screen.findByPlaceholderText("email");
  const passwordInput = await screen.findByPlaceholderText("password");

  await userEvent.type(nameInput, "hello@c.c");
  await userEvent.type(passwordInput, "hello@123");

  const submitButton = screen.getByRole("button");

  await userEvent.click(submitButton);

  expect(mockSubmitHandler).toHaveBeenCalled();
  expect(mockSubmitHandler).toHaveBeenCalledWith({
    email: "hello@c.c",
    password: "hello@123",
  });
});


test("login without valid email", async () => {
  const mockSubmitHandler = jest.fn();
  render(<LoginForm onSubmit={mockSubmitHandler} />);

  const nameInput = await screen.findByPlaceholderText("email");
  const passwordInput = await screen.findByPlaceholderText("password");

  await userEvent.type(nameInput, "hello");
  await userEvent.type(passwordInput, "hello@123");

  const submitButton = screen.getByRole("button");

  await userEvent.click(submitButton);

  expect(screen.getByText("Invalid email")).toBeInTheDocument()
});

test("login without valid password", async () => {
  const mockSubmitHandler = jest.fn();
  render(<LoginForm onSubmit={mockSubmitHandler} />);

  const nameInput = await screen.findByPlaceholderText("email");
  const passwordInput = await screen.findByPlaceholderText("password");

  await userEvent.type(nameInput, "hello@gmail.com");
  await userEvent.type(passwordInput, "hell");

  const submitButton = screen.getByRole("button");

  await userEvent.click(submitButton);

  expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument()
});