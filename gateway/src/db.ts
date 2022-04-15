import { createConnection } from "mysql";

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB, MYSQL_HOST } = process.env;

export const db = createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  supportBigNumbers: true,
});
