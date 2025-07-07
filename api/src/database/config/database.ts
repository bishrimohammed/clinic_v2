import dbConfig from "../../config/dbConfig";

import { Options } from "sequelize";

const { dialect, pool, DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } =
  dbConfig;

const config: Options = {
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_NAME,
  dialect,
  pool,
};

export default config;
