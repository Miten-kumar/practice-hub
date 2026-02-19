import env from "../../env";
const { Pool } = require("pg");
const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: parseInt(env.DB_PORT),
});

export default pool;
