import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path
import MedicalRecord from "../MedicalRecord";
import PhysicalExaminationResult from "./physicalExaminationResult";

class PhysicalExamination extends Model<
  InferAttributes<PhysicalExamination>,
  InferCreationAttributes<PhysicalExamination>
> {
  declare id: CreationOptional<string>;
  declare medicalRecordId: string;
  declare progressNoteId?: string;
  declare examinerId: number;
  declare deletedAt?: CreationOptional<Date>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PhysicalExamination.init(
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
      onDelete: "CASCADE",
    },
    progressNoteId: {
      type: DataTypes.UUID,
      allowNull: true,
      // references: {
      //   model: "progress_notes",
      //   key: "id",
      // },
      // onDelete: "CASCADE",
    },
    examinerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "physical_examinations",
    paranoid: true, // Enables soft deletes
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
PhysicalExamination.sync({ alter: false });

PhysicalExamination.belongsTo(MedicalRecord, {
  foreignKey: "medicalRecordId",
  as: "medicalRecord",
});
PhysicalExamination.hasMany(PhysicalExaminationResult, {
  foreignKey: "physicalExaminationId",
  as: "examinationResults",
});
export default PhysicalExamination;
