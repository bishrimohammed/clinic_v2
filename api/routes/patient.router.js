const express = require("express");
const PatientController = require("../controllers/PatientController");
const upload = require("../config/multerConfig");
const router = express.Router();

router.get("/", PatientController.getAllPatients);
router.get("/select", PatientController.getPatientNameList);
router.get("/:id/over-view-data", PatientController.getPatientOverViewData);
router.get("/:id", PatientController.getPatient);
router.get("/search", PatientController.searchPatient);
router.post(
  "/",
  upload.fields([{ name: "employeeId_doc" }, { name: "letter_doc" }]),
  PatientController.createPatient
);

router.put(
  "/:id",
  upload.fields([{ name: "employeeId_doc" }, { name: "letter_doc" }]),
  PatientController.updatePatient
);
// router
//   .get("/:id", getPatient)
//   .get("/:patientId/overviewdata", getPatientOverviewData);
// router.post("/", createPatient); //.post("/search", searchPatient);
// router.put("/:id", updatePatient);
router.patch("/:id/activate", PatientController.activatePatient);

router.patch("/:id/deactivate", PatientController.deactivatePatient);

module.exports = router;
