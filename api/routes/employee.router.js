const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");
const upload = require("../config/multerConfig");
// const PatientController = require("../controllers/PatientController");
const router = express.Router();

router.get("/", EmployeeController.getEmployees);
router.get("/nouser", EmployeeController.getEmployeesWithNoUserAccounts);
router.get("/positions", EmployeeController.getEmployeePostions);
// router.get("/search", PatientController.searchPatient);
router.post(
  "/",
  upload.fields([{ name: "photo" }, { name: "digital_signature" }]),
  EmployeeController.createEmployee
);
router.put("/:id", upload.single("photo"), EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);
router.patch("/:id/deactivate", EmployeeController.deactivateEmployee);
router.patch("/:id/activate", EmployeeController.activateEmployee);

// router
//   .get("/:id", getPatient)
//   .get("/:patientId/overviewdata", getPatientOverviewData);
// router.post("/", createPatient); //.post("/search", searchPatient);
// router.put("/:id", updatePatient);

module.exports = router;
