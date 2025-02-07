import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path
import PhysicalExamination from "./physicalExamination";
import PhysicalExaminationField from "../PhysicalExaminationField";

class PhysicalExaminationResult extends Model<
  InferAttributes<PhysicalExaminationResult>,
  InferCreationAttributes<PhysicalExaminationResult>
> {
  declare id: CreationOptional<string>;
  declare physicalExaminationId: ForeignKey<PhysicalExamination["id"]>;
  declare examinationFieldId: ForeignKey<PhysicalExaminationField["id"]>;
  declare result: string;
  declare deletedAt?: Date | null;
}

PhysicalExaminationResult.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    physicalExaminationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: PhysicalExamination,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    examinationFieldId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: PhysicalExaminationField,
        key: "id",
      },
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "physical_examination_result",
    paranoid: true, // Enables soft deletes
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    timestamps: false, // No automatic timestamps
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
PhysicalExaminationResult.sync({ alter: false });

PhysicalExaminationResult.belongsTo(PhysicalExaminationField, {
  foreignKey: "examinationFieldId",
  as: "examinationField",
});
export default PhysicalExaminationResult;
