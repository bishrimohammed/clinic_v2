const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define("schedule", {
    clinic_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    day_of_week: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  });
  Schedule.sync({ alter: false, force: false });
  return Schedule;
};
