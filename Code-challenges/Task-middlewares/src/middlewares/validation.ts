import { Request,Response,NextFunction } from "express";
import {z,ZodError} from 'zod';

export function validateSchema(schema: z.ZodObject<any, any>){
    return (req: Request,res:Response,next:NextFunction)=>{
        try{
            schema.parse(req.body);
            next();
        }
        catch(err){
            if( err instanceof ZodError){
                const errMessages = err.issues.map((issue:any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`
                }))
                res.status(400).json({ error: 'Invalid data', details: errMessages });
            }
            else{
                res.status(500).json({error: 'internal server error'})
            }
        }
       
    }
}