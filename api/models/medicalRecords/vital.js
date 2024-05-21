const { sequelize } = require("..");

// vital signs sequilize model
module.exports = (sequelize, DataTypes) => {
  const Vital = sequelize.define("vital", {
    medicalRecord_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    examiner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taken_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    vitalSignField_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Vital.sync({ alter: false });
  return Vital;
};
