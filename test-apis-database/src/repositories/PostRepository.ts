import { Posts } from "../entities/Post";
import { getActiveDataSource } from "./activeDataSource";

export function getPostRepository() {
  return getActiveDataSource().getRepository(Posts);
}
