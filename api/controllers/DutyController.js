const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
const { startOfWeek, getWeek } = require("date-fns");
module.exports = DutyController = {
  getThisWeekDutyProgram: asyncHandler(async (req, res) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7) + 1); // Set to the first day of the week (Monday)
    const endOfWeek = new Date(today);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the last day of the week (Sunday)

    const thisWeekDutyProgram = await db.DutyProgram.findAll({
      where: {
        weekStartDate: {
          [Op.lte]: endOfWeek,
        },
        weekEndDate: {
          [Op.gte]: startOfWeek,
        },
      },
    });
    res.json(thisWeekDutyProgram);
  }),
  createDutyprogram: asyncHandler(async (req, res) => {
    const { weekStartDate, weekEndDate } = req.body;
    const startOfWeek = new Date(weekStartDate);
    startOfWeek.setDate(
      startOfWeek.getDate() - ((startOfWeek.getDay() + 6) % 7) + 1
    ); // Set to the first day of the week (Monday)
    const endOfWeek = new Date(weekEndDate);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the last day of the week (Sunday)
    const weekNumber = getWeek(date, { weekStartsOn: 1 });
    const existingDutyProgram = await db.DutyProgram.findOne({
      where: {
        weekStartDate: {
          [Op.lte]: endOfWeek,
        },
        weekEndDate: {
          [Op.gte]: startOfWeek,
        },
      },
    });

    if (existingDutyProgram) {
      res.status(400);
      // message: "A DutyProgram already exists for the specified week."
      throw new Error("Duty Program already exists for the specified week");
    }
    const dutyProgram = await db.DutyProgram.create({
      weekStartDate,
      weekEndDate,
      duty_week: weekNumber,
      year: new Date(weekStartDate).getFullYear(),
    });
    res.status(201).json(dutyProgram);
  }),
  assignDutyToEmployee: asyncHandler(async (req, res) => {
    const { duty_id, employee_id, duty_date } = req.body;
    const duty = await db.Duty.findOne({
      where: {
        id: duty_id,
      },
    });
    const employee = await db.Employee.findOne({
      where: {
        id: employee_id,
      },
    });
    if (!duty || !employee) {
      res.status(400);
      throw new Error("Invalid Duty or Employee");
    }
    const dutyAssignment = await db.DutyAssignment.create({
      duty_id,
      employee_id,
      duty_date,
    });
    res.status(201).json(dutyAssignment);
  }),
};
