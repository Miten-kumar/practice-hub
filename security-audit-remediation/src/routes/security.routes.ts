import { Router } from "express"
import { saveCommentController } from "../controllers/comment.controller"
import { home, search } from "../controllers/security.controller"
import { verifyCsrfMiddleware } from "../middlewares/csrf.middleware"

const router = Router()

router.get("/", home)
router.get("/search", search)
router.post("/comment", verifyCsrfMiddleware, saveCommentController)

export { router as securityRoutes }
