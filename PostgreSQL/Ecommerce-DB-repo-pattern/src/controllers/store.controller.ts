import { Request, Response } from 'express';
import { StoreService } from '../services/store.service';
import { catchAsync } from '../utils/catchAsync';
 
const storeService = new StoreService();
 
export const getUserInfo = catchAsync(async (req: Request, res: Response) => {
 
  const userId = parseInt(req.params.id as string, 10);
 
  const result = await storeService.fetchUserDetails(userId);

  res.status(200).json({
    success: true,
    data: result
  });
});
 
export const getExpensiveProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await storeService.fetchTopProduct();
 
  res.status(200).json({
    success: true,
    data: result
  });
});