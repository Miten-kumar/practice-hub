import { Request, Response } from "express";
import { Send } from 'express-serve-static-core';

export type User = BaseParams & UserDetails;


export interface BaseParams{
  id: number;
}

export type UserRole = "admin" | "user";
export interface UserDetails {
  name: string;
  role: UserRole ;
  age: number;
}
type ReqValidationError = { type: "request validation"; message: string };
type ResValidationError = { type: "response validation"; message: string };
type NetworkError = { type: "network"; message: string };

type Errors = ReqValidationError | NetworkError | ResValidationError;

interface ErrorResponse{
  data :Errors
  message :"error"
}


interface SuccessResponse<T>{
  data :T[]|T
  message :"success"
}


export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;


export interface Empty {

}


// export interface TypedResponseBody<ResBody> extends Response{
// json:Send<ResBody, this>
// }


export interface TypedRequestbodyUser<T> extends Request{
  body :T;
}

export interface TypedResponse<ResBody> extends Response {
   json: Send<ResBody, this>;
}