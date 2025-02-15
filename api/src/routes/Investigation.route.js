const express = require("express");
const InvestigationController = require("../controllers/InvestigationController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/pending-lab", InvestigationController.getPendingLabRequests);
router.get(
  "/pending-external-lab",
  InvestigationController.getExternalLabRequests
);

router.get("/completed-lab", InvestigationController.getCompletedLabRequests);

router.get("/:id/labtests", InvestigationController.getInvestigationLabTests);
router.get(
  "/:medicalRecordId/documents",
  InvestigationController.getMedicalRecordDocuments
);
router.post(
  "/:id/add-lab-result",
  protect,
  InvestigationController.addLabResult
);
module.exports = router;
