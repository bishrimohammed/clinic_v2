// // const sequelize = require("../../config/sequelize");

// module.exports = (sequelize, DataTypes) => {
//   const Region = sequelize.define("region", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       required: true,
//       // unique: true,
//     },
//   });

//   Region.associate = function (models) {
//     Region.hasMany(models.City, { foreignKey: "region_id" });
//   };
//   return Region;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db"; // Ensure the correct path

class Region extends Model<
  InferAttributes<Region>,
  InferCreationAttributes<Region>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Region.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

export default Region;
