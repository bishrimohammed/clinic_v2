import { Application } from "express";
import dbLoader from "./db";
import expressLoader from "./express";
require("dotenv").config();
const loaders = async (app: Application) => {
  await dbLoader();

  // logger.info('Mongoose initiated.');

  await expressLoader(app);

  // logger.info('Express app initiated.');
};

export default loaders;
