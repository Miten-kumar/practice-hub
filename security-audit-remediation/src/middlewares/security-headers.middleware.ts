import { Request, Response, NextFunction } from "express"

export function securityHeadersMiddleware(_req: Request, res: Response, next: NextFunction) {
    res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'; form-action 'self'; base-uri 'self'; frame-ancestors 'none'")
    res.setHeader("Referrer-Policy", "no-referrer")
    res.setHeader("X-Content-Type-Options", "nosniff")
    res.setHeader("X-Frame-Options", "DENY")
    res.setHeader("Permissions-Policy", "camera=(), geolocation=(), microphone=()")
    res.setHeader("Cache-Control", "no-store")
    next()
}
