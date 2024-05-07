const express = require("express");
const router = express.Router();
const CreditCompanyProfileController = require("../controllers/CreditCompanyProfileController");
const upload = require("../config/multerConfig");
// Get
router.get("/", CreditCompanyProfileController.getCreditCompanys);
// router to get credit companys that have active agreement
router.get(
  "/active",
  CreditCompanyProfileController.getActiveAgreementCompanys
);
router.get(
  "/:id/employees",
  CreditCompanyProfileController.getCompanyEmployees
);
router.get(
  "/:id/agreements",
  CreditCompanyProfileController.getCompanyAgreements
);

// post

router.post(
  "/",
  upload.single("agreement_doc"),
  CreditCompanyProfileController.createCreditCompany
);

router.post(
  "/agreement",
  upload.single("agreement_doc"),
  CreditCompanyProfileController.createAgreement
);
router.post(
  "/employee",
  upload.single("photo"),
  CreditCompanyProfileController.createEmployeeCompany
);

// put

router.put(
  "/:id",
  upload.single("agreement_doc"),
  CreditCompanyProfileController.updateCreditCompany
);
router.put(
  "/employee/:id",
  upload.single("agreement_doc"),
  CreditCompanyProfileController.updateEmployeeCompany
);

//patch

router.patch(
  "/:id/activate",
  CreditCompanyProfileController.activateCreditCompany
);
router.patch(
  "/:id/deactivate",
  CreditCompanyProfileController.deactivateCreditCompany
);
router.patch(
  "/agreement/:id/terminate",
  CreditCompanyProfileController.terminateAgreement
);

router.patch(
  "/employee/:id/deactivate",
  CreditCompanyProfileController.deactivateCompanyEmployee
);

router.patch(
  "/employee/:id/activate",
  CreditCompanyProfileController.activateCompanyEmploye
);

module.exports = router;
