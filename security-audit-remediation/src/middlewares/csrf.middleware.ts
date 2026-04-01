import { Request, Response, NextFunction } from "express"
import { getSessionFromRequest } from "../services/session.service"
import { renderPage } from "../utils/page"

export function verifyCsrfMiddleware(req: Request, res: Response, next: NextFunction) {
    const session = getSessionFromRequest(req.headers.cookie)
    const csrfToken = typeof req.body.csrfToken === "string" ? req.body.csrfToken : ""

    if (!session || csrfToken !== session.csrfToken) {
        res.status(403).send(renderPage("CSRF check failed", "<p>Request blocked by CSRF protection.</p>"))
        return
    }

    next()
}
