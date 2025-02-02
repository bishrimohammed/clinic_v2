import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Op,
} from "sequelize";
import sequelize from "../../db";
import ServiceItem from "../serviceItem";
import MedicalBilling from "../MedicalBilling";
import User from "../User";
import Payment from "../Payment";

class BilledLineItem extends Model<
  InferAttributes<BilledLineItem>,
  InferCreationAttributes<BilledLineItem>
> {
  declare id: CreationOptional<string>;
  declare billingId: string;
  declare serviceItemId: number;
  declare quantity: number;
  declare unitPrice: number;
  declare discount: number;
  declare tax: number;
  declare total: number;
  declare paymentId: string | null;
  // declare a user who created the line item
  declare createdBy: number;
}

BilledLineItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,

      allowNull: false,
    },
    billingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: MedicalBilling,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    serviceItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ServiceItem,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    paymentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Payment,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.quantity * this.unitPrice - this.discount + this.tax;
      },
      set(value) {
        throw new Error("Do not try to set the `total` value!");
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "billed_line_items",
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
  }
);

export default BilledLineItem;
