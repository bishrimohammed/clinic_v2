import { Request, RequestHandler, Response } from "express";

import { dashboardService } from "../services";

const asyncHandler = require("express-async-handler");

// module.exports = DashboardController = {
export const getDashboardData: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    //     const {} = req.query;
    //     let where = {};
    //     // let totalUpcomingAppointment;
    //     // let totalUpcomingPatientVisit;
    //     let totalUser;
    //     let totalDoctor;
    //     let totalPatient;
    // const permissions = await Permission.findAll()
    //     // const role = await db.Role.findByPk(req.user.role_id);
    //     const totalCompletedLab = await InvestigationOrder.count({
    //       where: { status: false },
    //     });
    //     const { count: totalUpcomingAppointment, rows: appointments } =
    //       await Appointment.findAndCountAll({
    //         // where: {
    //         // appointment_date: {
    //         //   [Op.gte]: new Date(),
    //         // },
    //         // appointment_date: new Date().toISOString().substring(0, 10),
    //         // status: "upcoming",
    //         // },
    //         include: [
    //           {
    //             model: db.Patient,
    //             as: "patient",
    //             attributes: ["firstName", "middleName", "lastName", "id"],
    //           },
    //           {
    //             model: User,
    //             as: "doctor",
    //             include: [
    //               {
    //                 model: Employee,
    //                 as: "employee",
    //                 attributes: ["firstName", "middleName", "lastName", "id"],
    //               },
    //             ],
    //             attributes: ["id"],
    //           },
    //         ],
    //       });
    //     // let where = {}
    //     // if (req.user.role_id === 2) {
    //     //   where.doctor_id = req.user.id;
    //     // }

    //     const { count: totalUpcomingPatientVisit, rows: active_Visits } =
    //       await PatientAssignment.findAndCountAll({
    //         where: {
    //           ...where,
    //           // [Op.or]: [
    //           //   {
    //           //     visit_date: new Date().toISOString().substring(0, 10),
    //           //     visit_time: {
    //           //       [Op.gte]: format(new Date(), "HH:mm:ss"),
    //           //     },
    //           //   },
    //           //   {
    //           //     visit_date: {
    //           //       [Op.gt]: new Date().toISOString().substring(0, 10),
    //           //     },
    //           //   },
    //           // ],
    //           status: true,
    //         },
    //         // where: where,
    //         include: [
    //           {
    //             model: Patient,
    //             as: "patient",
    //             attributes: [
    //               "id",
    //               "firstName",
    //               "lastName",
    //               "middleName",
    //               "card_number",
    //               "birth_date",
    //               "gender",
    //             ],
    //           },
    //           {
    //             model: User,
    //             as: "doctor",
    //             include: [
    //               {
    //                 model: Employee,
    //                 as: "employee",
    //                 attributes: ["id", "firstName", "middleName", "lastName"],
    //               },
    //             ],
    //             attributes: ["id"],
    //           },
    //         ],
    //       });
    //     totalUser = await User.count();
    //     totalDoctor = await User.count({
    //       where: {
    //         role_id: 2,
    //       },
    //     });
    //     // return group by role.name [{role_name: "Doctor", count: 2}, {role_name: "Patient", count: 2}]
    //     const userGroupByRoleAndCount = await User.findAll({
    //       attributes: [[sequelize.fn("count", sequelize.col("role_id")), "count"]],
    //       include: [
    //         {
    //           model: Role,
    //           as: "role",
    //           attributes: ["name"],
    //         },
    //       ],
    //       group: ["role_id"],
    //     });
    //     totalPatient = await Patient.count();
    // res.json({
    //   permissions,
    //   totalCompletedLab,
    //   totalUpcomingAppointment,
    //   totalUpcomingPatientVisit,
    //   totalUser,
    //   totalDoctor,
    //   totalPatient,
    //   userGroupByRoleAndCount,
    //   active_Visits,
    //   appointments,
    // });

    const data = await dashboardService.getDashboardData(req);
    res.json(data);
  }
);
export const getUpcomingAppointmentData: RequestHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, { appintmentDate: string }>,
    res: Response
  ) => {
    const appintmentData = await dashboardService.getActiveAppointments(req);
    res.json(appintmentData);
  }
);
//get upcomig patient visit
export const getUpcomingPatientVisitData = asyncHandler(
  async (req: Request, res: Response) => {
    const visitData = await dashboardService.getActivePatientVisit(req);
    res.json(visitData);
  }
);
//get doctor working hour
export const getDoctorWorkingHourData = asyncHandler(
  async (req: Request, res: Response) => {
    // 7 day of week
    const DoctorsWorkingHours = await dashboardService.getDoctorWorkingHours();
    res.json(DoctorsWorkingHours);
  }
);

export const getLabInvestigationData = asyncHandler(
  async (req: Request, res: Response) => {
    const labData = await dashboardService.getLabInvestigationData();
    res.json(labData);
  }
);

export const getPaymentData = asyncHandler(
  async (req: Request, res: Response) => {
    const paymentData = await dashboardService.getPaymentData();
    res.json(paymentData);
  }
);
