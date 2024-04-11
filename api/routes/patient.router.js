const express = require("express");
const PatientController = require("../controllers/PatientController");
const router = express.Router();

router.get("/", PatientController.getAllPatients);
router.get("/search", PatientController.searchPatient);
router.post("/", PatientController.createPatient);

// router
//   .get("/:id", getPatient)
//   .get("/:patientId/overviewdata", getPatientOverviewData);
// router.post("/", createPatient); //.post("/search", searchPatient);
// router.put("/:id", updatePatient);

module.exports = router;
