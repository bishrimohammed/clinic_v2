const express = require("express");
const BillingController = require("../controllers/BillingController");
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();

router.get("/outstanding", BillingController.getOutStandingBillings);
router.get(
  "/externalservice/outstanding",
  BillingController.getExternalServiceOutStandingPayments
);
router.get("/:id", BillingController.getMedicalBillingById);
router.get("/:id/payments", BillingController.getBillPaymentsByBillId);
router.get(
  "/:patientId/patient-payments",
  BillingController.getBillingDetialByPatientId
);

router.post("/take-payment", protect, BillingController.takePayment);
router.post(
  "/:billingId/add-advanced-payment",
  protect,
  BillingController.AddAdvancedPayment
);

router.patch("/:id/void", protect, BillingController.voidPayment);
router.patch(
  "/:medicalBillingId/settlepayments",
  protect,
  BillingController.settleAllPayments
);
router.patch(
  "/:medicalBillingId/return-remaining-amount",
  protect,
  BillingController.returnRemainingAmountToPatient
);
module.exports = router;
