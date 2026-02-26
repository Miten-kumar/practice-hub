import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { User } from "../../db/entities/User";

const userService = new UserService();

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, mobile_no, password } = req.body;
  const newUser = await userService.createUser({
    name,
    email,
    mobile_no,
    password,
  } as User);
  res.status(201).json({ message: "User created successfully", user: newUser });
};

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, mobile_no, password } = req.body;
  const updatedUser = await userService.updateUser(Number(id), {
    name,
    email,
    mobile_no,
    password,
  } as User);
  res
    .status(200)
    .json({ message: "User updated successfully", user: updatedUser });
};
