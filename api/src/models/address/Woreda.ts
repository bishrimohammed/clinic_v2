// const { sequelize } = require("..");

// module.exports = (sequelize, DataTypes) => {
//   const Woreda = sequelize.define("woreda", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     subCity_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       // references: {
//       //   model: "SubCity",
//       //   key: "id",
//       // },
//     },
//   });
//   return Woreda;
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

class Woreda extends Model<
  InferAttributes<Woreda>,
  InferCreationAttributes<Woreda>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare subCity_id: number;
}

Woreda.init(
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
    subCity_id: {
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

export default Woreda;
