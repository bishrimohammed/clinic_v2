// module.exports = (sequelize, DataTypes) => {
//   const VitalResult = sequelize.define(
//     "vital_result",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       vital_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       vitalSignField_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       result: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       deletedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: null,
//       },
//     },
//     {
//       paranoid: true,

//       freezeTableName: true,
//       timestamps: false,
//       tableName: "vital_result",
//     }
//   );
//   VitalResult.sync({ alter: false, force: false });
//   return VitalResult;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class VitalResult extends Model<
  InferAttributes<VitalResult>,
  InferCreationAttributes<VitalResult>
> {
  declare id: CreationOptional<number>;
  declare vital_id: number;
  declare vitalSignField_id: number;
  declare result: string;
  declare deletedAt?: CreationOptional<Date>;
}

VitalResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    vital_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vitalSignField_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "vital_result",
    paranoid: true, // Enables soft deletes
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    timestamps: false, // No automatic timestamps
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// VitalResult.sync({ alter: false });

export default VitalResult;
