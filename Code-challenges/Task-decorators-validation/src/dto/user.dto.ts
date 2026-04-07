// import { IsInt,IsString,IsEmail,IsNotEmpty } from "class-validator";
import { IsString,IsEmail,IsInt } from "../decorators/user.decorators";

export class UserDTO{

  @IsString()
  name! : string;

  @IsEmail()
  email! : string;

  @IsInt()
  age! : number;
}

