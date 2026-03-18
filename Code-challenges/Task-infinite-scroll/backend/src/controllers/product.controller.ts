import type {Request,Response} from 'express'
import { ProductService } from '../services/product.service'

export class ProductController {

  async getAllProducts(req:Request,res:Response){
    try{

      const {cursor,limit} = req.query;
      const parsedLimit = Math.min(Number(limit) || 10, 50);      

      const productService = new ProductService();
      
      const result = await productService.getProducts({
        cursor : cursor as string | undefined,
        limit:parsedLimit,
      });
      
      res
        .status(200)
        .json({
          success:true,
          message:'products retrieved',
          ...result,
        })
    }
    catch(error:any){
      res
        .status(400)
        .json({error:error.message})
    }
  }
}
