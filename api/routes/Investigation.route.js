const express = require("express");
const InvestigationController = require("../controllers/InvestigationController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/pending-lab", InvestigationController.getPendingLabRequests);

router.get("/completed-lab", InvestigationController.getCompletedLabRequests);

router.get("/:id/labtests", InvestigationController.getInvestigationLabTests);
router.post(
  "/:id/add-lab-result",
  protect,
  InvestigationController.addLabResult
);
module.exports = router;
