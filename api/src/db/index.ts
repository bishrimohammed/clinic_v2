import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig";
// console.log(dbConfig);

const sequelize = new Sequelize(
  dbConfig.DB!,
  dbConfig.USER!,
  dbConfig?.PASSWORD || "",
  {
    host: dbConfig.HOST,
    port: 3306,
    dialect: dbConfig.dialect,
    logging: true,
  }
);

export default sequelize;
