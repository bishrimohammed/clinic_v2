const express = require("express");
import { DashboardController } from "../controllers";
// import * as DashboardController from "../controllers/Dashboard.Controller";
import { protect } from "../middleware/authMiddleWare";

const router = express.Router();

router.get("/", protect, DashboardController.getDashboardData);
router.get(
  "/doctor-work-hour",
  // protect,
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
export default router;
