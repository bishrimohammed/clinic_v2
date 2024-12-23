import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class PhysicalExaminationResult extends Model<
  InferAttributes<PhysicalExaminationResult>,
  InferCreationAttributes<PhysicalExaminationResult>
> {
  declare id: CreationOptional<number>;
  declare physicalExamination_id: number;
  declare physical_ExaminationField_id: number;
  declare result: string;
  declare deletedAt?: Date | null;
}

PhysicalExaminationResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    physicalExamination_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "physical_examinations",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    physical_ExaminationField_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: "physical_examination_result",
    tableName: "physical_examination_result",
    paranoid: true, // Enables soft deletes
    // freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    timestamps: false, // No automatic timestamps
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// PhysicalExaminationResult.sync({ alter: false });

export default PhysicalExaminationResult;
