const express = require("express");
const ReportController = require("../controllers/ReportController");

const router = express.Router();

router.get("/financial", ReportController.getFinancialReport);
router.get("/patient", ReportController.getPatientVisitReport);
router.get(
  "/patient-seen-per-doctor",
  ReportController.getVisitSeenPerDoctorReport
);

// router.get("/monthly", ReportController.getMonthlyPayments);

// router.get("/weekly", ReportController.getWeeklyPayments);

// router.get("/yearly", ReportController.getYearly);

module.exports = router;
