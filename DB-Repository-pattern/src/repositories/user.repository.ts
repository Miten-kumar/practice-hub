import { User } from "../../db/entities/User";
import { pool } from "../../db/pool";
import { createUser, updateUser } from "../../db/sql/queries/user.queries";
import { ApiError } from "../utils/apiError";

export class UserRepository {
  async createUser(user: User) {
    return await createUser.run(
      {
        name: user.name,
        email: user.email,
        mobile_no: user.mobile_no,
        password: user.password,
      },
      pool,
    );
  }

  async updateUser(id: number, user: User) {
    const result = await updateUser.run(
      {
        id,
        name: user.name,
        email: user.email,
        mobile_no: user.mobile_no,
        password: user.password,
      },
      pool,
    );

    if (!result || result.length === 0) {
      throw new ApiError(404, "User not found", "USER_NOT_FOUND");
    }

    return result;
  }
}
