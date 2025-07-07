import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig";

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize(
        dbConfig.DB_NAME!,
        dbConfig.DB_USER!,
        dbConfig?.DB_PASSWORD || "",
        {
          host: dbConfig.DB_HOST,
          port: 3306,
          dialect: dbConfig.dialect,
          logging: true,
        }
      );
    }
    return Database.instance;
  }
}

export default Database.getInstance();
