// module.exports = (sequelize, DataTypes) => {
//   const MedicalBilling = sequelize.define(
//     "medicalbilling",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       patient_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "patients",
//           key: "id",
//         },
//         onDelete: "SET NULL",
//       },
//       visit_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "patientassignments",
//           key: "id",
//         },
//         onDelete: "SET NULL",
//       },
//       medical_record_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "medicalrecords",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       externalService_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "external_services",
//           key: "id",
//         },
//         onDelete: "SET NULL",
//       },
//       is_internal_service: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//       date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: new Date(),
//       },
//       has_advanced_payment: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//       is_advanced_payment_amount_completed: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         default: false,
//       },
//       status: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: true,
//       },
//     },
//     {
//       hooks: {
//         afterCreate: async (billings, options) => {
//           await sequelize.models.medical_billings_audit.create({
//             medicalBilling_id: billings.id,
//             patient_id: billings.patient_id,
//             visit_id: billings.visit_id,
//             medical_record_id: billings.medical_record_id,
//             externalService_id: billings.externalService_id,
//             is_internal_service: billings.is_internal_service,
//             date: billings.date,
//             has_advanced_payment: billings.has_advanced_payment,
//             is_advanced_payment_amount_completed:
//               billings.is_advanced_payment_amount_completed,
//             status: billings.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (billings, options) => {
//           const previousValue = billings._previousDataValues;
//           await sequelize.models.medical_billings_audit.create({
//             medicalBilling_id: previousValue.id,
//             patient_id: previousValue.patient_id,
//             visit_id: previousValue.visit_id,
//             medical_record_id: previousValue.medical_record_id,
//             externalService_id: previousValue.externalService_id,
//             is_internal_service: previousValue.is_internal_service,
//             date: previousValue.date,
//             has_advanced_payment: previousValue.has_advanced_payment,
//             is_advanced_payment_amount_completed:
//               previousValue.is_advanced_payment_amount_completed,
//             status: previousValue.status,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (billings, options) => {
//           await sequelize.models.medical_billings_audit.create({
//             medicalBilling_id: billings.id,
//             patient_id: billings.patient_id,
//             visit_id: billings.visit_id,
//             medical_record_id: billings.medical_record_id,
//             externalService_id: billings.externalService_id,
//             is_internal_service: billings.is_internal_service,
//             date: billings.date,
//             has_advanced_payment: billings.has_advanced_payment,
//             is_advanced_payment_amount_completed:
//               billings.is_advanced_payment_amount_completed,
//             status: billings.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   MedicalBilling.sync({ alter: false, force: false });
//   return MedicalBilling;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class MedicalBilling extends Model<
  InferAttributes<MedicalBilling>,
  InferCreationAttributes<MedicalBilling>
> {
  declare id: CreationOptional<number>;
  declare patient_id?: number | null;
  declare visit_id?: number | null;
  declare medical_record_id?: number | null;
  declare externalService_id?: number | null;
  declare is_internal_service?: boolean;
  declare date: Date; // DATE as Date type
  declare has_advanced_payment?: boolean;
  declare is_advanced_payment_amount_completed?: boolean | null;
  declare status: string;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

MedicalBilling.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    visit_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "patientassignments",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "medicalrecords",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    externalService_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "external_services",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    is_internal_service: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    has_advanced_payment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_advanced_payment_amount_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active", // Changed to string to match the type
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
    modelName: "medicalbilling",
    tableName: "medicalbillings",
    timestamps: true, // Enable timestamps for createdAt and updatedAt
    // hooks: {
    //   afterCreate: async (billings, options) => {
    //     await sequelize.models.medical_billings_audit.create({
    //       medicalBilling_id: billings.id,
    //       patient_id: billings.patient_id,
    //       visit_id: billings.visit_id,
    //       medical_record_id: billings.medical_record_id,
    //       externalService_id: billings.externalService_id,
    //       is_internal_service: billings.is_internal_service,
    //       date: billings.date,
    //       has_advanced_payment: billings.has_advanced_payment,
    //       is_advanced_payment_amount_completed: billings.is_advanced_payment_amount_completed,
    //       status: billings.status,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeUpdate: async (billings, options) => {
    //     const previousValue = billings._previousDataValues;
    //     await sequelize.models.medical_billings_audit.create({
    //       medicalBilling_id: previousValue.id,
    //       patient_id: previousValue.patient_id,
    //       visit_id: previousValue.visit_id,
    //       medical_record_id: previousValue.medical_record_id,
    //       externalService_id: previousValue.externalService_id,
    //       is_internal_service: previousValue.is_internal_service,
    //       date: previousValue.date,
    //       has_advanced_payment: previousValue.has_advanced_payment,
    //       is_advanced_payment_amount_completed: previousValue.is_advanced_payment_amount_completed,
    //       status: previousValue.status,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeDestroy: async (billings, options) => {
    //     await sequelize.models.medical_billings_audit.create({
    //       medicalBilling_id: billings.id,
    //       patient_id: billings.patient_id,
    //       visit_id: billings.visit_id,
    //       medical_record_id: billings.medical_record_id,
    //       externalService_id: billings.externalService_id,
    //       is_internal_service: billings.is_internal_service,
    //       date: billings.date,
    //       has_advanced_payment: billings.has_advanced_payment,
    //       is_advanced_payment_amount_completed: billings.is_advanced_payment_amount_completed,
    //       status: billings.status,
    //       operation_type: "D", // Changed to represent deletion
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    // },
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// MedicalBilling.sync({ alter: false, force: false });

export default MedicalBilling;
