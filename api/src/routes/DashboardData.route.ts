import express from "express";
import { DashboardController } from "../controllers";
// import * as DashboardController from "../controllers/Dashboard.Controller";
import { protect } from "../middleware/authMiddleWare";
import { permissionGuard } from "../middleware/permissionGuard";

const router = express.Router();

router.get(
  "/",
  protect,
  // permissionGuard("Patient", "create"),
  DashboardController.getDashboardData
);
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
router.get(
  "/lab-investigation",
  protect,
  permissionGuard("Lab Result", "read"),
  DashboardController.getLabInvestigationData
);
router.get(
  "/payments",
  protect,
  permissionGuard("Payments", "read"),
  DashboardController.getPaymentData
);
// router.get("/", protect, DashboardController.getDashboardData);
export default router;
