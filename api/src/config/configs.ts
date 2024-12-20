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
    SECRET: process.env.JWT_SECRET,
    EXPIRES: "1d",
  },
};

export default configs;
