const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const PhysicalExaminationField = sequelize.define(
    "physical_examination_field",
    {
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
        defaultValue: "text",
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }
  );

  return PhysicalExaminationField;
};
