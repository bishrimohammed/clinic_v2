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
import MedicalRecord from "./MedicalRecord";

class PatientVisit extends Model<
  InferAttributes<PatientVisit>,
  InferCreationAttributes<PatientVisit>
> {
  declare medicalRecordId: string;
  // declare visitType_id?: number | null;
  declare id: CreationOptional<number>;
  declare patientId: number;
  declare doctorId: number;
  declare referredTo: number | null;
  declare visitDate: Date;
  declare visitTime: string; // Format: HH:mm:ss
  declare visitType: string;
  declare isReferred?: boolean;
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
    | "Done";

  declare isAdmitted?: boolean;
  declare admissionDate?: Date | null;
  declare dischargeSummary?: string | null;
  declare dischargedBy?: number | null;
  declare dischargedDate?: Date | null;
  declare status?: boolean;
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
    referredTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: User,
      //   key: "id",
      // },
    },
    medicalRecordId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: MedicalRecord,
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
        "Waiting for doctor",
        "Performing triage",
        "Admitted",
        "Performing consultation",
        "Waiting for payment",
        "Waiting for lab",
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
    tableName: "patient_visits",
    timestamps: true,
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
PatientVisit.belongsTo(User, {
  foreignKey: "refferedTo",
  as: "refferedto",
});
PatientVisit.sync({ force: false, alter: true });

export default PatientVisit;
