import { RequestHandler } from "express";
import {
  ApiResponse,
  TypedRequestbodyUser,
  TypedResponse,
  UserDetails,
} from "../interfaces";
import data from "../data.json";
import { z } from "zod";

export const getAllUser: RequestHandler<{}, ApiResponse<UserDetails>> = (
  req,
  res,
) => {
  try {
    console.log(req.body);
    const users: UserDetails[] = data as UserDetails[];

    res.status(200).json({ data: users, message: "success" });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: { type: "network", message: "network error" },
    });
  }
};

export const getUserById: RequestHandler<
  { id: number },
  ApiResponse<UserDetails>
> = (req, res) => {
  try {
    console.log(typeof req.params.id);

    const users: UserDetails[] = data as UserDetails[];

    res.status(200).json({ data: users, message: "success" });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: { type: "network", message: "network error" },
    });
  }
};

const userSchema = z.object({
  name: z.string({ error: "it should be string" }),
  age: z.number({ error: "it should be number" }),
  role: z.enum(["admin", "user"], { error: "it should be admin or user" }),
});

export const adduser = async (
  req: TypedRequestbodyUser<UserDetails>,
  res: TypedResponse<ApiResponse<UserDetails>>,
) => {
  try {
    console.log(req.body);
    const { age, name, role } = req.body;

    const {
      success,
      data: newUser,
      error,
    } = userSchema.safeParse({
      age: age,
      name: name,
      role: role,
    });

    if (!success) {
      console.log(error.message, "nhjnjnj");
      return res.status(400).json({
        message: "error",
        data: { message: error.flatten(), type: "response validation" },
      });
    }

    data.push(newUser as UserDetails);

    return res
      .status(200)
      .json({ data: newUser as UserDetails, message: "success" });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: { type: "network", message: `network errort ${error}` },
    });
  }
};
