import { AppDataSource } from "../data-source.js";
import { Users } from "../entity/user.js";

export const userRepository  = AppDataSource.getRepository(Users)
