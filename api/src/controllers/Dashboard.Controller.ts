import { Request, RequestHandler, Response } from "express";
import {
  Appointment,
  Employee,
  InvestigationOrder,
  Patient,
  PatientAssignment,
  Permission,
  Role,
  User,
} from "../models";
import sequelize from "sequelize";

const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
const { format } = require("date-fns");
// module.exports = DashboardController = {
export const getDashboardData: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const {} = req.query;
    let where = {};
    // let totalUpcomingAppointment;
    // let totalUpcomingPatientVisit;
    let totalUser;
    let totalDoctor;
    let totalPatient;
    const permissions = await Permission.findAll();
    // const role = await db.Role.findByPk(req.user.role_id);
    const totalCompletedLab = await InvestigationOrder.count({
      where: { status: false },
    });
    const { count: totalUpcomingAppointment, rows: appointments } =
      await Appointment.findAndCountAll({
        // where: {
        // appointment_date: {
        //   [Op.gte]: new Date(),
        // },
        // appointment_date: new Date().toISOString().substring(0, 10),
        // status: "upcoming",
        // },
        include: [
          {
            model: db.Patient,
            as: "patient",
            attributes: ["firstName", "middleName", "lastName", "id"],
          },
          {
            model: User,
            as: "doctor",
            include: [
              {
                model: Employee,
                as: "employee",
                attributes: ["firstName", "middleName", "lastName", "id"],
              },
            ],
            attributes: ["id"],
          },
        ],
      });
    // let where = {}
    // if (req.user.role_id === 2) {
    //   where.doctor_id = req.user.id;
    // }

    const { count: totalUpcomingPatientVisit, rows: active_Visits } =
      await PatientAssignment.findAndCountAll({
        where: {
          ...where,
          // [Op.or]: [
          //   {
          //     visit_date: new Date().toISOString().substring(0, 10),
          //     visit_time: {
          //       [Op.gte]: format(new Date(), "HH:mm:ss"),
          //     },
          //   },
          //   {
          //     visit_date: {
          //       [Op.gt]: new Date().toISOString().substring(0, 10),
          //     },
          //   },
          // ],
          status: true,
        },
        // where: where,
        include: [
          {
            model: Patient,
            as: "patient",
            attributes: [
              "id",
              "firstName",
              "lastName",
              "middleName",
              "card_number",
              "birth_date",
              "gender",
            ],
          },
          {
            model: User,
            as: "doctor",
            include: [
              {
                model: Employee,
                as: "employee",
                attributes: ["id", "firstName", "middleName", "lastName"],
              },
            ],
            attributes: ["id"],
          },
        ],
      });
    totalUser = await User.count();
    totalDoctor = await User.count({
      where: {
        role_id: 2,
      },
    });
    // return group by role.name [{role_name: "Doctor", count: 2}, {role_name: "Patient", count: 2}]
    const userGroupByRoleAndCount = await User.findAll({
      attributes: [[sequelize.fn("count", sequelize.col("role_id")), "count"]],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["name"],
        },
      ],
      group: ["role_id"],
    });
    totalPatient = await Patient.count();
    res.json({
      permissions,
      totalCompletedLab,
      totalUpcomingAppointment,
      totalUpcomingPatientVisit,
      totalUser,
      totalDoctor,
      totalPatient,
      userGroupByRoleAndCount,
      active_Visits,
      appointments,
    });
    // console.log(totalUpcomingAppointment);
    // // if (req.query.status) {
    // //     where.status = req.query.status;
    // // }
    // // console.log(where);
    // console.log(req.user);
    // console.log("\n\n bljhbjh\n\n");
    // res.json({ msg: totalUpcomingAppointment });
  }
);
export const getUpcomingAppointmentData: RequestHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, { appintmentDate: string }>,
    res: Response
  ) => {
    const {} = req.query;

    let where: any = {};
    if (req.query.appintmentDate) {
      where.appointment_date = new Date(req.query.appintmentDate)
        .toISOString()
        .substring(0, 10);
    } else {
      where.appointment_date = new Date().toISOString().substring(0, 10);
    }
    const appointments = await db.Appointment.findAll({
      where: {
        // appointment_date: {
        //   [Op.gte]: new Date(),
        // },
        // ...where,
        status: "upcoming",
      },
      include: [
        {
          model: db.Patient,
          as: "patient",
          attributes: ["firstName", "middleName", "lastName", "id"],
        },
        {
          model: db.User,
          as: "doctor",
          include: [
            {
              model: db.Employee,
              as: "employee",
              attributes: ["firstName", "middleName", "lastName", "id"],
            },
          ],
          attributes: ["id"],
        },
      ],
    });
    res.json(appointments);
  }
);
//get upcomig patient visit
export const getUpcomingPatientVisitData = asyncHandler(
  async (req: Request, res: Response) => {
    let where = {};
    // if (req.user.role_id === 2) {
    //   where.doctor_id = req.user.id;
    // }
    const visits = await db.PatientAssignment.findAll({
      where: {
        ...where,
        [Op.or]: [
          {
            assignment_date: new Date().toISOString().substring(0, 10),
            visit_time: {
              [Op.gte]: format(new Date(), "HH:mm:ss"),
            },
          },
          {
            assignment_date: {
              [Op.gt]: new Date().toISOString().substring(0, 10),
            },
          },
        ],
      },
      // where: where,
      include: [
        {
          model: db.Patient,
          as: "patient",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "middleName",
            "card_number",
            "birth_date",
            "gender",
          ],
        },
        {
          model: db.User,
          as: "doctor",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
      ],
    });
    res.json(visits);
  }
);
//get doctor working hour
export const getDoctorWorkingHourData = asyncHandler(
  async (req: Request, res: Response) => {
    // 7 day of week
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[new Date().getDay()];
    // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const DoctorsWorkingHour = await db.User.findAll({
      where: {
        role_id: 2,
        status: true,
      },
      include: [
        {
          model: db.Schedule,
          as: "schedules",
          where: {
            day_of_week: day,
          },
        },
        {
          model: db.Employee,
          as: "employee",
          attributes: ["id", "firstName", "middleName", "lastName"],
        },
      ],
      attributes: ["id"],
    });

    // await db.Schedule.findAll({
    //   where: {
    //     doctor_id: { [Op.ne]: null },
    //   },
    //   group: "day_of_week",
    // });
    res.json(DoctorsWorkingHour);
  }
);
// };
