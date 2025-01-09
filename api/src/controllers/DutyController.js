const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
const {
  startOfWeek,
  getWeek,
  endOfWeek,
  getISOWeek,
  differenceInDays,
} = require("date-fns");
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
          [Op.gte]: endOfWeek,
        },
        // weekEndDate: {
        //   [Op.gte]: startOfWeek,
        // },
      },
    });
    res.json(thisWeekDutyProgram);
  }),
  getDutyPrograms: asyncHandler(async (req, res) => {
    const today = new Date();
    // const startOfWeek = new Date(today);
    // startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7) + 1); // Set to the first day of the week (Monday)
    // const endOfWeek = new Date(today);
    // endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the last day of the week (Sunday)
    // console.log(startOfWeek);
    const thisWeekDutyProgram = await db.DutyProgram.findAll({
      where: {
        weekStartDate: {
          [Op.gte]: startOfWeek(new Date(), { weekStartsOn: 1 }),
        },
        // weekEndDate: {
        //   [Op.gte]: startOfWeek,
        // },
      },
      include: [
        {
          model: db.DutyAssignment,
          as: "dutyAssignments",
          include: [
            {
              model: db.Employee,
              as: "employee",
              attributes: ["id", "firstName", "middleName", "lastName"],
            },
          ],
        },
      ],
    });
    res.json(thisWeekDutyProgram);
  }),
  getDutyProgramById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const dutyProgram = await db.DutyProgram.findByPk(id, {
      include: [
        {
          model: db.DutyAssignment,
          as: "dutyAssignments",
          include: [
            {
              model: db.Employee,
              as: "employee",
              attributes: ["id", "firstName", "middleName", "lastName"],
            },
          ],
        },
      ],
    });
    res.json(dutyProgram);
  }),
  createDutyprogram: asyncHandler(async (req, res) => {
    const { weekStartDate, weekEndDate, week } = req.body;
    console.log(req.body);
    // const startOfWeek = new Date(weekStartDate);
    // startOfWeek.setDate(
    //   startOfWeek.getDate() - ((startOfWeek.getDay() + 6) % 7) + 1
    // ); // Set to the first day of the week (Monday)
    // const endOfWeek = new Date(weekEndDate);
    // endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the last day of the week (Sunday)
    // const weekNumber = getWeek(startOfWeek, { weekStartsOn: 1 });
    const startDate = new Date(weekStartDate.substring(0, 10));
    const endDate = new Date(weekEndDate.substring(0, 10));
    console.log(startDate, endDate);
    console.log(differenceInDays(weekEndDate, weekStartDate));
    if (differenceInDays(endDate, startDate) !== 6) {
      res.status(400);
      throw new Error("Invalid date: " + weekStartDate + " and " + weekEndDate);
    }
    const existingDutyProgram = await db.DutyProgram.findOne({
      where: {
        // weekStartDate: {
        //   [Op.lte]: startDate.toISOString().substring(0, 10),
        // },
        weekStartDate: startDate.toISOString().substring(0, 10),
        weekEndDate: endDate.toISOString().substring(0, 10),
      },
    });
    console.log(getISOWeek(startDate));
    if (existingDutyProgram) {
      res.status(400);
      // message: "A DutyProgram already exists for the specified week."
      throw new Error("Duty Program already exists for the specified week");
    }
    const dutyProgram = await db.DutyProgram.create({
      weekStartDate,
      weekEndDate,
      duty_week: getISOWeek(weekStartDate),
      year: new Date(weekStartDate).getFullYear(),
      status:
        getISOWeek(weekStartDate) === getWeek(new Date(), { weekStartsOn: 1 })
          ? true
          : false,
    });
    res.status(201).json(dutyProgram);
  }),
  assignDutyToEmployee: asyncHandler(async (req, res) => {
    const { duty_id, employee_id, duty_date } = req.body;
    const duty = await db.DutyProgram.findOne({
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
    const ExistAssignments = await db.DutyAssignment.findOne({
      where: {
        dutyprogram_id: duty_id,
        employee_id,
        duty_date,
      },
    });
    if (ExistAssignments) {
      res.status(400);
      throw new Error(
        `${employee.firstName} ${employee.middleName} already assigned for ${duty_date} day duty `
      );
    }
    const dutyAssignment = await db.DutyAssignment.create({
      dutyprogram_id: duty_id,
      employee_id,
      duty_date,
    });
    res.status(201).json(dutyAssignment);
  }),
};
