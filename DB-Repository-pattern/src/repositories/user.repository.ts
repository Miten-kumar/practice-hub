import { User } from "../../db/entities/User";
import { pool } from "../../db/pool";
import { createUser, updateUser } from "../../db/sql/queries/user.queries";

export class UserRepository {
  async createUser(user: User) {
    const { name, email, mobile_no, password } = user;
    const result = await createUser.run(
      {
        name: user.name,
        email: user.email,
        mobile_no: user.mobile_no,
        password: user.password,
      },
      pool,
    );

    return result;
  }

  async updateUser(id: number, user: User) {
    const { name, email, mobile_no, password } = user;
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
  }
}
