import sequelize from "../db";

const dbLoader = async () => {
  await sequelize.authenticate();
  try {
  } catch (error) {
    // const err : Error = error
    // if (error instanceof Error) {
    //   console.log("Error: " + error.message);
    // }
    // console.log("Database can't connect");
    // process.exit(1);
  }
  // sequelize
  //   .authenticate()
  //   .then(() => {
  //     console.log("Connected to the database.");
  //     sequelize.sync({ alter: false });
  //   })
  //   .catch((err: Error) => {
  //     console.log("Error: " + err.message);
  //     process.exit(1);
  //   });
};

export default dbLoader;
