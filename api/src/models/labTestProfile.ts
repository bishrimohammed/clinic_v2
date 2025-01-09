// module.exports = (sequelize, DataTypes) => {
//   const labTestProfile = sequelize.define("labtestprofile", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },

//     labTest_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },

//     isPanel: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     isFixed: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   });
//   labTestProfile.sync({ alter: false, force: false });
//   return labTestProfile;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class LabTestProfile extends Model<
  InferAttributes<LabTestProfile>,
  InferCreationAttributes<LabTestProfile>
> {
  declare id: CreationOptional<number>;
  declare labTest_id: number;
  declare isPanel: boolean;
  declare isFixed?: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

LabTestProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    labTest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPanel: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isFixed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: "labtestprofile",
    tableName: "labtestprofiles",
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// LabTestProfile.sync({ alter: false, force: false });

export default LabTestProfile;
