/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  (pgm.db.query({
    text: `INSERT INTO "tasks" ("name") VALUES 
    ('Complete initial project setup'),
    ('Design database schema for users'),
    ('Implement JWT authentication'),
    ('Create user registration API'),
    ('Write unit tests for Auth service'),
    ('Configure TypeORM data source'),
    ('Set up PostgreSQL docker container'),
    ('Develop task management dashboard'),
    ('Integrate frontend with backend APIs'),
    ('Optimize database queries for performance'),
    ('Implement role-based access control'),
    ('Deploy application to staging'),
    ('Configure CI/CD pipeline'),
    ('Conduct code review for PR #102'),
    ('Fix bug in password reset flow'),
    ('Update API documentation (Swagger)'),
    ('Research Redis for session caching'),
    ('Migrate legacy data to new schema'),
    ('Set up error logging with Sentry'),
    ('Create recurring billing module'),
    ('Add search functionality to tasks'),
    ('Implement file upload for attachments'),
    ('Refactor utility functions'),
    ('Optimize frontend asset loading'),
    ('Conduct security audit of API'),
    ('Set up Prometheus for monitoring'),
    ('Integrate Stripe for payments'),
    ('Design mobile-responsive UI'),
    ('Write integration tests for Tasks'),
    ('Configure Nginx as reverse proxy'),
    ('Setup AWS S3 bucket for storage'),
    ('Implement soft delete for records'),
    ('Add multi-language support (i18n)'),
    ('Create analytics reporting tool'),
    ('Upgrade Node.js to latest LTS'),
    ('Fix CSS layout issues on Safari'),
    ('Implement real-time notifications'),
    ('Setup automated database backups'),
    ('Review third-party dependencies'),
    ('Optimize images for production'),
    ('Create onboarding flow for new users'),
    ('Implement dark mode toggle'),
    ('Setup Webpack for custom bundling'),
    ('Fix memory leak in background jobs'),
    ('Add rate limiting to public APIs'),
    ('Document deployment process'),
    ('Implement email verification logic'),
    ('Conduct user acceptance testing'),
    ('Set up staging database environment'),
    ('Finalize v1.0 release notes');

`,
  })
)}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.db.query({
    text:`TRUNCATE TABLE tasks`
  })
};