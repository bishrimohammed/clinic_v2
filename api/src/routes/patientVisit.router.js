const express = require("express");
const PatientVisitController = require("../controllers/PatientVisitController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/", PatientVisitController.getPatientVisits);
router.get("/upcoming", PatientVisitController.getUpcomingPatientVisits);
router.get(
  "/doctor/upcoming",
  protect,
  PatientVisitController.getUpcomingPatientVisitByDoctorId
);
router.get(
  "/doctor/assigned",
  protect,
  PatientVisitController.getPreviousPatientVisitByDoctorId
);

router.get("/:id", PatientVisitController.getPatientVisitById);

router.post("/", protect, PatientVisitController.createPatientVisit);

router.put("/:id", PatientVisitController.updatePatientVisit);
router.patch(
  "/:id/cancel",
  protect,
  PatientVisitController.cancelPatientAssignment
);

router.patch(
  "/:id/transfer",
  protect,
  PatientVisitController.transferPatientVisitToOtherDoctor
);
router.patch("/:id/start-traige", protect, PatientVisitController.startTraige);

router.patch(
  "/:id/finish-traige",
  protect,
  PatientVisitController.finishTraige
);
router.patch("/:id/admit", protect, PatientVisitController.admitVisit);
router.delete("/:id", PatientVisitController.deletePatientVisit);

// router.get('/:id/patient', PatientVisitController.getPatient)

module.exports = router;
