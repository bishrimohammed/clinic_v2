const express = require("express");
const MedicalRecordController = require("../controllers/medical record/MedicalRecordController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();
router.get("/", MedicalRecordController.getMedicalRecords);
router.get("/overview", MedicalRecordController.getMedicalRecordsOverview);
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
  "/:id/overview",
  MedicalRecordController.getMedicalRecordsOverviewDetail
);
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
router.get(
  "/:id/get_chief_complaint",
  protect,
  MedicalRecordController.get_ChiefComplaint
);
router.get(
  "/:id/get_physical_examination",
  protect,
  MedicalRecordController.get_physical_examination
);
router.get("/:id/vital-signs", protect, MedicalRecordController.getVitalSign);
router.get(
  "/:id/get_diagnosis",
  protect,
  MedicalRecordController.get_Diagnosis
);
router.get(
  "/:id/internal_prescription",
  protect,
  MedicalRecordController.getMedicalRecord_Internal_Prescription
);
router.get(
  "/:id/external_prescription",
  protect,
  MedicalRecordController.get_External_MedicalRecord_Prescription
);
router.get("/:id/sick-note", protect, MedicalRecordController.getSickNote);
router.get(
  "/:id/refferal-note",
  protect,
  MedicalRecordController.getRefferalNote
);
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
  "/:id/add_chief_complaint",
  protect,
  MedicalRecordController.add_ChiefComplaint
);
router.post(
  "/:id/add_physical_examination",
  protect,
  MedicalRecordController.add_physical_examination
);
router.post(
  "/:id/add_diagnosis",
  protect,
  MedicalRecordController.add_Diagnosis
);
router.post(
  "/:id/addInvestigationResult",
  protect,
  MedicalRecordController.addInvestigationResult
);

router.post("/:id/addTriage", protect, MedicalRecordController.addTriage);
router.post("/:id/addVitalSign", protect, MedicalRecordController.addVitalSign);
router.post(
  "/:id/add-prescription",
  protect,
  MedicalRecordController.addPrescription
);

router.post(
  "/:id/add_external_prescription",
  protect,
  MedicalRecordController.add_External_MedicalRecord_Prescription
);
router.post("/:id/add-plan", protect, MedicalRecordController.addPlan);
router.post(
  "/:id/sick-leave-note",
  protect,
  MedicalRecordController.addSickLeaveNote
);

router.patch(
  "/diagnosis/:diagnosis_id/confirm",
  protect,
  MedicalRecordController.confirm_Diagnosis
);

router.patch(
  "/diagnosis/:diagnosis_id/rule_out",
  protect,
  MedicalRecordController.Ruled_out_Diagnosis
);
router.delete(
  "/:id/cancel-medical-record",
  protect,
  MedicalRecordController.cancelMedicalRecord
);
module.exports = router;
