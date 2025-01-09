import { Application } from "express";
import dbLoader from "./db";
import expressLoader from "./express";
require("dotenv").config();
const loaders = async (app: Application) => {
  try {
    await dbLoader();
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: " + error.message);
    }
    console.log("Database can't connect");

    process.exit(1);
  }
  // logger.info('Mongoose initiated.');

  await expressLoader(app);

  // logger.info('Express app initiated.');
};

export default loaders;
