import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = {
      id: 1,
      ...req.body,
    };

    return res.success(user, "User created");
  } catch (error) {
    res.error(`Internal Server Error ${error}`);
  }
};
