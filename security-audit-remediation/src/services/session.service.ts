import crypto from "node:crypto"
import { Response } from "express"
import { sessions } from "../repositories/session.repository"
import { Session } from "../types/session"

export function parseCookies(cookieHeader?: string): Record<string, string> {
    if (!cookieHeader) {
        return {}
    }

    const cookies: Record<string, string> = {}
    const parts = cookieHeader.split(";")

    for (const part of parts) {
        const section = part.trim()
        const equalIndex = section.indexOf("=")

        if (equalIndex === -1) {
            continue
        }

        const key = section.slice(0, equalIndex)
        const value = section.slice(equalIndex + 1)

        cookies[key] = decodeURIComponent(value)
    }

    return cookies
}

export function getSessionFromRequest(cookieHeader?: string): Session | undefined {
    const cookies = parseCookies(cookieHeader)
    const sessionId = cookies.sid

    if (!sessionId) {
        return
    }

    return sessions.get(sessionId)
}

export function createSession(userId: number) {
    const sessionId = crypto.randomUUID()
    const session: Session = {
        userId,
        csrfToken: crypto.randomBytes(24).toString("hex"),
    }

    sessions.set(sessionId, session)

    return sessionId
}

export function setSessionCookie(res: Response, sessionId: string) {
    res.setHeader(
        "Set-Cookie",
        `sid=${encodeURIComponent(sessionId)}; HttpOnly; Path=/; SameSite=Lax`,
    )
}
