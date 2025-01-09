// module.exports = (sequelize, DataTypes) => {
//   const CurrentMedication = sequelize.define(
//     "current_medication",
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
//       condition: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       treatment: {
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
//       // timestamps: true,
//       paranoid: true,
//       hooks: {
//         afterCreate: async (currentMedication, options) => {
//           await sequelize.models.current_medications_audit.create({
//             currentMedication_id: currentMedication.id,
//             medical_record_id: currentMedication.medical_record_id,
//             created_by: currentMedication.created_by,
//             condition: currentMedication.condition,
//             treatment: currentMedication.treatment,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (currentMedication, options) => {
//           const previousValue = currentMedication._previousDataValues;
//           await sequelize.models.current_medications_audit.create({
//             currentMedication_id: previousValue.id,
//             medical_record_id: previousValue.medical_record_id,
//             created_by: previousValue.created_by,
//             condition: previousValue.condition,
//             treatment: previousValue.treatment,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (currentMedication, options) => {
//           await sequelize.models.current_medications_audit.create({
//             currentMedication_id: currentMedication.id,
//             medical_record_id: currentMedication.medical_record_id,
//             created_by: currentMedication.created_by,
//             condition: currentMedication.condition,
//             treatment: currentMedication.treatment,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   CurrentMedication.sync({ alter: false, force: false });
//   return CurrentMedication;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class CurrentMedication extends Model<
  InferAttributes<CurrentMedication>,
  InferCreationAttributes<CurrentMedication>
> {
  declare id: CreationOptional<number>;
  declare medical_record_id: number;
  declare created_by: number;
  declare condition: string;
  declare treatment: string;
  declare deletedAt?: CreationOptional<Date>;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

CurrentMedication.init(
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
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    treatment: {
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
    modelName: "current_medication",
    tableName: "current_medications",
    paranoid: true, // Enables soft deletes
    timestamps: true, // Automatically manage createdAt and updatedAt
    //   hooks: {
    //     afterCreate: async (currentMedication, options) => {
    //       await sequelize.models.current_medications_audit.create({
    //         currentMedication_id: currentMedication.id,
    //         medical_record_id: currentMedication.medical_record_id,
    //         created_by: currentMedication.created_by,
    //         condition: currentMedication.condition,
    //         treatment: currentMedication.treatment,
    //         operation_type: "I",
    //         changed_by: options.userId,
    //         changed_at: new Date(),
    //       });
    //     },
    //     beforeUpdate: async (currentMedication, options) => {
    //       const previousValue = currentMedication._previousDataValues;
    //       await sequelize.models.current_medications_audit.create({
    //         currentMedication_id: previousValue.id,
    //         medical_record_id: previousValue.medical_record_id,
    //         created_by: previousValue.created_by,
    //         condition: previousValue.condition,
    //         treatment: previousValue.treatment,
    //         operation_type: "U",
    //         changed_by: options.userId,
    //         changed_at: new Date(),
    //       });
    //     },
    //     beforeDestroy: async (currentMedication, options) => {
    //       await sequelize.models.current_medications_audit.create({
    //         currentMedication_id: currentMedication.id,
    //         medical_record_id: currentMedication.medical_record_id,
    //         created_by: currentMedication.created_by,
    //         condition: currentMedication.condition,
    //         treatment: currentMedication.treatment,
    //         operation_type: "D",
    //         changed_by: options.userId,
    //         changed_at: new Date(),
    //       });
    //     },
    //   },
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// CurrentMedication.sync({ alter: false });

export default CurrentMedication;
