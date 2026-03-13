import { AppDataSource } from "../data-source";
import { Users } from "../entity/user";

export const userRepository  = AppDataSource.getRepository(Users)
