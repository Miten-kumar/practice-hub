import { IsEmail } from "../decorators/IsEmail";
import { IsString } from "../decorators/IsString";
import { Required } from "../decorators/Required";

export class CreateUserDto{
    @Required()
    @IsEmail()
    email!:string;

    @Required()
    @IsString()
    name!:string;
}