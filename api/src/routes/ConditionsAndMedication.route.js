const express = require("express");
const ConditionsAndMedicationController = require("../controllers/patient/ConditionsAndMedicationController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get(
  "/medical-record/:medicalRecordId/current-medication",
  ConditionsAndMedicationController.getCurrentMedication
);
router.get(
  "/medical-record/:medicalRecordId/discontinued-medication",
  ConditionsAndMedicationController.getDiscontinuedMedication
);
router.get(
  "/patient/:patientId/past-medical-history",
  ConditionsAndMedicationController.getPatientPastMedicalHistories
);

router.post(
  "/medical-record/:medicalRecordId/current-medication",
  protect,
  ConditionsAndMedicationController.createCurrentMedication
);

router.post(
  "/medical-record/:medicalRecordId/discontinued-medication",
  protect,
  ConditionsAndMedicationController.createDiscontinuedMedication
);

router.post(
  "/patient/:patientId/past-medical-history",
  protect,
  ConditionsAndMedicationController.createPastMedicalHistory
);

router.put(
  "/medical-record/:id/current-medication",
  protect,
  ConditionsAndMedicationController.updateCurrentMedication
);

router.put(
  "/medical-record/:id/discontinued-medication",
  protect,
  ConditionsAndMedicationController.updateDiscontinuedMedication
);

router.put(
  "/patient/:id/past-medical-history",
  protect,
  ConditionsAndMedicationController.updatePastMedicalHistory
);

router.delete(
  "/medical-record/:id/current-medication",
  protect,
  ConditionsAndMedicationController.deleteCurrentMedication
);

router.delete(
  "/medical-record/:id/discontinued-medication",
  protect,
  ConditionsAndMedicationController.deleteDiscontinuedMedication
);

router.delete(
  "/patient/:id/past-medical-history",
  protect,
  ConditionsAndMedicationController.deletePastMedicalHistory
);
module.exports = router;
