const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
const {
  getWeeklyAppointedPatient,
  getMonthlyAppointedPatient,
  getYearlyAppointedPatient,
  getMonthlyVisitedPatient,
  getWeeklyVisitedPatient,
  getYearlyVisitedPatient,
  getWeeklyAdmittedPatient,
  getMonthlyAdmittedPatient,
  getYearlyAdmittedPatient,
  getWeeklyVisitSeenPerDoctor,
  getMonthlyVisitSeenPerDoctor,
  getYearlyVisitSeenPerDoctor,
  getCustomRangeVisitSeenPerDoctor,
} = require("../service/Report.service");
const { format } = require("date-fns");

module.exports = ReportController = {
  getFinancialReport: asyncHandler(async (req, res) => {
    const { report_type, start_date, end_date } = req.query;
    let report;
    if (report_type === "weekly") {
      report = await getWeeklyPayments();
    } else if (report_type === "monthly") {
      report = await getMonthlyPayments();
    } else if (report_type === "yearly") {
      report = await getYearlyPayments();
    } else if (report_type === "custom") {
      report = await getCustomDateRangePayments(start_date, end_date);
    }
    res.json(report);
  }),
  getPatientVisitReport: asyncHandler(async (req, res) => {
    const { report_type, report_target, end_date } = req.query;
    let report;
    switch (report_target) {
      case "appointed":
        if (report_type === "weekly") {
          report = await getWeeklyAppointedPatient();
        } else if (report_type === "monthly") {
          report = await getMonthlyAppointedPatient();
        } else if (report_type === "yearly") {
          report = await getYearlyAppointedPatient();
        }
        break;
      case "visited":
        if (report_type === "weekly") {
          report = await getWeeklyVisitedPatient();
        } else if (report_type === "monthly") {
          report = await getMonthlyVisitedPatient();
        } else if (report_type === "yearly") {
          report = await getYearlyVisitedPatient();
        }
        break;
      case "admitted":
        if (report_type === "weekly") {
          report = await getWeeklyAdmittedPatient();
        } else if (report_type === "monthly") {
          report = await getMonthlyAdmittedPatient();
        } else if (report_type === "yearly") {
          report = await getYearlyAdmittedPatient();
        }
        break;
      default:
        return res.status(400).json({ msg: "Invalid report target" });
    }
    // if (report_type === "weekly") {
    //   report = await getWeeklyPayments();
    // } else if (report_type === "monthly") {
    //   report = await getMonthlyPayments();
    // } else if (report_type === "yearly") {
    //   report = await getYearlyPayments();
    // }
    res.json(report);
  }),
  getVisitSeenPerDoctorReport: asyncHandler(async (req, res) => {
    const { report_type, start_date, end_date } = req.query;

    let report;
    if (report_type === "weekly") {
      report = await getWeeklyVisitSeenPerDoctor();
    } else if (report_type === "monthly") {
      report = await getMonthlyVisitSeenPerDoctor();
    } else if (report_type === "yearly") {
      report = await getYearlyVisitSeenPerDoctor();
    } else if (report_type === "custom") {
      report = await getCustomRangeVisitSeenPerDoctor(
        new Date(start_date),
        new Date(end_date)
      );
    }
    res.json(report);
  }),
};
const getWeeklyPayments = async () => {
  const weeklyPayments = await db.Payment.findAll({
    include: [
      {
        model: db.ServiceItem,
        as: "item",
        attributes: ["id", "price", "service_name"],
      },
    ],

    where: {
      status: "Paid",
      payment_date: {
        [Op.between]: [new Date("2024-01-01"), new Date("2024-12-31")], // Entire year or a range of weeks
      },
    },
    group: [db.sequelize.fn("YEARWEEK", db.sequelize.col("payment_date"))],
    attributes: [
      [db.sequelize.fn("YEARWEEK", db.sequelize.col("payment_date")), "week"],
      [
        db.sequelize.fn("SUM", db.sequelize.col("item.price")),
        "total_payments",
      ],
    ],
    // group: ["item_id"],
    // order: [
    //   [db.sequelize.fn("YEARWEEK", db.sequelize.col("payment_date")), "ASC"],
    // ],
  });
  //   console.log(weeklyPayments);
  return await weeklyPayments;
  // res.json(weeklyPayments);
};
const getMonthlyPayments = async () => {
  // const monthlyPayments = await db.Payment.findAll({
  //   include: [
  //     {
  //       model: db.ServiceItem,
  //       as: "item",
  //     },
  //   ],
  //   attributes: [
  //     [
  //       db.sequelize.fn(
  //         "date_trunc",
  //         "month",
  //         db.sequelize.col("payment_date")
  //       ),
  //       "month",
  //     ],
  //     [
  //       db.sequelize.fn("SUM", db.sequelize.col("item.price")),
  //       "total_payments",
  //     ],
  //   ],
  //   where: {
  //     status: "Paid",
  //     payment_date: {
  //       [Op.between]: [new Date("2024-01-01"), new Date("2024-12-31")], // Entire year or a range of months
  //     },
  //   },
  //   group: [
  //     db.sequelize.fn(
  //       "date_trunc",
  //       "month",
  //       db.sequelize.col("payment_date")
  //     ),
  //   ],
  //   order: [
  //     [
  //       db.sequelize.fn(
  //         "date_trunc",
  //         "month",
  //         db.sequelize.col("payment_date")
  //       ),
  //       "ASC",
  //     ],
  //   ],
  // });
  const monthlyPayments = await db.Payment.findAll({
    include: [
      {
        model: db.ServiceItem,
        as: "item",
        attributes: ["price"],
      },
    ],
    attributes: [
      [
        db.sequelize.fn(
          "DATE_FORMAT",
          db.sequelize.col("payment_date"),
          "%Y-%m"
        ),
        "month",
      ],
      [
        db.sequelize.fn("SUM", db.sequelize.col("item.price")),
        "total_payments",
      ],
    ],
    where: {
      status: "Paid",
      payment_date: {
        [Op.between]: [new Date("2024-01-01"), new Date("2024-12-31")], // Entire year or a range of months
      },
    },
    group: [
      db.sequelize.fn("DATE_FORMAT", db.sequelize.col("payment_date"), "%Y-%m"),
    ],
    order: [
      [
        db.sequelize.fn(
          "DATE_FORMAT",
          db.sequelize.col("payment_date"),
          "%Y-%m"
        ),
        "ASC",
      ],
    ],
  });
  return monthlyPayments;
  // res.json(monthlyPayments);
};

const getYearlyPayments = async () => {
  const yearlyPayments = await db.Payment.findAll({
    include: [
      {
        model: db.ServiceItem,
        as: "item",
        attributes: ["price"],
      },
    ],
    attributes: [
      [db.sequelize.fn("YEAR", db.sequelize.col("payment_date")), "year"],
      [
        db.sequelize.fn("SUM", db.sequelize.col("item.price")),
        "total_payments",
      ],
    ],
    where: {
      status: "Paid",
      payment_date: {
        [Op.between]: [new Date("2024-01-01"), new Date("2024-12-31")], // Entire year
      },
    },
    group: [db.sequelize.fn("YEAR", db.sequelize.col("payment_date"))],
    order: [[db.sequelize.fn("YEAR", db.sequelize.col("payment_date")), "ASC"]],
  });
  // const yp = yearlyPayments.map((yp) => {
  //   return {
  //     year: yp.payment.year,
  //     total_payments: yp.payment.total_payments,
  //     // total_items_sold: yearlyPayments.filter(p=>p.year===yp.year).reduce((sum,p)=>sum+p.item.price, 0)
  //   };
  // });
  // console.log(yp);
  return yearlyPayments;
  // res.json(yearlyPayments);
};

const getCustomDateRangePayments = async (start_date, end_date) => {
  const payments = await db.Payment.findAll({
    where: {
      status: "Paid",
      payment_date: {
        [Op.between]: [new Date(start_date), new Date(end_date)], // Entire year or a range of weeks
      },
    },
    include: [
      {
        model: db.ServiceItem,
        as: "item",
        attributes: ["price"],
      },
    ],
    attributes: [
      // [db.sequelize.fn("YEARWEEK", db.sequelize.col("payment_date")), "week"],
      [
        db.sequelize.fn("SUM", db.sequelize.col("item.price")),
        "total_payments",
      ],
      //   [
      //     db.sequelize.literal(
      //       "DATE_SUB(payment_date, INTERVAL (DAYOFWEEK(payment_date) - 1) DAY)"
      //     ),
      //     "week_start",
      //   ],
      //   // Calculate end date of the week
      //   [
      //     db.sequelize.literal(
      //       "DATE_ADD(DATE_SUB(payment_date, INTERVAL (DAYOFWEEK(payment_date) - 1) DAY), INTERVAL 6 DAY)"
      //     ),
      //     "week_end",
      //   ],
      // { exclude: ["item"] },
      // { attributes: { exclude: ["item"] } },
    ],
    // where: {
    //   status: "Paid",
    //   payment_date: {
    //     [Op.between]: [new Date("2024-01-01"), new Date("2024-12-31")], // Entire year or a range of weeks
    //   },
    // },
    // group: [db.sequelize.fn("YEARWEEK", db.sequelize.col("payment_date"))],
    // order: [
    //   [db.sequelize.fn("YEARWEEK", db.sequelize.col("payment_date")), "ASC"],
    // ],
  });
  console.log(payments[0].total_payments);
  return {
    total_payments:
      payments.length > 0 ? payments[0].dataValues.total_payments : 0,
    start: format(new Date(start_date), "yyyy-MM-dd"),
    end: format(new Date(end_date), "yyyy-MM-dd"),
  };
};
