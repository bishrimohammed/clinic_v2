const { Op } = require("sequelize");
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "schedule",
    {
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
            let whereClause = {
              id: { [Op.ne]: this.id },
              day_of_week: this.day_of_week,
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
            };

            // Check if doctor_id is not null before adding it to the whereClause
            if (this.doctor_id) {
              whereClause.doctor_id = { [Op.eq]: this.doctor_id };
              const existingSchedule = await Schedule.findOne({
                where: whereClause,
              });
              if (existingSchedule) {
                throw new Error("Work Hour overlap detected");
              }
            }
          },
        },
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterCreate: async (schedule, options) => {
          await sequelize.models.schedules_audit.create({
            schedule_id: schedule.id,
            clinic_id: schedule.clinic_id,
            doctor_id: schedule.doctor_id,
            day_of_week: schedule.day_of_week,
            start_time: schedule.start_time,
            end_time: schedule.end_time,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (schedule, options) => {
          const previousSchedule = schedule._previousDataValues;
          await sequelize.models.schedules_audit.create({
            schedule_id: schedule.id,
            clinic_id: previousSchedule.clinic_id,
            doctor_id: previousSchedule.doctor_id,
            day_of_week: previousSchedule.day_of_week,
            start_time: previousSchedule.start_time,
            end_time: previousSchedule.end_time,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (schedule, options) => {
          await sequelize.models.schedules_audit.create({
            schedule_id: schedule.id,
            clinic_id: schedule.clinic_id,
            doctor_id: schedule.doctor_id,
            day_of_week: schedule.day_of_week,
            start_time: schedule.start_time,
            end_time: schedule.end_time,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  Schedule.sync({ alter: false, force: false });
  return Schedule;
};
