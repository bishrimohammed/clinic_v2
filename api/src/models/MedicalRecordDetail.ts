// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const MedicalRecordDetail = sequelize.define(
//     "medicalrecorddetail",
//     {
//       medicalRecord_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "medicalrecords",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       doctor_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       chief_complaint: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       plan: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       assassement: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       hpi: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       notes: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: true,
//       },
//       deletedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: null,
//       },
//     },
//     {
//       paranoid: true,

//       hooks: {
//         afterCreate: async (record, options) => {
//           await sequelize.models.medicalrecorddetails_audit.create({
//             medicalRecordDetail_id: record.id,
//             medicalRecord_id: record.medicalRecord_id,
//             doctor_id: record.doctor_id,
//             chief_complaint: record.chief_complaint,
//             plan: record.plan,
//             assassement: record.assassement,
//             hpi: record.hpi,
//             notes: record.notes,
//             status: record.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (record, options) => {
//           const previousValue = record._previousDataValues;
//           await sequelize.models.medicalrecorddetails_audit.create({
//             medicalRecordDetail_id: previousValue.id,
//             medicalRecord_id: previousValue.medicalRecord_id,
//             doctor_id: previousValue.doctor_id,
//             chief_complaint: previousValue.chief_complaint,
//             plan: previousValue.plan,
//             assassement: previousValue.assassement,
//             hpi: previousValue.hpi,
//             notes: previousValue.notes,
//             status: previousValue.status,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   MedicalRecordDetail.sync({ force: false, alter: false });
//   return MedicalRecordDetail;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class MedicalRecordDetail extends Model<
  InferAttributes<MedicalRecordDetail>,
  InferCreationAttributes<MedicalRecordDetail>
> {
  declare id: CreationOptional<number>;
  declare medicalRecord_id: number;
  declare doctor_id: number;
  declare chief_complaint: string;
  declare plan?: string | null;
  declare assassement?: string | null;
  declare hpi: string;
  declare notes?: string | null;
  declare status?: boolean;
  declare deletedAt?: CreationOptional<Date | null>;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

MedicalRecordDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medicalRecord_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "medicalrecords",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chief_complaint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assassement: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hpi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
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
    modelName: "medicalrecorddetail",
    tableName: "medicalrecorddetails",
    paranoid: true, // Enable soft deletes
    timestamps: true, // Enable timestamps for createdAt and updatedAt
    // hooks: {
    //   afterCreate: async (record, options) => {
    //     await sequelize.models.medicalrecorddetails_audit.create({
    //       medicalRecordDetail_id: record.id,
    //       medicalRecord_id: record.medicalRecord_id,
    //       doctor_id: record.doctor_id,
    //       chief_complaint: record.chief_complaint,
    //       plan: record.plan,
    //       assassement: record.assassement,
    //       hpi: record.hpi,
    //       notes: record.notes,
    //       status: record.status,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeUpdate: async (record, options) => {
    //     const previousValue = record._previousDataValues;
    //     await sequelize.models.medicalrecorddetails_audit.create({
    //       medicalRecordDetail_id: previousValue.id,
    //       medicalRecord_id: previousValue.medicalRecord_id,
    //       doctor_id: previousValue.doctor_id,
    //       chief_complaint: previousValue.chief_complaint,
    //       plan: previousValue.plan,
    //       assassement: previousValue.assassement,
    //       hpi: previousValue.hpi,
    //       notes: previousValue.notes,
    //       status: previousValue.status,
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
// MedicalRecordDetail.sync({ force: false, alter: false });

export default MedicalRecordDetail;
