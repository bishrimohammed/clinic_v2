import sequelize from "../db";

const dbLoader = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to the database.");
      sequelize.sync({ alter: false });
    })
    .catch((err: Error) => {
      console.log("Error: " + err.message);
    });
};

export default dbLoader;
