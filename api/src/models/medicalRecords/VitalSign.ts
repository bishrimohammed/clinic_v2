import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path
import MedicalRecord from "../MedicalRecord";
import User from "../User";
import VitalSignResult from "./VitalSignResult";

class VitalSign extends Model<
  InferAttributes<VitalSign>,
  InferCreationAttributes<VitalSign>
> {
  declare id: CreationOptional<string>; // Assuming there's an ID field, add if necessary
  declare medicalRecordId: string;
  declare examinerId: number;
  declare takenDate?: Date;
  declare progressNoteId: string | null; // Optional field
  declare deletedAt?: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getVitalResults: HasManyGetAssociationsMixin<VitalSignResult>;
}

VitalSign.init(
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
      references: {
        model: MedicalRecord,
        key: "id",
      },
    },
    examinerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    takenDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for default value
    },
    progressNoteId: {
      type: DataTypes.UUID,
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
    tableName: "vital_signs",
    paranoid: true, // Enables soft deletes
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
VitalSign.sync({ alter: false });

VitalSign.belongsTo(MedicalRecord, {
  foreignKey: "medicalRecordId",
  as: "medicalRecord",
});

VitalSign.hasMany(VitalSignResult, {
  foreignKey: "vitalId",
  as: "vitalResults",
});

export default VitalSign;
