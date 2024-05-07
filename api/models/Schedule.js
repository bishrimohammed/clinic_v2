const { Op } = require("sequelize");
const { sequelize, Sequelize } = require(".");

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
      validate: {
        async checkScheduleOverlap(value) {
          // console.log(this.doctor_id);
          // console.log(this.day_of_week);
          const existingSchedule = await Schedule.findOne({
            where: {
              id: { [Op.ne]: this.id },
              day_of_week: this.day_of_week,
              doctor_id: this.doctor_id,
              [Op.or]: [
                {
                  start_time: { [Op.lt]: value },
                  end_time: { [Op.gt]: value },
                },
                {
                  start_time: { [Op.lt]: this.end_time },
                  end_time: { [Op.gt]: this.end_time },
                },
                {
                  start_time: { [Op.gte]: value },
                  end_time: { [Op.lte]: this.end_time },
                },
              ],
            },
          });

          if (existingSchedule) {
            throw new Error("Work Hour overlap detected");
          }
        },
      },
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  });
  Schedule.sync({ alter: false, force: false });
  return Schedule;
};
