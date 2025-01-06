const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");
const upload = require("../config/multerConfig");
const { protect } = require("../middleware/authMiddleWare");
// const PatientController = require("../controllers/PatientController");
const router = express.Router();

router.get("/", EmployeeController.getEmployees);
router.get("/nouser", EmployeeController.getEmployeesWithNoUserAccounts);
router.get("/positions", EmployeeController.getEmployeePostions);
// router.get("/search", PatientController.searchPatient);
router.post(
  "/",
  // upload.fields([
  //   { name: "photo" },
  //   { name: "digital_signature" },
  //   { name: "doctor_titer" },
  // ]),
  protect,
  EmployeeController.createEmployee
);
router.put(
  "/:id",
  // upload.fields([{ name: "photo" }, { name: "digital_signature" }]),
  protect,
  EmployeeController.updateEmployee
);
router.delete("/:id", protect, EmployeeController.deleteEmployee);
router.patch("/:id/deactivate", protect, EmployeeController.deactivateEmployee);
router.patch("/:id/activate", protect, EmployeeController.activateEmployee);

// router
//   .get("/:id", getPatient)
//   .get("/:patientId/overviewdata", getPatientOverviewData);
// router.post("/", createPatient); //.post("/search", searchPatient);
// router.put("/:id", updatePatient);

module.exports = router;
