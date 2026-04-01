import { Request, Response } from "express"
import { getDemoUser, saveComment } from "../services/user.service"
import { renderPage } from "../utils/page"

export async function saveCommentController(req: Request, res: Response) {
    const user = await getDemoUser()

    if (!user) {
        res.status(404).send(renderPage("User not found", "<p>Demo user was not found.</p>"))
        return
    }

    try {
        await saveComment(user, req.body.comment)
        res.redirect("/")
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(renderPage("Validation failed", `<p>${error.message}</p>`))
            return
        }

        throw error
    }
}
