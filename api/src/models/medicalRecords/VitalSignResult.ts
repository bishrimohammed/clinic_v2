import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path
import VitalSign from "./VitalSign";
import VitalSignField from "../VitalSignField";

class VitalSignResult extends Model<
  InferAttributes<VitalSignResult>,
  InferCreationAttributes<VitalSignResult>
> {
  declare id: CreationOptional<string>;
  declare vitalId: string;
  declare vitalSignFieldId: string;
  declare result: string;
  declare deletedAt?: CreationOptional<Date>;
}

VitalSignResult.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    vitalId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: VitalSign,
        key: "id",
      },
    },
    vitalSignFieldId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: VitalSignField,
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
    tableName: "vital_sign_result",
    paranoid: true, // Enables soft deletes
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    timestamps: false, // No automatic timestamps
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
VitalSignResult.sync({ alter: false });

export default VitalSignResult;
