const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const EmergencyContact = sequelize.define("emergencycontact", {
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
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
  EmergencyContact.sync({ alter: false });
  return EmergencyContact;
};
