import dotenv from "dotenv";
dotenv.config();

interface DbConfig {
  HOST: string | undefined;
  USER: string | undefined;
  DB: string | undefined;
  PASSWORD?: string;
  PORT: number;
  dialect: "mysql"; // You can expand this to include other dialects if needed

  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}
const config: DbConfig = {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USER,
  DB: process.env.DATABASE_NAME,
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
};
export default config;
