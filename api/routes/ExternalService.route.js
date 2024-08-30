const express = require("express");
const ExternalServiceController = require("../controllers/ExternalServiceController");
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();

router.get(
  "/active",
  protect,
  ExternalServiceController.getActiveExternalServices
);
router.get(
  "/:externalServiceId/lab",
  protect,
  ExternalServiceController.getExternalServiceLabTests
);
// router.get("/:id", ExternalServiceController.getExternalServiceById);

router.post("/", protect, ExternalServiceController.createExternalService);

module.exports = router;
