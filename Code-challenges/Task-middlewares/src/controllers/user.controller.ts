import { Request,Response } from "express";

export const registerUser = (req:Request,res:Response) => {

    res.json({message:'user registerd sucessfully',data:req.body})
}

export const loginUser = (req:Request,res:Response) => {
    res.json({message:'user logged sucessfully',data:req.body})
}