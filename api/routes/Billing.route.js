const express = require("express");
const BillingController = require("../controllers/BillingController");
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();

router.get("/outstanding", BillingController.getOutStandingBillings);

router.get("/:id/payments", BillingController.getBillPaymentsByBillId);
router.get(
  "/:patientId/patient-payments",
  BillingController.getBillingDetialByPatientId
);

router.post("/take-payment", protect, BillingController.takePayment);

router.patch("/:id/void", protect, BillingController.voidPayment);

module.exports = router;
