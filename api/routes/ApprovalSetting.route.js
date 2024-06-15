const express = require("express");
const ApprovalSettingController = require("../controllers/ApprovalSettingController");
const router = express.Router();

router.get("/", ApprovalSettingController.getApprovalSettings);

router.post("/", ApprovalSettingController.createApprovalSetting);

module.exports = router;
