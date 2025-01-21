// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const EmergencyContact = sequelize.define(
//     "emergencycontact",
//     {
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       middleName: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       relationship: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         // values: ["Father", "Mother", "Spouse", "Other"],
//       },
//       other_relationship: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       address_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       phone: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false,
//       },
//     },
//     {
//       hooks: {
//         afterCreate: async (emergencycontact, options) => {
//           await sequelize.models.emergency_contacts_audit.create({
//             emergency_contact_id: emergencycontact.id,
//             firstName: emergencycontact.firstName,
//             lastName: emergencycontact.lastName,
//             middleName: emergencycontact.middleName,
//             relationship: emergencycontact.relationship,
//             other_relationship: emergencycontact.other_relationship,
//             address_id: emergencycontact.address_id,
//             phone: emergencycontact.phone,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (emergencycontact, options) => {
//           const previousValue = emergencycontact._previousDataValues;
//           await sequelize.models.emergency_contacts_audit.create({
//             emergency_contact_id: previousValue.id,
//             firstName: previousValue.firstName,
//             lastName: previousValue.lastName,
//             middleName: previousValue.middleName,
//             relationship: previousValue.relationship,
//             other_relationship: previousValue.other_relationship,
//             address_id: previousValue.address_id,
//             phone: previousValue.phone,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         // beforeDestroy: async (emergencycontact, options) => {

//         // },
//       },
//     }
//   );
//   EmergencyContact.sync({ alter: false });
//   return EmergencyContact;
// };

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
