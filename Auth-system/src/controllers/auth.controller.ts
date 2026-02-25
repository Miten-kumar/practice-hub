import { Request, Response } from "express";
import { RegisterService } from "../services/register.service";
import { IUser } from "../types/User";
import { LoginService } from "../services/login.service";

export const registerController = async (req: Request, res: Response) => {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    gender,
    age,
    confirmPassword,
  }: IUser = req.body;
  let { password }: IUser = req.body;
  const registerService = new RegisterService();
  const user = await registerService.registerUser({
    email,
    firstName,
    lastName,
    phoneNumber,
    gender,
    age,
    password,
    confirmPassword,
  });
  res.status(201).json(user);
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;
  const user = new LoginService();
  const token = await user.loginUser({ email, password });

  res.cookie("token", token).json({ status: 200, token });
};
