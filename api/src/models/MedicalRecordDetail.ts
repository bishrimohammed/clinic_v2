import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import MedicalRecord from "./MedicalRecord";
import User from "./User";

class MedicalRecordDetail extends Model<
  InferAttributes<MedicalRecordDetail>,
  InferCreationAttributes<MedicalRecordDetail>
> {
  declare id: CreationOptional<string>;
  declare medicalRecordId: string;
  declare doctorId: number;
  declare chiefComplaint: string;
  declare plan: string | null;
  declare assessment: string | null;
  declare HPI: string;
  declare notes: string | null;
  // declare status?: boolean;
  declare deletedAt?: CreationOptional<Date | null>;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

MedicalRecordDetail.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    chiefComplaint: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    HPI: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assessment: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
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
    tableName: "medicalrecorddetails",
    paranoid: true, // Enable soft deletes
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
MedicalRecordDetail.sync({ force: false, alter: false });

export default MedicalRecordDetail;
