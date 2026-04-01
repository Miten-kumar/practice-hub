# Security Checklist

- Use parameterized queries or ORM query parameters for all database reads and writes
- Validate and length-limit all request input
- Escape untrusted content before inserting it into HTML responses
- Protect every state-changing browser form with a CSRF token
- Set `HttpOnly` and `SameSite` on session cookies
- Add baseline security headers to every response
- Avoid hard-coded secrets and move configuration to environment variables
- Replace `synchronize: true` with migrations before production
- Run `npm audit` before delivery
- Avoid verbose error messages in HTTP responses
