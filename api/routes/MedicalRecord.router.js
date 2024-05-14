const express = require("express");
const MedicalRecordController = require("../controllers/medical record/MedicalRecordController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();
router.get("/", MedicalRecordController.getMedicalRecords);
router.get(
  "/getActiveInvestigation",
  MedicalRecordController.getActiveInvestigation
);
router.get(
  "/getCompletedInvestigation",
  MedicalRecordController.getCompletedInvestigation
);

router.get("/:id", MedicalRecordController.getMedicalRecordById);
router.get(
  "/:id/getinvestagion",
  MedicalRecordController.getOrdered_Investigation_ByMedicalRecordId
);
router.get(
  "/:id/getMedicalRecordDetail",
  protect,
  MedicalRecordController.getMedicalRecordDetailById
);
router.get("/:id/investigation", MedicalRecordController.getInvestigation);

router.post(
  "/:id/createMedicationRecordDetail",
  protect,
  MedicalRecordController.createMedicationRecordDetail
);
router.post(
  "/:id/addInvestigation",
  protect,
  MedicalRecordController.addInvestigation
);
router.post(
  "/:id/addInvestigationResult",
  protect,
  MedicalRecordController.addInvestigationResult
);
router.post("/:id/addVitalSign", protect, MedicalRecordController.addVitalSign);

module.exports = router;
