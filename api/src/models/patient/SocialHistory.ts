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

class SocialHistory extends Model<
  InferAttributes<SocialHistory>,
  InferCreationAttributes<SocialHistory>
> {
  declare id: CreationOptional<number>;
  declare patient_id: ForeignKey<Patient["id"]>;
  declare tobacco_use: "Current smoker" | "Former smoker" | "Non-smoker";
  declare alcohol_use: string;
  declare created_by: number;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

SocialHistory.init(
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
    tobacco_use: {
      type: DataTypes.ENUM("Current smoker", "Former smoker", "Non-smoker"),
      allowNull: false,
    },
    alcohol_use: {
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
  },
  {
    sequelize,
    modelName: "social_history",
    tableName: "social_histories",
    timestamps: true,
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// SocialHistory.sync({ alter: false });

export default SocialHistory;
