// const { DataTypes } = require("sequelize");
// const sequelize = require("../../config/database.js");
// const City = require("./City.js");
// const Woreda = require("./Woreda.js");

// const { sequelize } = require("..");

// module.exports = (sequelize, DataTypes) => {
//   const SubCity = sequelize.define("subcity", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     Subcity_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     city_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   });

//   return SubCity;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db"; // Ensure the correct path
import City from "./City";

class SubCity extends Model<
  InferAttributes<SubCity>,
  InferCreationAttributes<SubCity>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare city_id: number;
}

SubCity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize }
);
SubCity.belongsTo(City, {
  foreignKey: "city_id",
  as: "city",
});
export default SubCity;
