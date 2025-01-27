import express from "express";
import * as AppointementController from "../controllers/appointement.controller";
import { protect } from "../middleware/authMiddleWare";
import { validate, validateQuery } from "../middleware/validate";
import {
  appointmentQuerySchema,
  createAppointmentSchema,
} from "../types/appointment";
// import {
//   approvalSettingMiddleWare,
// } from "../middleware/appovalSettingMiddleWare"
// const {
//   approvalSettingMiddleWare,
// } = require("../middleware/appovalSettingMiddleWare");
const router = express.Router();
router.get(
  "/",
  validateQuery(appointmentQuerySchema),
  AppointementController.getAppointments
);
router.get(
  "/active",
  validateQuery(appointmentQuerySchema),
  AppointementController.getActiveAppointments
);
router.get("/:id", AppointementController.getAppointment);
router.post(
  "/",
  protect,
  // approvalSettingMiddleWare("appointment", "create"),
  validate(createAppointmentSchema),
  AppointementController.createAppointment
);
router.put("/:id", protect, AppointementController.updateAppointment);
router.patch("/:id/cancel", protect, AppointementController.cancelAppointment);
router.delete("/:id", protect, AppointementController.deleteAppointment);

export default router;
