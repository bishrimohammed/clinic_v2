const express = require("express");
const DashboardController = require("../controllers/DashboardController");
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();

router.get("/", protect, DashboardController.getDashboardData);
router.get(
  "/doctor-work-hour",
  protect,
  DashboardController.getDoctorWorkingHourData
);
router.get(
  "/patient-visit",
  protect,
  DashboardController.getUpcomingPatientVisitData
);
router.get(
  "/appointment",
  protect,
  DashboardController.getUpcomingAppointmentData
);
// router.get("/", protect, DashboardController.getDashboardData);

module.exports = router;
