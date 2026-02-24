import { Router } from 'express';
import { getUserInfo, getExpensiveProduct } from '../controllers/store.controller';
 
const router = Router();
 
router.get('/users/:id', getUserInfo);
router.get('/products/expensive', getExpensiveProduct);
 
export default router;