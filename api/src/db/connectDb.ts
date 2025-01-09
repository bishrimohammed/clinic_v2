import sequelize from ".";

export const connectDb = async () => {
  sequelize
    .authenticate()
    .then((se) => {
      console.log("Connected to the database.");
    })
    .catch((err: Error) => {
      console.log("Error: " + err.message);
    });
};
