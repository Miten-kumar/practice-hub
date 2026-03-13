import { Users } from "../entities/User";
import { getActiveDataSource } from "./activeDataSource";

export function getUserRepository() {
  return getActiveDataSource().getRepository(Users);
}
