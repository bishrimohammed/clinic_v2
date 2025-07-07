import dotenv from "dotenv";
dotenv.config();

interface DbConfig {
  DB_HOST: string | undefined;
  DB_USER: string | undefined;
  DB_NAME: string | undefined;
  DB_PASSWORD?: string;
  DB_PORT: number;
  dialect: "mysql"; // You can expand this to include other dialects if needed

  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}
const config: DbConfig = {
  DB_HOST: process.env.DATABASE_HOST,
  DB_USER: process.env.DATABASE_USER,
  DB_NAME: process.env.DATABASE_NAME,
  DB_PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
};
export default config;
