const express = require("express");
const ApprovalRequestController = require("../controllers/ApprovalRequestController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/", protect, ApprovalRequestController.getApprovalPendingRequests);

router.patch("/:id/approve", protect, ApprovalRequestController.approveRequest);

module.exports = router;
