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
    taken_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    progressNote_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // vital_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
  });
  Vital.sync({ alter: true });
  return Vital;
};
