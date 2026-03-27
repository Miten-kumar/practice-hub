import type { Request,Response,NextFunction } from "express";
import {v4 as uuidv4} from "uuid"

export function correlation(req:Request,res:Response,next:NextFunction){

  const correlationId = uuidv4();

  req.headers['x-correlation-id'] = correlationId;
  
  next();
}