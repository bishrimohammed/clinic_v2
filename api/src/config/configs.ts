import { config } from "dotenv";
config();
const configs = {
  NODE_DEV: process.env.NODE_DEV,
  DB: {
    HOST: process.env.DATABASE_USER,
    USER: process.env.DATABASE_USER,
    NAME: process.env.DATABASE_NAME,
  },
  JWT: {
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,

    EXPIRES: "1d",
  },
};

export default configs;
