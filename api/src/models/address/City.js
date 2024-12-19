// const { DataTypes } = require("sequelize");
// const sequelize = require("../../config/database.js");
// const SubCity = require("./SubCity.js");
// const Region = require("./Region.js");

const { sequelize } = require("..");

// const City = sequelize.define("City", {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   region_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     // references: {
//     //   model: "Region",
//     //   key: "id",
//     // },
//   },
// });
// // City.associate = function (models) {
// //     City.belongsTo(models.Region, {
// //         foreignKey: "region_id"
// //     });
// // }
// City.sync({ alter: true });
// City.hasMany(SubCity, {
//   foreignKey: "city_id",
// });
// // City.belongsTo(Region, {
// //   // foreignKey: "region_id",
// // });

// module.exports = City;

module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define("city", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: "Region",
      //   key: "id",
      // },
    },
  });
  City.associate = function (models) {
    City.belongsTo(models.Region, {
      foreignKey: "region_id",
    });
  };
  return City;
};
