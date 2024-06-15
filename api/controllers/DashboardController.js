const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
const { format } = require("date-fns");
module.exports = DashboardController = {
  getDashboardData: asyncHandler(async (req, res) => {
    const {} = req.query;
    let where = {};
    let totalUpcomingAppointment;
    let totalUpcomingPatientVisit;
    let totalUser;
    let totalDoctor;
    let totalPatient;

    const role = await db.Role.findByPk(req.user.role_id);
    totalUpcomingAppointment = await db.Appointment.count({
      where: {
        // appointment_date: {
        //   [Op.gte]: new Date(),
        // },
        appointment_date: new Date().toISOString().substring(0, 10),
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
    // let where = {}
    if (req.user.role_id === 2) {
      where.doctor_id = req.user.id;
    }
    totalUpcomingPatientVisit = await db.PatientAssignment.count({
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
    totalUser = await db.User.count();
    totalDoctor = await db.User.count({
      where: {
        role_id: 2,
      },
    });
    totalPatient = await db.Patient.count();
    res.json({
      totalUpcomingAppointment,
      totalUpcomingPatientVisit,
      totalUser,
      totalDoctor,
      totalPatient,
    });
    // console.log(totalUpcomingAppointment);
    // // if (req.query.status) {
    // //     where.status = req.query.status;
    // // }
    // // console.log(where);
    // console.log(req.user);
    // console.log("\n\n bljhbjh\n\n");
    // res.json({ msg: totalUpcomingAppointment });
  }),
  getUpcomingAppointmentData: asyncHandler(async (req, res) => {
    const { appintmentDate } = req.query;
    let where = {};
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
  }),
  //get upcomig patient visit
  getUpcomingPatientVisitData: asyncHandler(async (req, res) => {
    let where = {};
    if (req.user.role_id === 2) {
      where.doctor_id = req.user.id;
    }
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
  }),
  //get doctor working hour
  getDoctorWorkingHourData: asyncHandler(async (req, res) => {
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
  }),
};
