import { ValidateBody } from "../decorators/user.decorators";
import { UserDTO } from "../dto/user.dto"

export class UserController {
  @ValidateBody(UserDTO)
  createUser(req: any, res: any) {
    res.json({
      message: "User created successfully",
      data: req.body,
    });
  }
}