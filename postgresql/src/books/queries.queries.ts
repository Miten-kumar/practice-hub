/** Types generated for queries found in "src/books/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindUserById' parameters type */
export interface IFindUserByIdParams {
  userId?: number | null | void;
}

/** 'FindUserById' return type */
export interface IFindUserByIdResult {
  contact_no: string;
  created_at: Date;
  email: string;
  id: number;
  name: string;
}

/** 'FindUserById' query type */
export interface IFindUserByIdQuery {
  params: IFindUserByIdParams;
  result: IFindUserByIdResult;
}

const findUserByIdIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":31,"b":37}]}],"statement":"SELECT * FROM users WHERE id = :userId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users WHERE id = :userId
 * ```
 */
export const findUserById = new PreparedQuery<IFindUserByIdParams,IFindUserByIdResult>(findUserByIdIR);


/** 'FindAllUsers' parameters type */
export type IFindAllUsersParams = void;

/** 'FindAllUsers' return type */
export interface IFindAllUsersResult {
  contact_no: string;
  created_at: Date;
  email: string;
  id: number;
  name: string;
}

/** 'FindAllUsers' query type */
export interface IFindAllUsersQuery {
  params: IFindAllUsersParams;
  result: IFindAllUsersResult;
}

const findAllUsersIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM users"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users
 * ```
 */
export const findAllUsers = new PreparedQuery<IFindAllUsersParams,IFindAllUsersResult>(findAllUsersIR);


