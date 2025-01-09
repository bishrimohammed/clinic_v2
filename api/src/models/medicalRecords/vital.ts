// vital signs sequilize model
// module.exports = (sequelize, DataTypes) => {
//   const Vital = sequelize.define(
//     "vital",
//     {
//       medicalRecord_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       examiner_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       taken_date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: new Date(),
//       },
//       progressNote_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
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
//         afterCreate: async (vitalSign, options) => {
//           await sequelize.models.vital_signs_audit.create({
//             vitalSign_id: vitalSign.id,
//             medicalRecord_id: vitalSign.medicalRecord_id,
//             examiner_id: vitalSign.examiner_id,
//             taken_date: vitalSign.taken_date,
//             progressNote_id: vitalSign.progressNote_id,
//             // vital_id: vitalSign.vital_id,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (vitalSign, options) => {
//           const previousValue = vitalSign._previousDataValues;
//           await sequelize.models.vital_signs_audit.create({
//             vitalSign_id: previousValue.id,
//             medicalRecord_id: previousValue.medicalRecord_id,
//             examiner_id: previousValue.examiner_id,
//             taken_date: previousValue.taken_date,
//             progressNote_id: previousValue.progressNote_id,
//             // vital_id: previousValue.vital_id,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (vitalSign, options) => {
//           await sequelize.models.vital_signs_audit.create({
//             vitalSign_id: vitalSign.id,
//             medicalRecord_id: vitalSign.medicalRecord_id,
//             examiner_id: vitalSign.examiner_id,
//             taken_date: vitalSign.taken_date,
//             progressNote_id: vitalSign.progressNote_id,
//             // vital_id: vitalSign.vital_id,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   Vital.sync({ alter: false, force: false });
//   return Vital;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class Vital extends Model<
  InferAttributes<Vital>,
  InferCreationAttributes<Vital>
> {
  declare id: CreationOptional<number>; // Assuming there's an ID field, add if necessary
  declare medicalRecord_id: number;
  declare examiner_id: number;
  declare taken_date?: Date;
  declare progressNote_id?: number; // Optional field
  declare deletedAt?: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Vital.init(
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
    },
    examiner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taken_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for default value
    },
    progressNote_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    modelName: "vital",
    tableName: "vitals",
    paranoid: true, // Enables soft deletes
    // hooks: {
    //   afterCreate: async (vitalSign, options) => {
    //     await sequelize.models.vital_signs_audit.create({
    //       vitalSign_id: vitalSign.id,
    //       medicalRecord_id: vitalSign.medicalRecord_id,
    //       examiner_id: vitalSign.examiner_id,
    //       taken_date: vitalSign.taken_date,
    //       progressNote_id: vitalSign.progressNote_id,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(), // Use new Date() for consistent timestamp
    //     });
    //   },
    //   beforeUpdate: async (vitalSign, options) => {
    //     const previousValue = vitalSign._previousDataValues;
    //     await sequelize.models.vital_signs_audit.create({
    //       vitalSign_id: previousValue.id,
    //       medicalRecord_id: previousValue.medicalRecord_id,
    //       examiner_id: previousValue.examiner_id,
    //       taken_date: previousValue.taken_date,
    //       progressNote_id: previousValue.progressNote_id,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeDestroy: async (vitalSign, options) => {
    //     await sequelize.models.vital_signs_audit.create({
    //       vitalSign_id: vitalSign.id,
    //       medicalRecord_id: vitalSign.medicalRecord_id,
    //       examiner_id: vitalSign.examiner_id,
    //       taken_date: vitalSign.taken_date,
    //       progressNote_id: vitalSign.progressNote_id,
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
// Vital.sync({ alter: false });

export default Vital;
