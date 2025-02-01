import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import sequelize from "../db/index";
import Patient from "./Patient";
import User from "./User";

class PatientVisit extends Model<
  InferAttributes<PatientVisit>,
  InferCreationAttributes<PatientVisit>
> {
  declare medicalRecordId: number;
  // declare visitType_id?: number | null;
  declare id: CreationOptional<number>;
  declare patientId: number;
  declare doctorId: number;
  declare visitDate: Date;
  declare visitTime: string; // Format: HH:mm:ss
  declare visitType?: string | null;
  declare isReferred: boolean;
  declare reason?: string | null;
  declare createdBy: number;
  declare symptomNotes?: string | null;
  declare modeOfArrival?: string | null;
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
  declare admissionDate?: Date | null;
  declare dischargeSummary?: string | null;
  declare dischargedBy?: number | null;
  declare dischargedDate?: Date | null;
  declare status: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

PatientVisit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medicalRecordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "medicalrecords",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    // visitType_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    visitDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    visitTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    visitType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isReferred: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    symptomNotes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modeOfArrival: {
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
    admissionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dischargeSummary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dischargedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dischargedDate: {
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
    // modelName: "PatientVisit",
    tableName: "patient_visits",
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

PatientVisit.belongsTo(Patient, {
  foreignKey: "patientId",
  as: "patient",
});
PatientVisit.belongsTo(User, {
  foreignKey: "doctorId",
  as: "doctor",
});

// PatientVisit.sync({ force: false, alter: false });

export default PatientVisit;
