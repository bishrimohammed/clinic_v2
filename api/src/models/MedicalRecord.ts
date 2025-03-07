import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import CurrentMedication from "./medicalRecords/CurrentMedication";
import DiscontinuedMedication from "./medicalRecords/DiscontinuedMedication";
import Patient from "./Patient";
import PatientVisit from "./PatientVisit";
import MedicalBilling from "./MedicalBilling";
import InvestigationOrder from "./medicalRecords/InvestigationOrder";

class MedicalRecord extends Model<
  InferAttributes<MedicalRecord>,
  InferCreationAttributes<MedicalRecord>
> {
  declare id: CreationOptional<string>;
  declare patientId: number;
  declare status?: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
  declare getDiscontinuedMedications: HasManyGetAssociationsMixin<DiscontinuedMedication>;
  declare getCurrentMedications: HasManyGetAssociationsMixin<CurrentMedication>;

  static associate() {
    this.hasMany(InvestigationOrder, {
      foreignKey: "orderableId",
      constraints: false,
      scope: {
        orderableType: "MedicalRecord",
      },
    });
  }
}

MedicalRecord.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: "id",
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    tableName: "medicalrecords",
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  }
);
MedicalRecord.hasOne(MedicalBilling, {
  foreignKey: "billableId",
  constraints: false,
  as: "medicalBilling",
  scope: { billableType: "MedicalRecord" }, // Ensure it's only for MedicalRecords
});
// MedicalRecord.hasMany(PatientVisit, {
//   foreignKey: "medicalRecordId",
//   as: "visit",
// });
MedicalRecord.belongsTo(Patient, {
  foreignKey: "patientId",
  as: "patient",
});
MedicalRecord.hasMany(CurrentMedication, {
  foreignKey: "medicalRecordId",
  as: "currentMedication",
});
MedicalRecord.hasMany(DiscontinuedMedication, {
  foreignKey: "medicalRecordId",
  as: "discontinuedMedication",
});
// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
MedicalRecord.sync({ force: false, alter: false });

export default MedicalRecord;
