import {
  RequestHandler,
} from "express";
import {
  ApiResponse,
  TypedRequestbodyUser,
  TypedResponse,
  UserDetails,
} from "../interfaces";
import data from "../data.json";
import {z} from "zod"


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
  name :z.string(),
  age :z.number(),
  role :z.string()
})

export const adduser = (
  req: TypedRequestbodyUser<UserDetails>,
  res: TypedResponse<ApiResponse<UserDetails>>,
) => {
  try {
    console.log(req.body);
    const { age, name, role } = req.body;

    console.log(typeof age ,"sss", typeof name ,"gtgtgtgt", typeof role,"hhyhyh");
    
    
    const newUser = userSchema.parse({
      age: age,
      name: name,
      role: role,
    });

    console.log(newUser,"yhbhbhbh");
    
    data.push(newUser as UserDetails);

    res.status(200).json({ data: newUser as UserDetails, message: "success" });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: { type: "network", message: `network errort ${error}` },
    });
  }
};
