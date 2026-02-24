import { PoolType }  from '../Db/db';
import { findUserById, IFindUserByIdParams } from '../Db/queries/queries.queries';
 
export class UserRepository {
  async getUserById(params: IFindUserByIdParams, pool: PoolType) {
 
    const result = await findUserById.run(params, pool);
   
    return result[0] || null;
  }
}


