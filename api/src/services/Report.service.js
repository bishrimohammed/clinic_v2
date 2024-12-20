// const { format } = require("sequelize/lib/utils");
const db = require("../models");
const {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  setHours,
  format,
} = require("date-fns");
const getWeeklyAppointedPatient = async () => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });

  const appointments = await db.Appointment.findAll({
    where: {
      appointment_date: {
        [db.Sequelize.Op.between]: [weekStart, weekEnd],
      },
    },
    include: [
      {
        model: db.Patient,
        as: "patient",
        attributes: ["firstName", "lastName", "id"],
      },
    ],
    attributes: [
      "id",
      "appointment_date",
      "appointment_type",
      "status",
      "patient_name",
    ],
  });
  return { appointments, start: weekStart, end: weekEnd };
};
const getMonthlyAppointedPatient = async () => {
  const monthStart = startOfMonth(new Date());
  const localMonthStart = setHours(monthStart, 0, 0, 0, 0);
  const monthEnd = endOfMonth(new Date());

  const appointments = await db.Appointment.findAll({
    where: {
      appointment_date: {
        [db.Sequelize.Op.between]: [
          format(localMonthStart, "yyyy-MM-dd"),
          format(monthEnd, "yyyy-MM-dd"),
        ],
      },
    },
    include: [
      {
        model: db.Patient,
        as: "patient",
        attributes: ["firstName", "lastName", "id"],
      },
    ],
    attributes: [
      "id",
      "appointment_date",
      "appointment_type",
      "status",
      "patient_name",
    ],
  });
  return {
    appointments,
    start: format(localMonthStart, "yyyy-MM-dd"),
    end: format(monthEnd, "yyyy-MM-dd"),
  };
};

const getYearlyAppointedPatient = async () => {
  const yearStart = startOfYear(new Date());
  const localYearStart = setHours(yearStart, 0, 0, 0, 0);
  const yearEnd = endOfYear(new Date());

  const appointments = await db.Appointment.findAll({
    where: {
      appointment_date: {
        [db.Sequelize.Op.between]: [
          format(localYearStart, "yyyy-MM-dd"),
          format(yearEnd, "yyyy-MM-dd"),
        ],
      },
    },
    include: [
      {
        model: db.Patient,
        as: "patient",
        attributes: ["firstName", "middleName", "lastName", "id"],
      },
    ],
    attributes: [
      "id",
      "appointment_date",
      "appointment_type",
      "status",
      "patient_name",
    ],
  });
  return {
    appointments,
    start: format(localYearStart, "yyyy-MM-dd"),
    end: format(yearEnd, "yyyy-MM-dd"),
  };
};

/// visit
const getWeeklyVisitedPatient = async () => {
  const weekStart = startOfWeek(new Date());
  const localWeekStart = setHours(weekStart, 0, 0, 0, 0);
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });
  const visits = await db.PatientAssignment.findAll({
    where: {
      assignment_date: {
        [db.Sequelize.Op.between]: [
          format(localWeekStart, "yyyy-MM-dd"),
          format(weekEnd, "yyyy-MM-dd"),
        ],
      },
    },
    include: [
      {
        model: db.Patient,
        as: "patient",
        attributes: ["firstName", "middleName", "lastName", "id"],
      },
    ],
    attributes: ["id", "visit_type", "assignment_date"],
  });
  return {
    visits,
    start: format(localWeekStart, "yyyy-MM-dd"),
    end: format(weekEnd, "yyyy-MM-dd"),
  };
};

const getMonthlyVisitedPatient = async () => {
  const monthStart = startOfMonth(new Date());
  const localMonthStart = setHours(monthStart, 0, 0, 0, 0);
  const monthEnd = endOfMonth(new Date());
  const visits = await db.PatientAssignment.findAll({
    where: {
      assignment_date: {
        [db.Sequelize.Op.between]: [
          format(localMonthStart, "yyyy-MM-dd"),
          format(monthEnd, "yyyy-MM-dd"),
        ],
      },
    },
    include: [
      {
        model: db.Patient,
        as: "patient",
        attributes: ["firstName", "middleName", "lastName", "id"],
      },
    ],
    attributes: ["id", "visit_type", "assignment_date"],
  });
  return {
    visits,
    start: format(localMonthStart, "yyyy-MM-dd"),
    end: format(monthEnd, "yyyy-MM-dd"),
  };
};

const getYearlyVisitedPatient = async () => {
  const yearStart = startOfYear(new Date());
  const localYearStart = setHours(yearStart, 0, 0, 0, 0);
  const yearEnd = endOfYear(new Date());
  const visits = await db.PatientAssignment.findAll({
    where: {
      assignment_date: {
        [db.Sequelize.Op.between]: [
          format(localYearStart, "yyyy-MM-dd"),
          format(yearEnd, "yyyy-MM-dd"),
        ],
      },
    },
    include: [
      {
        model: db.Patient,
        as: "patient",
        attributes: ["firstName", "middleName", "lastName", "id"],
      },
    ],
    attributes: ["id", "visit_type", "assignment_date"],
  });
  return {
    visits,
    start: format(localYearStart, "yyyy-MM-dd"),
    end: format(yearEnd, "yyyy-MM-dd"),
  };
};

/// Admitted
const getWeeklyAdmittedPatient = async () => {
  const weekStart = startOfWeek(new Date());
  const localWeekStart = setHours(weekStart, 0, 0, 0, 0);
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });
  const visits = await db.PatientAssignment.findAll({
    where: {
      assignment_date: {
        [db.Sequelize.Op.between]: [
          format(localWeekStart, "yyyy-MM-dd"),
          format(weekEnd, "yyyy-MM-dd"),
        ],
      },
      isAdmitted: true,
    },
    include: [
      {
        model: db.Patient,
        as: "patient",
        attributes: ["firstName", "middleName", "lastName", "id"],
      },
    ],
    attributes: ["id", "visit_type", "assignment_date"],
  });
  return {
    visits,
    start: format(localWeekStart, "yyyy-MM-dd"),
    end: format(weekEnd, "yyyy-MM-dd"),
  };
};

const getMonthlyAdmittedPatient = async () => {
  const monthStart = startOfMonth(new Date());
  const localMonthStart = setHours(monthStart, 0, 0, 0, 0);
  const monthEnd = endOfMonth(new Date());
  const visits = await db.PatientAssignment.findAll({
    where: {
      assignment_date: {
        [db.Sequelize.Op.between]: [
          format(localMonthStart, "yyyy-MM-dd"),
          format(monthEnd, "yyyy-MM-dd"),
        ],
      },
      isAdmitted: true,
    },
    include: [
      {
        model: db.Patient,
        as: "patient",
        attributes: ["firstName", "middleName", "lastName", "id"],
      },
    ],
    attributes: ["id", "visit_type", "assignment_date"],
  });
  return {
    visits,
    start: format(localMonthStart, "yyyy-MM-dd"),
    end: format(monthEnd, "yyyy-MM-dd"),
  };
};

const getYearlyAdmittedPatient = async () => {
  const yearStart = startOfYear(new Date());
  const localYearStart = setHours(yearStart, 0, 0, 0, 0);
  const yearEnd = endOfYear(new Date());
  const visits = await db.PatientAssignment.findAll({
    where: {
      assignment_date: {
        [db.Sequelize.Op.between]: [
          format(localYearStart, "yyyy-MM-dd"),
          format(yearEnd, "yyyy-MM-dd"),
        ],
      },
      isAdmitted: true,
    },
    include: [
      {
        model: db.Patient,
        as: "patient",
        attributes: ["firstName", "middleName", "lastName", "id"],
      },
    ],
    attributes: ["id", "visit_type", "assignment_date"],
  });
  return {
    visits,
    start: format(localYearStart, "yyyy-MM-dd"),
    end: format(yearEnd, "yyyy-MM-dd"),
  };
};
/// Visit Per Doctor

const getWeeklyVisitSeenPerDoctor = async () => {
  const weekStart = startOfWeek(new Date());
  const localWeekStart = setHours(weekStart, 0, 0, 0, 0);
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });
  const visits = await db.PatientAssignment.findAll({
    where: {
      assignment_date: {
        [db.Sequelize.Op.between]: [
          format(localWeekStart, "yyyy-MM-dd"),
          format(weekEnd, "yyyy-MM-dd"),
        ],
      },
    },
    attributes: [
      "doctor_id",
      [
        db.sequelize.fn(
          "COUNT",
          db.sequelize.fn("DISTINCT", db.sequelize.col("patient_id"))
        ),
        "patient_count",
      ],
    ],
    group: ["doctor_id"],
    include: [
      {
        model: db.User,
        as: "doctor",
        include: {
          model: db.Employee,
          as: "employee",
          attributes: ["firstName", "middleName", "lastName"],
        },
        attributes: ["id"],
      },
    ],
  });
  return {
    visits,
    start: format(localWeekStart, "yyyy-MM-dd"),
    end: format(weekEnd, "yyyy-MM-dd"),
  };
};

const getMonthlyVisitSeenPerDoctor = async () => {
  const monthStart = startOfMonth(new Date());
  const localMonthStart = setHours(monthStart, 0, 0, 0, 0);
  const monthEnd = endOfMonth(new Date());
  const visits = await db.PatientAssignment.findAll({
    where: {
      assignment_date: {
        [db.Sequelize.Op.between]: [
          format(localMonthStart, "yyyy-MM-dd"),
          format(monthEnd, "yyyy-MM-dd"),
        ],
      },
    },
    attributes: [
      "doctor_id",
      [
        db.sequelize.fn(
          "COUNT",
          db.sequelize.fn("DISTINCT", db.sequelize.col("patient_id"))
        ),
        "patient_count",
      ],
    ],
    group: ["doctor_id"],
    include: [
      {
        model: db.User,
        as: "doctor",
        include: {
          model: db.Employee,
          as: "employee",
          attributes: ["firstName", "middleName", "lastName"],
        },
        attributes: ["id"],
      },
    ],
  });
  return {
    visits,
    start: format(localMonthStart, "yyyy-MM-dd"),
    end: format(monthEnd, "yyyy-MM-dd"),
  };
};

const getYearlyVisitSeenPerDoctor = async () => {
  const yearStart = startOfYear(new Date());
  const localYearStart = setHours(yearStart, 0, 0, 0, 0);
  const yearEnd = endOfYear(new Date());
  const visits = await db.PatientAssignment.findAll({
    where: {
      assignment_date: {
        [db.Sequelize.Op.between]: [
          format(localYearStart, "yyyy-MM-dd"),
          format(yearEnd, "yyyy-MM-dd"),
        ],
      },
    },
    attributes: [
      "doctor_id",
      [
        db.sequelize.fn(
          "COUNT",
          db.sequelize.fn("DISTINCT", db.sequelize.col("patient_id"))
        ),
        "patient_count",
      ],
    ],
    group: ["doctor_id"],
    include: [
      {
        model: db.User,
        as: "doctor",
        include: {
          model: db.Employee,
          as: "employee",
          attributes: ["firstName", "middleName", "lastName"],
        },
        attributes: ["id"],
      },
    ],
  });
  return {
    visits,
    start: format(localYearStart, "yyyy-MM-dd"),
    end: format(yearEnd, "yyyy-MM-dd"),
  };
};
const getCustomRangeVisitSeenPerDoctor = async (start_date, end_date) => {
  //   console.log("//", start_date, "//", end_date);
  const visits = await db.PatientAssignment.findAll({
    where: {
      assignment_date: {
        [db.Sequelize.Op.between]: [
          format(start_date, "yyyy-MM-dd"),
          format(end_date, "yyyy-MM-dd"),
          //   (start_date),
          //   (end_date),
        ],
      },
    },
    attributes: [
      "doctor_id",
      [
        db.sequelize.fn(
          "COUNT",
          db.sequelize.fn("DISTINCT", db.sequelize.col("patient_id"))
        ),
        "patient_count",
      ],
    ],
    group: ["doctor_id"],
    include: [
      {
        model: db.User,
        as: "doctor",
        include: {
          model: db.Employee,
          as: "employee",
          attributes: ["firstName", "middleName", "lastName"],
        },
        attributes: ["id"],
      },
    ],
  });
  //   console.log(visits);
  return {
    visits,
    start: format(new Date(start_date), "yyyy-MM-dd"),
    end: format(new Date(end_date), "yyyy-MM-dd"),
    // start: start_date,
    // end: end_date,
  };
};
module.exports = {
  getWeeklyAppointedPatient,
  getMonthlyAppointedPatient,
  getYearlyAppointedPatient,
  getWeeklyVisitedPatient,
  getMonthlyVisitedPatient,
  getYearlyVisitedPatient,
  getWeeklyAdmittedPatient,
  getMonthlyAdmittedPatient,
  getYearlyAdmittedPatient,
  getWeeklyVisitSeenPerDoctor,
  getMonthlyVisitSeenPerDoctor,
  getYearlyVisitSeenPerDoctor,
  getCustomRangeVisitSeenPerDoctor,
};
