import type { Request,Response,NextFunction } from "express";
import { items } from "../models/item";
import type { Item } from "../models/item"

export interface TypedRequestBody<T> extends Request {
    body: T     
}

// export interface TypedResonse<T> extends Response {
//     json: Send<T, this>;
// }

const createItem = (req:TypedRequestBody<{id:number,name:string}>,res:Response,next:NextFunction) => {

    try{
        const {name}  = req.body;
        const newItem : Item = {id:Date.now(),name};
        items.push(newItem);
        res.status(201).json(newItem)
    }
    catch(error){
        next(error);
    }
};

export default createItem;
