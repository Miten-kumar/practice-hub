import { AuthGuard } from "../decorators/AuthGuard";
import { Body } from "../decorators/Body";
import { CreateUserDto } from "../dtos/CreateuserDto";

export class UserController {
  @AuthGuard()
  createUser(@Body() body: CreateUserDto) {
    return {
      message: "User created",
      data: body
    };
  }
}