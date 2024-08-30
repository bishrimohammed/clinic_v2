const express = require("express");
const NurseTreatmentController = require("../controllers/NurseTreatmentController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get(
  "/getactive-treatment",
  NurseTreatmentController.getActiveNurseTreatments
);
router.get(
  "/getprescribedmedicine/:prescriptionId",
  NurseTreatmentController.getPrescribedmedicineByPrescriptionId
);
router.get(
  "/getprescribedmedicine/:prescriptionId/excuted",
  NurseTreatmentController.getExcutedPrescribedmedicineByPrescriptionId
);
router.patch(
  "/:medicationId/excute",
  protect,
  NurseTreatmentController.excuteMedication
);
router.patch(
  "/:prescriptionId/excutemedications",
  protect,
  NurseTreatmentController.excuteMedications
);

module.exports = router;
