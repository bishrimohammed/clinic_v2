import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path
import User from "../User";
import MedicalRecord from "../MedicalRecord";
import ExternalService from "../ExternalService";

class InvestigationOrder extends Model<
  InferAttributes<InvestigationOrder>,
  InferCreationAttributes<InvestigationOrder>
> {
  declare id: CreationOptional<string>;
  declare orderableId: string;
  declare orderableType: "MedicalRecord" | "ExternalService";
  declare isInternalService: boolean;
  declare orderTime: CreationOptional<Date>;
  declare orderedBy: ForeignKey<User["id"]>;
  declare stage?:
    | "pending"
    | "completed"
    | "cancelled"
    | "in_progress"
    | "partially_completed";
  declare status?: boolean;
  declare deletedAt?: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Define method to get associated model dynamically
  async getOrderable() {
    if (this.orderableType === "MedicalRecord") {
      return await MedicalRecord.findByPk(this.orderableId);
    }
    if (this.orderableType === "ExternalService") {
      return await ExternalService.findByPk(this.orderableId);
    }
    return null;
  }
}

InvestigationOrder.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    orderableId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    orderableType: {
      type: DataTypes.ENUM("MedicalRecord", "ExternalService"),
      allowNull: false,
    },
    isInternalService: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    orderTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    orderedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    stage: {
      type: DataTypes.ENUM(
        "pending",
        "completed",
        "cancelled",
        "in_progress",
        "partially_completed"
      ),
      allowNull: true,
      defaultValue: "pending",
    },

    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
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
    tableName: "investigationorders",
    paranoid: true, // Enables soft deletes
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// InvestigationOrder.sync({ force: false });

export default InvestigationOrder;
