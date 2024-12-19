const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const VitalSignField = sequelize.define("vital_sign_field", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    inputType: {
      type: DataTypes.ENUM,
      values: ["number", "text", "date", "select", "radio", "checkbox"],
      defaultValue: "number",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  VitalSignField.sync({ alter: false, force: false });
  return VitalSignField;
};
