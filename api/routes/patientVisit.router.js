const express = require("express");
const PatientVisitController = require("../controllers/PatientVisitController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/", PatientVisitController.getPatientVisits);
router.get("/upcoming", PatientVisitController.getUpcomingPatientVisits);

router.get("/:id", PatientVisitController.getPatientVisit);

router.post("/", protect, PatientVisitController.createPatientVisit);

router.put("/:id", PatientVisitController.updatePatientVisit);
router.patch("/:id/cancel", PatientVisitController.cancelPatientAssignment);

router.patch(
  "/:id/transfer",
  protect,
  PatientVisitController.transferPatientVisitToOtherDoctor
);
router.patch("/:id/start-traige", PatientVisitController.startTraige);

router.patch("/:id/finish-traige", PatientVisitController.finishTraige);
router.delete("/:id", PatientVisitController.deletePatientVisit);

// router.get('/:id/patient', PatientVisitController.getPatient)

module.exports = router;
