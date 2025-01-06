const express = require("express");
const router = express.Router();
const CreditCompanyProfileController = require("../controllers/CreditCompanyProfileController");
const upload = require("../config/multerConfig");
const { protect } = require("../middleware/authMiddleWare");
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
  // upload.single("agreement_doc"),
  protect,
  CreditCompanyProfileController.createCreditCompany
);

router.post(
  "/agreement",
  // upload.single("agreement_doc"),
  protect,
  CreditCompanyProfileController.createAgreement
);
router.post(
  "/employee",
  // upload.single("photo"),
  protect,
  CreditCompanyProfileController.createEmployeeCompany
);

// put

router.put(
  "/:id",
  protect,
  // upload.single("agreement_doc"),
  CreditCompanyProfileController.updateCreditCompany
);
router.put(
  "/employee/:id",
  protect,
  // upload.single("agreement_doc"),
  CreditCompanyProfileController.updateEmployeeCompany
);

//patch

router.patch(
  "/:id/activate",
  protect,
  CreditCompanyProfileController.activateCreditCompany
);
router.patch(
  "/:id/deactivate",
  protect,
  CreditCompanyProfileController.deactivateCreditCompany
);
router.patch(
  "/agreement/:id/terminate",
  protect,
  CreditCompanyProfileController.terminateAgreement
);

router.patch(
  "/employee/:id/deactivate",
  protect,
  CreditCompanyProfileController.deactivateCompanyEmployee
);

router.patch(
  "/employee/:id/activate",
  protect,
  CreditCompanyProfileController.activateCompanyEmploye
);

module.exports = router;
