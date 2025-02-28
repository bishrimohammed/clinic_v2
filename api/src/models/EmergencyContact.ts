import {
  Model,
  DataTypes,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import Address from "./address/Address";

class EmergencyContact extends Model<
  InferAttributes<EmergencyContact>,
  InferCreationAttributes<EmergencyContact>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare middleName: string;
  declare lastName: string | null;
  declare relationship: string;
  declare other_relationship: string | null;
  declare address_id: number;
  declare phone: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

EmergencyContact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relationship: {
      type: DataTypes.STRING,
      allowNull: false,
      // values: ["Father", "Mother", "Spouse", "Other"],
    },
    other_relationship: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Address,
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
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
  { sequelize, tableName: "emergencycontacts" }
);
EmergencyContact.belongsTo(Address, {
  foreignKey: "address_id",
  as: "address",
});
export default EmergencyContact;
