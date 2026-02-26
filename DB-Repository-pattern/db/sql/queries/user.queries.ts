/** Types generated for queries found in "db/sql/user.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateUser' parameters type */
export interface ICreateUserParams {
  email?: string | null | void;
  mobile_no?: string | null | void;
  name?: string | null | void;
  password?: string | null | void;
}

/** 'CreateUser' return type */
export interface ICreateUserResult {
  email: string;
  id: number;
  mobile_no: string;
  name: string;
  password: string;
}

/** 'CreateUser' query type */
export interface ICreateUserQuery {
  params: ICreateUserParams;
  result: ICreateUserResult;
}

const createUserIR: any = {"usedParamSet":{"name":true,"email":true,"mobile_no":true,"password":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":61,"b":65}]},{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":68,"b":73}]},{"name":"mobile_no","required":false,"transform":{"type":"scalar"},"locs":[{"a":76,"b":85}]},{"name":"password","required":false,"transform":{"type":"scalar"},"locs":[{"a":88,"b":96}]}],"statement":"INSERT INTO users (name, email, mobile_no, password) VALUES (:name, :email, :mobile_no, :password) RETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO users (name, email, mobile_no, password) VALUES (:name, :email, :mobile_no, :password) RETURNING *
 * ```
 */
export const createUser = new PreparedQuery<ICreateUserParams,ICreateUserResult>(createUserIR);


/** 'UpdateUser' parameters type */
export interface IUpdateUserParams {
  email?: string | null | void;
  id?: number | null | void;
  mobile_no?: string | null | void;
  name?: string | null | void;
  password?: string | null | void;
}

/** 'UpdateUser' return type */
export interface IUpdateUserResult {
  email: string;
  id: number;
  mobile_no: string;
  name: string;
  password: string;
}

/** 'UpdateUser' query type */
export interface IUpdateUserQuery {
  params: IUpdateUserParams;
  result: IUpdateUserResult;
}

const updateUserIR: any = {"usedParamSet":{"name":true,"email":true,"mobile_no":true,"password":true,"id":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":24,"b":28}]},{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":39,"b":44}]},{"name":"mobile_no","required":false,"transform":{"type":"scalar"},"locs":[{"a":59,"b":68}]},{"name":"password","required":false,"transform":{"type":"scalar"},"locs":[{"a":82,"b":90}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":103,"b":105}]}],"statement":"UPDATE users SET name = :name, email = :email, mobile_no = :mobile_no, password = :password WHERE id = :id RETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE users SET name = :name, email = :email, mobile_no = :mobile_no, password = :password WHERE id = :id RETURNING *
 * ```
 */
export const updateUser = new PreparedQuery<IUpdateUserParams,IUpdateUserResult>(updateUserIR);


