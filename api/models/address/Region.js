// // const sequelize = require("../../config/sequelize");

const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define("region", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      // unique: true,
    },
  });
  //   Region.associate = function (models) {
  //     Region.hasMany(sequelize.define("City"), { foreignKey: "region_id" });
  //   };
  Region.associate = function (models) {
    Region.hasMany(models.City, { foreignKey: "region_id" });
  };
  return Region;
};
