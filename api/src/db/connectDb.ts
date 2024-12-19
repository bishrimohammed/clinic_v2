import sequelize from ".";

export const connectDb = async () => {
  const connection = sequelize.authenticate();
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to the database.");
    })
    .catch((err: Error) => {
      console.log("Error: " + err.message);
    });
};
