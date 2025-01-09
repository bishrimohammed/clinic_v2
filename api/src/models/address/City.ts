// module.exports = (sequelize, DataTypes) => {
//   const City = sequelize.define("city", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     region_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       // references: {
//       //   model: "Region",
//       //   key: "id",
//       // },
//     },
//   });
//   City.associate = function (models) {
//     City.belongsTo(models.Region, {
//       foreignKey: "region_id",
//     });
//   };
//   return City;
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
import Region from "./Region";

class City extends Model<InferAttributes<City>, InferCreationAttributes<City>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare region_id: number;
}

City.init(
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
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: "SubCity",
      //   key: "id",
      // },
    },
  },
  { sequelize }
);
City.belongsTo(Region, {
  foreignKey: "region_id",
  as: "region",
});
export default City;
