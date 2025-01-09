// module.exports = (sequelize, DataTypes) => {
//   const MedicalRecord = sequelize.define(
//     "medicalrecord",
//     {
//       patient_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },

//       status: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: true,
//       },
//     },
//     {
//       hooks: {
//         afterCreate: async (record, options) => {
//           await sequelize.models.medicalrecords_audit.create({
//             medicalRecord_id: record.id,
//             patient_id: record.id,
//             status: record.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (record, options) => {
//           const previousValue = record._previousDataValues;
//           await sequelize.models.medicalrecords_audit.create({
//             medicalRecord_id: previousValue.id,
//             patient_id: previousValue.patient_id,
//             status: previousValue.status,
//             old_status: previousValue.status,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   MedicalRecord.sync({ force: false, alter: false });
//   return MedicalRecord;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class MedicalRecord extends Model<
  InferAttributes<MedicalRecord>,
  InferCreationAttributes<MedicalRecord>
> {
  declare id: CreationOptional<number>;
  declare patient_id: number;
  declare status?: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

MedicalRecord.init(
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
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    modelName: "medicalrecord",
    tableName: "medicalrecords",
    timestamps: true, // Enable timestamps for createdAt and updatedAt
    // hooks: {
    //   afterCreate: async (record, options) => {
    //     await sequelize.models.medicalrecords_audit.create({
    //       medicalRecord_id: record.id,
    //       patient_id: record.patient_id,
    //       status: record.status,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeUpdate: async (record, options) => {
    //     const previousValue = record._previousDataValues;
    //     await sequelize.models.medicalrecords_audit.create({
    //       medicalRecord_id: previousValue.id,
    //       patient_id: previousValue.patient_id,
    //       status: previousValue.status,
    //       old_status: previousValue.status,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    // },
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// MedicalRecord.sync({ force: false, alter: false });

export default MedicalRecord;
