// db/index.ts
// import { Sequelize } from "sequelize";
// import dbConfig from "../config/dbConfig";

// const sequelize = new Sequelize(
//   dbConfig.DB!,
//   dbConfig.USER!,
//   dbConfig?.PASSWORD || "",
//   {
//     host: dbConfig.HOST,
//     port: 3306,
//     dialect: dbConfig.dialect,
//     logging: true,
//   }
// );

// export default sequelize;

// db/index.ts
import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig";

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize(
        dbConfig.DB!,
        dbConfig.USER!,
        dbConfig?.PASSWORD || "",
        {
          host: dbConfig.HOST,
          port: 3306,
          dialect: dbConfig.dialect,
          logging: false,
        }
      );
    }
    return Database.instance;
  }
}

export default Database.getInstance();
