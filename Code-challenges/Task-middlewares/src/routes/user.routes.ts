import express from 'express';
import  { validateSchema } from '../middlewares/validation';
import { userRegistrationSchema, userLoginSchema } from '../schemas/user.schema';
import { registerUser,loginUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/register', validateSchema(userRegistrationSchema), registerUser);
userRouter.post('/login', validateSchema(userLoginSchema), loginUser);

export default userRouter;