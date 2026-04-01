import { Request, Response, NextFunction } from "express"
import { renderPage } from "../utils/page"

export function notFoundMiddleware(_req: Request, res: Response) {
    res.status(404).send(renderPage("Not found", "<p>Route not found.</p>"))
}

export function errorMiddleware(error: unknown, _req: Request, res: Response, _next: NextFunction) {
    console.error(error)
    res.status(500).send(renderPage("Server error", "<p>An unexpected error occurred.</p>"))
}
