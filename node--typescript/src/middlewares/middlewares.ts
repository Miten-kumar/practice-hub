import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
  type RequestHandler,
} from "express";

export const middleware: RequestHandler = (req: Request, res: Response) => {
  res.send("Hello World!");
  console.log("Response sent");
};

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).send({
    status: statusCode,
    message: message,
  });
};

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`LOGGED: ${req.method} request to ${req.url}`);
  next();
};


export const authenticate = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers['authorization'];
  if (!token || token !== 'securetoken') {
    console.log("user Unauthorized");
    
    return res.status(401).send('Unauthorized');
  }
  next();
};
