// module.exports = (sequelize, DataTypes) => {
//   const PastMedicalHistory = sequelize.define(
//     "past_medical_history",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       patient_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       medical_condition: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       treatment: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       created_by: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     },
//     {
//       hooks: {
//         afterCreate: async (pastMedicalHistory, options) => {
//           await sequelize.models.past_medical_history_audit.create({
//             pastMedicalHistory_id: pastMedicalHistory.id,
//             patient_id: pastMedicalHistory.patient_id,
//             medical_condition: pastMedicalHistory.medical_condition,
//             treatment: pastMedicalHistory.treatment,
//             created_by: pastMedicalHistory.created_by,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (pastMedicalHistory, options) => {
//           const previousValue = pastMedicalHistory._previousDataValues;
//           await sequelize.models.past_medical_history_audit.create({
//             pastMedicalHistory_id: previousValue.id,
//             patient_id: previousValue.patient_id,
//             medical_condition: previousValue.medical_condition,
//             treatment: previousValue.treatment,
//             created_by: pastMedicalHistory.created_by,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (pastMedicalHistory, options) => {
//           await sequelize.models.past_medical_history_audit.create({
//             pastMedicalHistory_id: pastMedicalHistory.id,
//             patient_id: pastMedicalHistory.patient_id,
//             medical_condition: pastMedicalHistory.medical_condition,
//             treatment: pastMedicalHistory.treatment,
//             created_by: pastMedicalHistory.created_by,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   PastMedicalHistory.sync({ alter: false });
//   return PastMedicalHistory;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path
import Patient from "../Patient";

class PastMedicalHistory extends Model<
  InferAttributes<PastMedicalHistory>,
  InferCreationAttributes<PastMedicalHistory>
> {
  declare id: CreationOptional<number>;
  declare patient_id: ForeignKey<Patient["id"]>;
  declare medical_condition: string;
  declare treatment: string;
  declare created_by: number;
  declare deletedAt?: Date | null;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

PastMedicalHistory.init(
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
    medical_condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    treatment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "past_medical_history",
    tableName: "past_medical_histories",
    paranoid: true,
    timestamps: true,
    // hooks: {
    //   afterCreate: async (pastMedicalHistory, options) => {
    //     await sequelize.models.past_medical_history_audit.create({
    //       pastMedicalHistory_id: pastMedicalHistory.id,
    //       patient_id: pastMedicalHistory.patient_id,
    //       medical_condition: pastMedicalHistory.medical_condition,
    //       treatment: pastMedicalHistory.treatment,
    //       created_by: pastMedicalHistory.created_by,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeUpdate: async (pastMedicalHistory, options) => {
    //     const previousValue = pastMedicalHistory._previousDataValues;
    //     await sequelize.models.past_medical_history_audit.create({
    //       pastMedicalHistory_id: previousValue.id,
    //       patient_id: previousValue.patient_id,
    //       medical_condition: previousValue.medical_condition,
    //       treatment: previousValue.treatment,
    //       created_by: previousValue.created_by,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeDestroy: async (pastMedicalHistory, options) => {
    //     await sequelize.models.past_medical_history_audit.create({
    //       pastMedicalHistory_id: pastMedicalHistory.id,
    //       patient_id: pastMedicalHistory.patient_id,
    //       medical_condition: pastMedicalHistory.medical_condition,
    //       treatment: pastMedicalHistory.treatment,
    //       created_by: pastMedicalHistory.created_by,
    //       operation_type: "D",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    // },
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// PastMedicalHistory.sync({ alter: false });

export default PastMedicalHistory;
