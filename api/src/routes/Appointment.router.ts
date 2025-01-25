import express from "express";
import * as AppointementController from "../controllers/appointement.controller";
import { protect } from "../middleware/authMiddleWare";
import { validateQuery } from "../middleware/validate";
import { appointmentQuerySchema } from "../types/appointment";
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
router.get("/:id", AppointementController.getAppointment);
router.post(
  "/",
  protect,
  // approvalSettingMiddleWare("appointment", "create"),
  AppointementController.createAppointment
);
router.put("/:id", protect, AppointementController.updateAppointment);
router.patch("/:id/cancel", protect, AppointementController.cancelAppointment);
router.delete("/:id", protect, AppointementController.deleteAppointment);

export default router;
