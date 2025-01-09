// module.exports = (sequelize, DataTypes) => {
//   const DiscontinuedMedication = sequelize.define(
//     "discontinued_medication",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       medical_record_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       created_by: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       medication_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
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
//         afterCreate: async (discontinuedMedication, options) => {
//           await sequelize.models.discontinued_medications_audit.create({
//             discontinuedMedication_id: discontinuedMedication.id,
//             medical_record_id: discontinuedMedication.medical_record_id,
//             created_by: discontinuedMedication.created_by,
//             medication_name: discontinuedMedication.medication_name,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (discontinuedMedication, options) => {
//           const previousValue = discontinuedMedication._previousDataValues;
//           await sequelize.models.discontinued_medications_audit.create({
//             discontinuedMedication_id: previousValue.id,
//             medical_record_id: previousValue.medical_record_id,
//             created_by: previousValue.created_by,
//             medication_name: previousValue.medication_name,
//             old_medication_name: previousValue.medication_name,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (discontinuedMedication, options) => {
//           await sequelize.models.discontinued_medications_audit.create({
//             discontinuedMedication_id: discontinuedMedication.id,
//             medical_record_id: discontinuedMedication.medical_record_id,
//             created_by: discontinuedMedication.created_by,
//             medication_name: discontinuedMedication.medication_name,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   DiscontinuedMedication.sync({ alter: false, force: false });
//   return DiscontinuedMedication;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class DiscontinuedMedication extends Model<
  InferAttributes<DiscontinuedMedication>,
  InferCreationAttributes<DiscontinuedMedication>
> {
  declare id: CreationOptional<number>;
  declare medical_record_id: number;
  declare created_by: number;
  declare medication_name: string;
  declare deletedAt?: Date | null;
}

DiscontinuedMedication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medication_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "discontinued_medication",
    tableName: "discontinued_medications",
    paranoid: true, // Enables soft deletes
    // hooks: {
    //   afterCreate: async (discontinuedMedication, options) => {
    //     await sequelize.models.discontinued_medications_audit.create({
    //       discontinuedMedication_id: discontinuedMedication.id,
    //       medical_record_id: discontinuedMedication.medical_record_id,
    //       created_by: discontinuedMedication.created_by,
    //       medication_name: discontinuedMedication.medication_name,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeUpdate: async (discontinuedMedication, options) => {
    //     const previousValue = discontinuedMedication._previousDataValues;
    //     await sequelize.models.discontinued_medications_audit.create({
    //       discontinuedMedication_id: previousValue.id,
    //       medical_record_id: previousValue.medical_record_id,
    //       created_by: previousValue.created_by,
    //       medication_name: previousValue.medication_name,
    //       old_medication_name: previousValue.medication_name,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeDestroy: async (discontinuedMedication, options) => {
    //     await sequelize.models.discontinued_medications_audit.create({
    //       discontinuedMedication_id: discontinuedMedication.id,
    //       medical_record_id: discontinuedMedication.medical_record_id,
    //       created_by: discontinuedMedication.created_by,
    //       medication_name: discontinuedMedication.medication_name,
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
// DiscontinuedMedication.sync({ alter: false });

export default DiscontinuedMedication;
