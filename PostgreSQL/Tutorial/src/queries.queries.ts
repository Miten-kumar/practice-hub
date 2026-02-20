/** Types generated for queries found in "src/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindUserById' parameters type */
export interface IFindUserByIdParams {
  userId?: number | null | void;
}

/** 'FindUserById' return type */
export interface IFindUserByIdResult {
  email: string | null;
  name: string | null;
  password: string | null;
  users_id: number;
}

/** 'FindUserById' query type */
export interface IFindUserByIdQuery {
  params: IFindUserByIdParams;
  result: IFindUserByIdResult;
}

const findUserByIdIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":43}]}],"statement":"SELECT * FROM users WHERE users_id = :userId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users WHERE users_id = :userId
 * ```
 */
export const findUserById = new PreparedQuery<IFindUserByIdParams,IFindUserByIdResult>(findUserByIdIR);


/** 'FindExpensiveProduct' parameters type */
export type IFindExpensiveProductParams = void;

/** 'FindExpensiveProduct' return type */
export interface IFindExpensiveProductResult {
  price: number | null;
  title: string | null;
}

/** 'FindExpensiveProduct' query type */
export interface IFindExpensiveProductQuery {
  params: IFindExpensiveProductParams;
  result: IFindExpensiveProductResult;
}

const findExpensiveProductIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT \ntitle, \nprice \nFROM product \nWHERE price = (SELECT MAX(price) FROM product)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 * title, 
 * price 
 * FROM product 
 * WHERE price = (SELECT MAX(price) FROM product)
 * ```
 */
export const findExpensiveProduct = new PreparedQuery<IFindExpensiveProductParams,IFindExpensiveProductResult>(findExpensiveProductIR);


