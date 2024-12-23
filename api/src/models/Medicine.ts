// module.exports = (sequelize, DataTypes) => {
//   const Medicine = sequelize.define("medicine", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     service_item_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     formulation: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     in_stock: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 0,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true,
//     },
//   });
//   Medicine.sync({ alter: false });
//   return Medicine;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class Medicine extends Model<
  InferAttributes<Medicine>,
  InferCreationAttributes<Medicine>
> {
  declare id: CreationOptional<number>;
  declare service_item_id: number;
  declare formulation?: string | null;
  declare description?: string | null;
  declare in_stock: number;
  declare status: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Medicine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    service_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    formulation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "medicine",
    tableName: "medicines",
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// Medicine.sync({ alter: false });

export default Medicine;
