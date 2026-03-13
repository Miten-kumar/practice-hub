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
    text: `INSERT INTO "users" 
    ("email", "first_name", "last_name", "phone_number", "age", "gender", "password") 
VALUES 
    ('richard.lopez584@example.com', 'Richard', 'Lopez', '+147923600', 69, 'male', 'hashed_pwd_1'),
    ('patricia.jones772@testmail.org', 'Patricia', 'Jones', '+139978802', 73, 'female', 'hashed_pwd_2'),
    ('mary.hernandez337@testmail.org', 'Mary', 'Hernandez', '+131888049', 74, 'female', 'hashed_pwd_3'),
    ('richard.taylor733@testmail.org', 'Richard', 'Taylor', '+180240707', 17, 'other', 'hashed_pwd_4'),
    ('thomas.martin465@devhub.io', 'Thomas', 'Martin', '+165332762', 35, 'other', 'hashed_pwd_5'),
    ('joseph.davis842@devhub.io', 'Joseph', 'Davis', '+126234464', 55, 'female', 'hashed_pwd_6'),
    ('william.moore232@testmail.org', 'William', 'Moore', '+124373236', 75, 'female', 'hashed_pwd_7'),
    ('robert.martin822@example.com', 'Robert', 'Martin', '+156059325', 37, 'other', 'hashed_pwd_8'),
    ('elizabeth.taylor258@webmail.net', 'Elizabeth', 'Taylor', '+130820901', 59, 'female', 'hashed_pwd_9'),
    ('david.jackson612@example.com', 'David', 'Jackson', '+158439913', 16, 'female', 'hashed_pwd_10'),
    ('jessica.anderson218@testmail.org', 'Jessica', 'Anderson', '+136356459', 55, 'female', 'hashed_pwd_11'),
    ('jennifer.brown830@devhub.io', 'Jennifer', 'Brown', '+135516769', 12, 'male', 'hashed_pwd_12'),
    ('sarah.miller825@webmail.net', 'Sarah', 'Miller', '+123363769', 29, 'female', 'hashed_pwd_13'),
    ('john.smith468@example.com', 'John', 'Smith', '+153076018', 58, 'other', 'hashed_pwd_14'),
    ('james.wilson159@webmail.net', 'James', 'Wilson', '+155989883', 27, 'male', 'hashed_pwd_15');
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
    text:`TRUNCATE TABLE users`
  })
};

