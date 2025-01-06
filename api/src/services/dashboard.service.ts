import { Request } from "express-serve-static-core";
import {
  Appointment,
  Employee,
  InvestigationOrder,
  MedicalBilling,
  Patient,
  PatientAssignment,
  Role,
  Schedule,
  User,
} from "../models";
import sequelize from "sequelize";
/**
 * @param req
 *
 *
 */
export const getDashboardData = async (req: Request) => {
  const role = req.user?.role;
  const permissions = req.user?.permissions;
  let totalUser;
  // let totalDoctor;
  //   let totalPatient;
  // const permissions = await Permission.findAll();
  // const role = await db.Role.findByPk(req.user.role_id);
  const totalCompletedLab = await InvestigationOrder.count({
    where: { status: false },
  });
  let where: any = {};
  if (role?.toLowerCase() === "Doctor".toLowerCase()) {
    where.doctor_id = req.user?.id;
  }
  const { count: totalUpcomingAppointment, rows: appointments } =
    await Appointment.findAndCountAll({
      where: {
        ...where,
      },
      attributes: [
        "id",
        "appointment_time",
        "appointment_date",
        "patient_name",
        "status",
      ],
      include: [
        // {
        //   model: Patient,
        //   as: "patient",
        //   attributes: ["firstName", "middleName", "lastName", "id"],
        // },
        // {
        //   model: User,
        //   as: "doctor",
        //   include: [
        //     {
        //       model: Employee,
        //       as: "employee",
        //       attributes: ["firstName", "middleName", "lastName", "id"],
        //     },
        //   ],
        //   attributes: ["id"],
        // },
      ],
    });

  const { count: totalUpcomingPatientVisit, rows: active_Visits } =
    await PatientAssignment.findAndCountAll({
      where: {
        ...where,
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
            "gender",
          ],
        },
        // {
        //   model: User,
        //   as: "doctor",
        //   include: [
        //     {
        //       model: Employee,
        //       as: "employee",
        //       attributes: ["id", "firstName", "middleName", "lastName"],
        //     },
        //   ],
        //   attributes: ["id"],
        // },
      ],
      attributes: ["id", "visit_date", "visit_time", "status"],
    });
  totalUser = await User.count();
  // totalDoctor = await User.count({
  //   where: {
  //     role_id: 2,
  //   },
  // });

  let userGroupByRoleAndCount: any[] = [];
  // if (permissions?.find((p) => p.name.toLowerCase() === "user" && p.read))

  userGroupByRoleAndCount = await User.findAll({
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
  // console.log(userGroupByRoleAndCount);

  // if (permissions?.find((p) => p.name.toLowerCase() === "patient" && p.read)) {
  const totalPatient = await Patient.count();
  // }
  return {
    totalCompletedLab,
    totalUpcomingAppointment,
    totalUpcomingPatientVisit,
    totalUser,
    totalPatient,
    userGroupByRoleAndCount,
    active_Visits,
    appointments,
  };
};

export const getActiveAppointments = async (req: Request) => {
  let where: any = {};
  const role = req.user?.role;
  if (role?.toLowerCase() === "doctor") {
    where.doctor_id = req.user?.id;
  }
  const { count: totalUpcomingAppointment, rows: appointments } =
    await Appointment.findAndCountAll({
      where: {
        ...where,
      },
      include: [
        {
          model: Patient,
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
  return { totalUpcomingAppointment, appointments };
};

export const getActivePatientVisit = async (req: Request) => {
  let where: any = {};
  const role = req.user?.role;
  if (role?.toLowerCase() === "doctor") {
    where.doctor_id = req.user?.id;
  }
  const { count: totalUpcomingPatientVisit, rows: active_Visits } =
    await PatientAssignment.findAndCountAll({
      where: {
        ...where,
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
  return { totalUpcomingPatientVisit, active_Visits };
};
export const getDoctorWorkingHours = async () => {
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
  const DoctorsWorkingHours = await User.findAll({
    where: {
      role_id: 2,
      status: true,
    },
    include: [
      {
        model: Schedule,
        as: "schedules",
        where: {
          day_of_week: day,
        },
      },
      {
        model: Employee,
        as: "employee",
        attributes: ["id", "firstName", "middleName", "lastName"],
      },
    ],
    attributes: ["id"],
  });
  return DoctorsWorkingHours;
};
/**
 * Get Lab Investigation Data
 * @returns {Promise<[{count: number; status: "Completed" | "Pending"}]>}
 *
 */
export const getLabInvestigationData = async (): Promise<
  { count: number; status: "Completed" | "Pending" }[]
> => {
  const totalLabs = await InvestigationOrder.count({
    attributes: [[sequelize.fn("count", sequelize.col("status")), "count"]],
    // where: { status: false },
    group: ["status"],
  });
  const totalLabsData: { count: number; status: "Completed" | "Pending" }[] =
    totalLabs.map((i) => {
      const { count, status } = i as { count: number; status: 0 | 1 };
      return { count: i.count, status: status === 0 ? "Completed" : "Pending" };
    });
  //   const [totalCompletedLab] = await Promise.all([
  //     InvestigationOrder.count({
  //       attributes: [[sequelize.fn("count", sequelize.col("status")), "count"]],
  //       // where: { status: false },
  //       group: ["status"],
  //     }),

  //   ]);
  return totalLabsData;
};
/**
 * Get Payment Data
 * @returns {Promise<[{count: number; status: "Completed" | "Pending"}]>}
 *
 */
export const getPaymentData = async (): Promise<
  { count: number; status: "Completed" | "Pending" }[]
> => {
  const totalBilling = await MedicalBilling.count({
    attributes: [[sequelize.fn("count", sequelize.col("status")), "count"]],
    // where: { status: false },
    group: ["status"],
  });
  const totalBillingData: { count: number; status: "Completed" | "Pending" }[] =
    totalBilling.map((i) => {
      const { count, status } = i as { count: number; status: 0 | 1 };
      return { count: count, status: status === 0 ? "Completed" : "Pending" };
    });
  return totalBillingData;
};
