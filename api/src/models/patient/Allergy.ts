// module.exports = (sequelize, DataTypes) => {
//   const Allergy = sequelize.define(
//     "allergy",
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
//       //Mild, Moderate, Severe
//       allergy_type: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       severity: {
//         type: DataTypes.ENUM,
//         allowNull: false,
//         values: ["Mild", "Moderate", "Severe"],
//       },
//       reaction_details: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       created_by: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       deletedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//     },
//     {
//       paranoid: true,
//       hooks: {
//         afterCreate: async (allergy, options) => {
//           await sequelize.models.allergies_audit.create({
//             allergy_id: allergy.id,
//             patient_id: allergy.patient_id,
//             allergy_type: allergy.allergy_type,
//             severity: allergy.severity,
//             reaction_details: allergy.reaction_details,
//             created_by: allergy.created_by,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (allergy, options) => {
//           const previousAllergy = allergy._previousDataValues;
//           await sequelize.models.allergies_audit.create({
//             allergy_id: previousAllergy.id,
//             patient_id: previousAllergy.patient_id,
//             allergy_type: previousAllergy.allergy_type,
//             severity: previousAllergy.severity,
//             reaction_details: previousAllergy.reaction_details,
//             created_by: previousAllergy.created_by,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (allergy, options) => {
//           await sequelize.models.allergies_audit.create({
//             allergy_id: allergy.id,
//             patient_id: allergy.patient_id,
//             allergy_type: allergy.allergy_type,
//             severity: allergy.severity,
//             reaction_details: allergy.reaction_details,
//             created_by: allergy.created_by,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   Allergy.sync({ alter: false });
//   return Allergy;
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

class Allergy extends Model<
  InferAttributes<Allergy>,
  InferCreationAttributes<Allergy>
> {
  declare id: CreationOptional<number>;
  declare patient_id: ForeignKey<Patient["id"]>;
  declare allergy_type: string;
  declare severity: "Mild" | "Moderate" | "Severe";
  declare reaction_details: string | null;
  declare created_by: number;
  declare deletedAt?: Date | null; // Optional field for soft deletes
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Allergy.init(
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
    allergy_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    severity: {
      type: DataTypes.ENUM("Mild", "Moderate", "Severe"),
      allowNull: false,
    },
    reaction_details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "allergy",
    tableName: "allergies",
    paranoid: true, // Enables soft deletes
    timestamps: true, // Automatically manage createdAt and updatedAt
    // hooks: {
    //   afterCreate: async (allergy, options) => {
    //     await sequelize.models.allergies_audit.create({
    //       allergy_id: allergy.id,
    //       patient_id: allergy.patient_id,
    //       allergy_type: allergy.allergy_type,
    //       severity: allergy.severity,
    //       reaction_details: allergy.reaction_details,
    //       created_by: allergy.created_by,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeUpdate: async (allergy, options) => {
    //     const previousAllergy = allergy._previousDataValues;
    //     await sequelize.models.allergies_audit.create({
    //       allergy_id: previousAllergy.id,
    //       patient_id: previousAllergy.patient_id,
    //       allergy_type: previousAllergy.allergy_type,
    //       severity: previousAllergy.severity,
    //       reaction_details: previousAllergy.reaction_details,
    //       created_by: previousAllergy.created_by,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeDestroy: async (allergy, options) => {
    //     await sequelize.models.allergies_audit.create({
    //       allergy_id: allergy.id,
    //       patient_id: allergy.patient_id,
    //       allergy_type: allergy.allergy_type,
    //       severity: allergy.severity,
    //       reaction_details: allergy.reaction_details,
    //       created_by: allergy.created_by,
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
// Allergy.sync({ alter: false });

export default Allergy;
