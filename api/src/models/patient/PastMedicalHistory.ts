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

class PastMedicalHistory extends Model<
  InferAttributes<PastMedicalHistory>,
  InferCreationAttributes<PastMedicalHistory>
> {
  declare id: CreationOptional<number>;
  declare patient_id: ForeignKey<Patient["id"]>;
  declare medical_condition: string;
  declare treatment: string;
  declare created_by: number;
  declare deletedAt?: CreationOptional<Date>;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

PastMedicalHistory.init(
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
    medical_condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    treatment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "past_medical_history",
    tableName: "past_medical_histories",
    paranoid: true,
    timestamps: true,
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
PastMedicalHistory.sync({ alter: false });

export default PastMedicalHistory;
