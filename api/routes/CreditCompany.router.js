const express = require("express");
const router = express.Router();
const CreditCompanyProfileController = require("../controllers/CreditCompanyProfileController");
const upload = require("../config/multerConfig");
router.get(
  "/",

  CreditCompanyProfileController.getCreditCompanys
);
router.post(
  "/",
  upload.single("agreement_doc"),
  CreditCompanyProfileController.createCreditCompany
);
router.put("/:id", CreditCompanyProfileController.updateCreditCompany);
router.patch(
  "/:id/activate",
  CreditCompanyProfileController.activateCreditCompany
);
router.patch(
  "/:id/deactivate",
  CreditCompanyProfileController.deactivateCreditCompany
);
module.exports = router;
