// module.exports = (sequelize, DataTypes) => {
//   const DiagnosisSickLeave = sequelize.define(
//     "diagnosis_sick_Leave",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       diagnosis_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "diagnoses",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE",
//       },

//       sick_leave_note_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "sick_leave_notes",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE",
//       },
//     },
//     {
//       timestamps: false,
//       freezeTableName: true,
//       indexes: [
//         {
//           name: "diagnosis_sick_leave_diagnosis_id_sick_leave_note_id_uq",
//           unique: true,
//           fields: ["diagnosis_id", "sick_leave_note_id"],
//         },
//       ],
//     }
//   );
//   DiagnosisSickLeave.sync({ alter: false, force: false });
//   return DiagnosisSickLeave;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class DiagnosisSickLeave extends Model<
  InferAttributes<DiagnosisSickLeave>,
  InferCreationAttributes<DiagnosisSickLeave>
> {
  declare id: CreationOptional<number>;
  declare diagnosis_id: number;
  declare sick_leave_note_id?: CreationOptional<number>;
}

DiagnosisSickLeave.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    diagnosis_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "diagnoses",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    sick_leave_note_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "sick_leave_notes",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "diagnosis_sick_leave",
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "diagnosis_sick_leave_diagnosis_id_sick_leave_note_id_uq",
        unique: true,
        fields: ["diagnosis_id", "sick_leave_note_id"],
      },
    ],
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// DiagnosisSickLeave.sync({ alter: false });

export default DiagnosisSickLeave;
