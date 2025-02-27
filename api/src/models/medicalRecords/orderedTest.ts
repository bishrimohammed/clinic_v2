import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path
import InvestigationOrder from "./InvestigationOrder";
import ServiceItem from "../serviceItem";

class OrderedTest extends Model<
  InferAttributes<OrderedTest>,
  InferCreationAttributes<OrderedTest>
> {
  declare id: CreationOptional<string>;
  declare investigationOrderId: string;
  declare serviceItemId: number;

  declare reportTime?: Date;
  declare result?: string;
  declare comment?: string;

  declare reportedBy?: number;
  declare isUnderpanel: boolean;
  declare status?: "pending" | "completed";
  declare deletedAt?: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

OrderedTest.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    investigationOrderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: InvestigationOrder,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    serviceItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Uncomment the references if needed
      references: {
        model: ServiceItem,
        key: "id",
      },
      onDelete: "CASCADE",
    },

    reportTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    reportedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isUnderpanel: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed"),
      allowNull: true,
      defaultValue: "pending",
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
    modelName: "orderedtest",
    tableName: "orderedtests",
    paranoid: true, // Enables soft deletes
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// OrderedTest.sync({ force: false });

export default OrderedTest;
