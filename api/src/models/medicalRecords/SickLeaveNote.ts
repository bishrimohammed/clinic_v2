// module.exports = (sequelize, DataTypes) => {
//   const SickLeaveNote = sequelize.define("sick_leave_note", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     patient_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     medical_record_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     start_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//     },
//     end_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//     },
//     doctor_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     date_of_examination: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     sick_leave_day: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//   });
//   SickLeaveNote.sync({ alter: false, force: false });
//   return SickLeaveNote;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class SickLeaveNote extends Model<
  InferAttributes<SickLeaveNote>,
  InferCreationAttributes<SickLeaveNote>
> {
  declare id: CreationOptional<number>;
  declare patient_id: number;
  declare medical_record_id: number;
  declare date: Date; // DATEONLY corresponds to Date in TypeScript
  declare start_date?: Date; // Optional field
  declare end_date?: Date; // Optional field
  declare doctor_id: number;
  declare date_of_examination: Date; // DATEONLY corresponds to Date in TypeScript
  declare sick_leave_day?: number; // Optional field
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SickLeaveNote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_of_examination: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sick_leave_day: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    modelName: "sick_leave_note",
    tableName: "sick_leave_notes",
    timestamps: true,
    // Optionally add hooks or other configurations here
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// SickLeaveNote.sync({ alter: false });

export default SickLeaveNote;
