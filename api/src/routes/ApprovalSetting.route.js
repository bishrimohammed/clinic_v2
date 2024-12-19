const express = require("express");
const ApprovalSettingController = require("../controllers/ApprovalSettingController");
const router = express.Router();

router.get("/", ApprovalSettingController.getApprovalSettings);

router.post("/", ApprovalSettingController.createApprovalSetting);

router.patch(
  "/:id/activate",
  ApprovalSettingController.activateApprovalSetting
);

router.patch(
  "/:id/deactivate",
  ApprovalSettingController.deactivateApprovalSetting
);

module.exports = router;
