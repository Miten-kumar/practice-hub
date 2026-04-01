# Security Audit Remediation Demo

Minimal Express + TypeORM application with small remediations for:

- SQL injection
- XSS
- CSRF
- Missing security headers

## Run

1. Install dependencies with `npm install`
2. Configure PostgreSQL with `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` if defaults do not match your machine
3. Build with `npm run build`
4. Start with `npm start`

## Routes

- `/` overview page
- `/search?q=ada` parameterized user search
- `/login` demo login
- `/profile` profile page with XSS-safe rendering and CSRF-protected update form

## Notes

- This project intentionally keeps the session store in memory to stay small for the assignment
- `synchronize: true` is acceptable for local demo work but should be replaced with migrations in production
