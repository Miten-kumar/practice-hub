import {getAllUser,getUserById,adduser} from "../Controllers/userController"
import { Router } from "express"
import { authenticate } from "../middlewares/middlewares"

export const router = Router()

router.get('/',getAllUser)
router.get('/:id',getUserById)
router.post('/add',authenticate,adduser)


// export default router