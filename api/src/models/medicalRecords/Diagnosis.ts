import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class Diagnosis extends Model<
  InferAttributes<Diagnosis>,
  InferCreationAttributes<Diagnosis>
> {
  declare id: CreationOptional<string>;
  declare medicalRecordId: string;
  declare doctorId: number;
  declare diagnosis: string;
  declare sickLeaveNoteId?: CreationOptional<number>;
  declare status?: "Suspected" | "Confirmed" | "Ruled out";
  declare deletedAt?: CreationOptional<Date>;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Diagnosis.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    medicalRecordId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sickLeaveNoteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Suspected", "Confirmed", "Ruled out"),
      defaultValue: "Suspected",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "diagnosis",
    tableName: "diagnoses",
    paranoid: true, // Enables soft deletes
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// Diagnosis.sync({ alter: false });

export default Diagnosis;
