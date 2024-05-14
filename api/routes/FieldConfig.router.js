const express = require("express");
const FieldConfigController = require("../controllers/FieldConfigController");
const router = express.Router();

router.get(
  "/physicalExaminationFields",
  FieldConfigController.getPhycicalExaminationFields
);

router.get("/vitalsignFields", FieldConfigController.getVitalSignFields);
router.get(
  "/vitalsignFields/active",
  FieldConfigController.getActiveVitalSignFields
);
router.patch(
  "/vitalsignField/:id/enable",
  FieldConfigController.enableVitalSignField
);

router.patch(
  "/vitalsignField/:id/disable",
  FieldConfigController.disableVitalSignField
);

router.patch(
  "/physicalExaminationField/:id/enable",
  FieldConfigController.enablePhycicalExaminationField
);

router.patch(
  "/physicalExaminationField/:id/disable",
  FieldConfigController.disablePhycicalExaminationField
);
module.exports = router;
