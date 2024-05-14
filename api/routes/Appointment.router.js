const express = require("express");
const {
  AppointementController,
} = require("../controllers/AppointementController");
const router = express.Router();
router.get("/", AppointementController.getAppointments);
router.get("/:id", AppointementController.getAppointment);
router.post("/", AppointementController.createAppointment);
router.put("/:id", AppointementController.updateAppointment);
router.patch("/:id/cancel", AppointementController.cancelAppointment);
router.delete("/:id", AppointementController.deleteAppointment);
module.exports = router;
