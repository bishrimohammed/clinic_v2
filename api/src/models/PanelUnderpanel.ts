// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const PanelUnderpanel = sequelize.define("panelunderpanel", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     panel_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     underpanel_id: {
//       type: DataTypes.INTEGER,
//       defaultValue: false,
//     },
//   });
//   PanelUnderpanel.sync({ alter: false, force: false });
//   return PanelUnderpanel;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class PanelUnderpanel extends Model<
  InferAttributes<PanelUnderpanel>,
  InferCreationAttributes<PanelUnderpanel>
> {
  declare id: CreationOptional<number>;
  declare panel_id: number;
  declare underpanel_id: number;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

PanelUnderpanel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    panel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    underpanel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Assuming this should be a number, not a boolean
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
    modelName: "panelunderpanel",
    tableName: "panelunderpanels", // Ensure the correct table name
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// PanelUnderpanel.sync({ alter: false, force: false });

export default PanelUnderpanel;
