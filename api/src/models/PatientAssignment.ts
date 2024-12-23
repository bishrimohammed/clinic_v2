// const db = require(".");
// const { sequelize, PatientAssignment } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const patientAssignment = sequelize.define(
//     "patientassignment",
//     {
//       patient_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       doctor_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       medicalRecord_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "medicalrecords",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       visitType_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       assignment_date: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//         // defaultValue: new Date(),
//       },
//       visit_time: {
//         type: DataTypes.TIME,
//         allowNull: false,
//       },
//       visit_type: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       is_referred: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//       },
//       reason: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       created_by: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       symptom_notes: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       mode_of_arrival: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       stage: {
//         type: DataTypes.ENUM,
//         allowNull: true,
//         values: [
//           "Waiting for service fee",
//           "Waiting for triage",
//           "Waiting for examiner",
//           "Performing triage",
//           "Admitted",
//           "Performing consultation",
//           "Waiting for payment",
//           "Waiting for lab",
//           "Waiting for doctor",
//           "Done",
//         ],
//       },
//       isAdmitted: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: false,
//       },
//       admission_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//       discharge_summary: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       discharged_by: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       discharged_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true,
//       },
//     },
//     {
//       hooks: {
//         afterCreate: async (visit, options) => {
//           await sequelize.models.patientvisits_audit.create({
//             patient_visit_id: visit.id,
//             doctor_id: visit.doctor_id,
//             patient_id: visit.patient_id,
//             medicalRecord_id: visit.medicalRecord_id,
//             visit_type_id: visit.visit_type_id,
//             assignment_date: visit.assignment_date,
//             visit_time: visit.visit_time,
//             visit_type: visit.visit_type,
//             is_referred: visit.is_referred,
//             reason: visit.reason,
//             created_by: visit.created_by,
//             symptom_notes: visit.symptom_notes,
//             mode_of_arrival: visit.mode_of_arrival,
//             stage: visit.stage,
//             status: visit.status,
//             isAdmitted: visit.isAdmitted,
//             admission_date: visit.admission_date,
//             discharge_summary: visit.discharge_summary,
//             discharged_by: visit.discharged_by,
//             discharged_date: visit.discharged_date,

//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (visit, options) => {
//           const previousValue = visit._previousDataValues;
//           await sequelize.models.patientvisits_audit.create({
//             patient_visit_id: previousValue.id,
//             doctor_id: previousValue.doctor_id,
//             patient_id: previousValue.patient_id,
//             medicalRecord_id: previousValue.medicalRecord_id,
//             visit_type_id: previousValue.visit_type_id,
//             assignment_date: previousValue.assignment_date,
//             visit_time: previousValue.visit_time,
//             visit_type: previousValue.visit_type,
//             is_referred: previousValue.is_referred,
//             reason: previousValue.reason,
//             created_by: previousValue.created_by,
//             symptom_notes: previousValue.symptom_notes,
//             mode_of_arrival: previousValue.mode_of_arrival,
//             stage: previousValue.stage,
//             status: previousValue.status,
//             isAdmitted: previousValue.isAdmitted,
//             admission_date: previousValue.admission_date,
//             discharge_summary: previousValue.discharge_summary,
//             discharged_by: previousValue.discharged_by,
//             discharged_date: previousValue.discharged_date,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (visit, options) => {
//           await sequelize.models.patientvisits_audit.create({
//             patient_visit_id: visit.id,
//             doctor_id: visit.doctor_id,
//             patient_id: visit.patient_id,
//             medicalRecord_id: visit.medicalRecord_id,
//             visit_type_id: visit.visit_type_id,
//             assignment_date: visit.assignment_date,
//             visit_time: visit.visit_time,
//             visit_type: visit.visit_type,
//             is_referred: visit.is_referred,
//             reason: visit.reason,
//             created_by: visit.created_by,
//             symptom_notes: visit.symptom_notes,
//             mode_of_arrival: visit.mode_of_arrival,
//             stage: visit.stage,
//             status: visit.status,
//             isAdmitted: visit.isAdmitted,
//             admission_date: visit.admission_date,
//             discharge_summary: visit.discharge_summary,
//             discharged_by: visit.discharged_by,
//             discharged_date: visit.discharged_date,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );

//   patientAssignment.sync({ force: false, alter: false });
//   return patientAssignment;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import { Op } from "sequelize"; // Import Op for query operations

class PatientAssignment extends Model<
  InferAttributes<PatientAssignment>,
  InferCreationAttributes<PatientAssignment>
> {
  declare id: CreationOptional<number>;
  declare patient_id: number;
  declare doctor_id: number;
  declare medicalRecord_id: number;
  declare visitType_id?: number | null;
  declare visit_date: Date;
  declare visit_time: string; // Format: HH:mm:ss
  declare visit_type?: string | null;
  declare is_referred: boolean;
  declare reason?: string | null;
  declare created_by: number;
  declare symptom_notes?: string | null;
  declare mode_of_arrival?: string | null;
  declare stage?:
    | "Waiting for service fee"
    | "Waiting for triage"
    | "Waiting for examiner"
    | "Performing triage"
    | "Admitted"
    | "Performing consultation"
    | "Waiting for payment"
    | "Waiting for lab"
    | "Waiting for doctor"
    | "Done"
    | null;
  declare isAdmitted?: boolean;
  declare admission_date?: Date | null;
  declare discharge_summary?: string | null;
  declare discharged_by?: number | null;
  declare discharged_date?: Date | null;
  declare status: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

PatientAssignment.init(
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
    doctor_id: {
      type: DataTypes.INTEGER,
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
    visitType_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    visit_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    visit_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    visit_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_referred: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    symptom_notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mode_of_arrival: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stage: {
      type: DataTypes.ENUM(
        "Waiting for service fee",
        "Waiting for triage",
        "Waiting for examiner",
        "Performing triage",
        "Admitted",
        "Performing consultation",
        "Waiting for payment",
        "Waiting for lab",
        "Waiting for doctor",
        "Done"
      ),
      allowNull: true,
    },
    isAdmitted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    admission_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    discharge_summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    discharged_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discharged_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    modelName: "patientassignment",
    tableName: "patientassignments",
    timestamps: true,
    // hooks: {
    //   afterCreate: async (visit, options) => {
    //     await sequelize.models.patientvisits_audit.create({
    //       patient_visit_id: visit.id,
    //       doctor_id: visit.doctor_id,
    //       patient_id: visit.patient_id,
    //       medicalRecord_id: visit.medicalRecord_id,
    //       visit_type_id: visit.visitType_id,
    //       assignment_date: visit.assignment_date,
    //       visit_time: visit.visit_time,
    //       visit_type: visit.visit_type,
    //       is_referred: visit.is_referred,
    //       reason: visit.reason,
    //       created_by: visit.created_by,
    //       symptom_notes: visit.symptom_notes,
    //       mode_of_arrival: visit.mode_of_arrival,
    //       stage: visit.stage,
    //       status: visit.status,
    //       isAdmitted: visit.isAdmitted,
    //       admission_date: visit.admission_date,
    //       discharge_summary: visit.discharge_summary,
    //       discharged_by: visit.discharged_by,
    //       discharged_date: visit.discharged_date,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: Date.now(),
    //     });
    //   },
    //   beforeUpdate: async (visit, options) => {
    //     const previousValue = visit._previousDataValues;
    //     await sequelize.models.patientvisits_audit.create({
    //       patient_visit_id: previousValue.id,
    //       doctor_id: previousValue.doctor_id,
    //       patient_id: previousValue.patient_id,
    //       medicalRecord_id: previousValue.medicalRecord_id,
    //       visit_type_id: previousValue.visitType_id,
    //       assignment_date: previousValue.assignment_date,
    //       visit_time: previousValue.visit_time,
    //       visit_type: previousValue.visit_type,
    //       is_referred: previousValue.is_referred,
    //       reason: previousValue.reason,
    //       created_by: previousValue.created_by,
    //       symptom_notes: previousValue.symptom_notes,
    //       mode_of_arrival: previousValue.mode_of_arrival,
    //       stage: previousValue.stage,
    //       status: previousValue.status,
    //       isAdmitted: previousValue.isAdmitted,
    //       admission_date: previousValue.admission_date,
    //       discharge_summary: previousValue.discharge_summary,
    //       discharged_by: previousValue.discharged_by,
    //       discharged_date: previousValue.discharged_date,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: Date.now(),
    //     });
    //   },
    //   beforeDestroy: async (visit, options) => {
    //     await sequelize.models.patientvisits_audit.create({
    //       patient_visit_id: visit.id,
    //       doctor_id: visit.doctor_id,
    //       patient_id: visit.patient_id,
    //       medicalRecord_id: visit.medicalRecord_id,
    //       visit_type_id: visit.visitType_id,
    //       assignment_date: visit.assignment_date,
    //       visit_time: visit.visit_time,
    //       visit_type: visit.visit_type,
    //       is_referred: visit.is_referred,
    //       reason: visit.reason,
    //       created_by: visit.created_by,
    //       symptom_notes: visit.symptom_notes,
    //       mode_of_arrival: visit.mode_of_arrival,
    //       stage: visit.stage,
    //       status: visit.status,
    //       isAdmitted: visit.isAdmitted,
    //       admission_date: visit.admission_date,
    //       discharge_summary: visit.discharge_summary,
    //       discharged_by: visit.discharged_by,
    //       discharged_date: visit.discharged_date,
    //       operation_type: "D",
    //       changed_by: options.userId,
    //       changed_at: Date.now(),
    //     });
    //   },
    // },
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// PatientAssignment.sync({ force: false, alter: false });

export default PatientAssignment;
