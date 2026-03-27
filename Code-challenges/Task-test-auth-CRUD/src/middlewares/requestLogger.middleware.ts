import type { Request,Response,NextFunction } from "express";
import { logger } from "../logger";

export function requestLogger(req:Request,res:Response,next:NextFunction){

  const start = Date.now()

  res.on("finish",()=>{
    const duration = Date.now() - start;

    logger.info("Request completed",{
      method:req.method,
      status:res.statusCode,
      correlationId:req.headers['x-correlation-id'],
      duration
    })
  })
  next();
}