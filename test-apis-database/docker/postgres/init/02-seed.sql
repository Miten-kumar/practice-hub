INSERT INTO users (email, password)
VALUES ('test@test.com', '$2b$10$wMi7hpucnGFuTPK4GBij1.8q8yXxmAySU2ZJkn4jD8DHDLHx9BVM2')
ON CONFLICT (email) DO NOTHING;

INSERT INTO posts (title, content, user_id)
SELECT
  'Welcome Post',
  'This is seeded dummy data from the PostgreSQL init SQL.',
  users.id
FROM users
WHERE users.email = 'test@test.com'
  AND NOT EXISTS (
    SELECT 1
    FROM posts
    WHERE posts.title = 'Welcome Post'
      AND posts.user_id = users.id
  );
