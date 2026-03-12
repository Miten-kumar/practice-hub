import { expect, jest, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../components/LoginForm";
import { loginUser } from "../services/api";

jest.mock("../services/api");

const mockedLoginUser = jest.mocked(loginUser);

describe("LoginFormComponent", () => {
  test("renders login form inputs", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("shows error for invalid email", async () => {
    render(<LoginForm />);
    await userEvent.type(screen.getByPlaceholderText("Email"), "abc");
    await userEvent.type(screen.getByPlaceholderText("Password"), "123456");

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });

  test("calls login api on valid submit", async () => {
    mockedLoginUser.mockResolvedValue({
      token: "fake-jwt-token",
      user: { email: "manush@gmail.com" },
    });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const button = screen.getByRole("button");

    await userEvent.type(emailInput, "test@test.com");
    await userEvent.type(passwordInput, "123456");

    await userEvent.click(button);

    expect(mockedLoginUser).toHaveBeenCalledTimes(1);

    expect(mockedLoginUser).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "123456",
    });
  });
});
