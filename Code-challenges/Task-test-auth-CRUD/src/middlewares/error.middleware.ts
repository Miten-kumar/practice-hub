import type { Request,Response,NextFunction } from "express";
import { ApiError } from "../utils/errorHelper";

export function errorHandler(error:any,req:Request,res:Response,next:NextFunction){
  if(error instanceof ApiError){
    return res
        .status(error.status)
        .json({
          error:{
            code:error.code,
            message:error.message
          }
        })
  }
  if (!(error instanceof ApiError)) {
  return res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Something went wrong"
    }
  });
}
} 