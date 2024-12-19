const express = require("express");
const PatientassignmaentController = require("../controllers/PatientAssignmaentController.js");
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();

router.get("/", PatientassignmaentController.getAllPatientAssignments);

router.get("/:id", PatientassignmaentController.getPatientAssignmentById);

router.post("/", protect, PatientassignmaentController.createPatientAssignment);

router.put("/:id", PatientassignmaentController.updatePatientAssignment);

router.delete("/:id", PatientassignmaentController.deletePatientAssignment);

module.exports = router;
