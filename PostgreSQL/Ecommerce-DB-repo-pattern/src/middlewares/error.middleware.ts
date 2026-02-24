import { Request, Response, NextFunction } from 'express';
 
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('[Server Error]:', err);
 
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
}