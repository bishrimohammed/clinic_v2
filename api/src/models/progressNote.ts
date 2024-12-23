// module.exports = (sequelize, DataTypes) => {
//   const ProgressNote = sequelize.define("progress_note", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     // patient_id: {
//     //   type: DataTypes.INTEGER,
//     //   allowNull: false,
//     // },
//     doctor_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     medical_record_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     taken_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       // defaultValue: new Date(),
//     },
//     plan: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     problem_list: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     current_management: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });
//   ProgressNote.sync({ alter: false });
//   return ProgressNote;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class ProgressNote extends Model<
  InferAttributes<ProgressNote>,
  InferCreationAttributes<ProgressNote>
> {
  declare id: CreationOptional<number>;
  declare doctor_id: number;
  declare medical_record_id: number;
  declare taken_date: Date;
  declare plan: string;
  declare problem_list: string;
  declare current_management: string;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

ProgressNote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taken_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    plan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    problem_list: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    current_management: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "progress_note",
    tableName: "progress_notes",
    timestamps: true,
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// ProgressNote.sync({ alter: false });

export default ProgressNote;
