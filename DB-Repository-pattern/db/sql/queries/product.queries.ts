/** Types generated for queries found in "db/sql/product.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetProducts' parameters type */
export type IGetProductsParams = void;

/** 'GetProducts' return type */
export interface IGetProductsResult {
  price: string;
  prod_description: string | null;
  prod_id: number;
  prod_name: string;
}

/** 'GetProducts' query type */
export interface IGetProductsQuery {
  params: IGetProductsParams;
  result: IGetProductsResult;
}

const getProductsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT prod_id, prod_name, prod_description, price FROM products"};

/**
 * Query generated from SQL:
 * ```
 * SELECT prod_id, prod_name, prod_description, price FROM products
 * ```
 */
export const getProducts = new PreparedQuery<IGetProductsParams,IGetProductsResult>(getProductsIR);


