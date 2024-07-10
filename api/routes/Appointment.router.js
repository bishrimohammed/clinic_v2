const express = require("express");
const {
  AppointementController,
} = require("../controllers/AppointementController");
const { protect } = require("../middleware/authMiddleWare");
const {
  approvalSettingMiddleWare,
} = require("../middleware/appovalSettingMiddleWare");
// const {
//   approvalSettingMiddleWare,
// } = require("../middleware/appovalSettingMiddleWare");
const router = express.Router();
router.get("/", AppointementController.getAppointments);
router.get("/:id", AppointementController.getAppointment);
router.post(
  "/",
  protect,
  approvalSettingMiddleWare("appointment", "create"),
  AppointementController.createAppointment
);
router.put("/:id", protect, AppointementController.updateAppointment);
router.patch("/:id/cancel", protect, AppointementController.cancelAppointment);
router.delete("/:id", protect, AppointementController.deleteAppointment);
module.exports = router;
