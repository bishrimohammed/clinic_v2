// const { sequelize } = require("..");

// module.exports = (sequelize, DataTypes) => {
//   const physicalExamination = sequelize.define(
//     "physical_examination",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       medicalRecordDetail_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "medicalrecorddetails",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       // physical_ExaminationField_id: {
//       //   type: DataTypes.INTEGER,
//       //   allowNull: false,
//       // },
//       progressNote_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "progress_notes",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       // value: {
//       //   type: DataTypes.STRING,
//       //   allowNull: false,
//       // },
//       examiner_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       deletedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: null,
//       },
//     },
//     {
//       hooks: {
//         afterCreate: async (physicalExamination, options) => {
//           await sequelize.models.physical_examination_audit.create({
//             physicalExamination_id: physicalExamination.id,
//             medicalRecordDetail_id: physicalExamination.medicalRecordDetail_id,
//             // physical_ExaminationField_id: physicalExamination.physical_ExaminationField_id,
//             progressNote_id: physicalExamination.progressNote_id,
//             // value: physicalExamination.value,
//             examiner_id: physicalExamination.examiner_id,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (physicalExamination, options) => {
//           const previousValue = physicalExamination._previousDataValues;
//           await sequelize.models.physical_examination_audit.create({
//             physicalExamination_id: previousValue.id,
//             medicalRecordDetail_id: previousValue.medicalRecordDetail_id,
//             // physical_ExaminationField_id: previousValue.physical_ExaminationField_id,
//             progressNote_id: previousValue.progressNote_id,
//             // value: previousValue.value,
//             examiner_id: previousValue.examiner_id,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//       paranoid: true,
//     }
//   );
//   physicalExamination.sync({ alter: false, force: false });
//   return physicalExamination;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class PhysicalExamination extends Model<
  InferAttributes<PhysicalExamination>,
  InferCreationAttributes<PhysicalExamination>
> {
  declare id: CreationOptional<number>;
  declare medicalRecordDetail_id: number;
  declare progressNote_id?: number;
  declare examiner_id: number;
  declare deletedAt?: CreationOptional<Date>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PhysicalExamination.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medicalRecordDetail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "medicalrecorddetails",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    progressNote_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "progress_notes",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    examiner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "physical_examination",
    tableName: "physical_examinations",
    paranoid: true, // Enables soft deletes
    // hooks: {
    //   afterCreate: async (physicalExamination, options) => {
    //     await sequelize.models.physical_examination_audit.create({
    //       physicalExamination_id: physicalExamination.id,
    //       medicalRecordDetail_id: physicalExamination.medicalRecordDetail_id,
    //       progressNote_id: physicalExamination.progressNote_id,
    //       examiner_id: physicalExamination.examiner_id,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeUpdate: async (physicalExamination, options) => {
    //     const previousValue = physicalExamination._previousDataValues;
    //     await sequelize.models.physical_examination_audit.create({
    //       physicalExamination_id: previousValue.id,
    //       medicalRecordDetail_id: previousValue.medicalRecordDetail_id,
    //       progressNote_id: previousValue.progressNote_id,
    //       examiner_id: previousValue.examiner_id,
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
// PhysicalExamination.sync({ alter: false });

export default PhysicalExamination;
