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

class MedicalRecord extends Model<
  InferAttributes<MedicalRecord>,
  InferCreationAttributes<MedicalRecord>
> {
  declare id: CreationOptional<number>;
  declare patient_id: number;
  declare status?: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;

  declare getDiscontinuedMedications: HasManyGetAssociationsMixin<DiscontinuedMedication>;
  declare getCurrentMedications: HasManyGetAssociationsMixin<CurrentMedication>;
}

MedicalRecord.init(
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
    modelName: "medicalrecord",
    tableName: "medicalrecords",
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  }
);

MedicalRecord.hasMany(PatientVisit, {
  foreignKey: "medicalRecordId",
  as: "visit",
});

MedicalRecord.hasMany(CurrentMedication, {
  foreignKey: "medical_record_id",
  as: "currentMedication",
});
MedicalRecord.hasMany(DiscontinuedMedication, {
  foreignKey: "medical_record_id",
  as: "discontinuedMedication",
});
// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// MedicalRecord.sync({ force: false, alter: false });

export default MedicalRecord;
