const express = require("express");
const FieldConfigController = require("../controllers/FieldConfigController");
const router = express.Router();

router.get(
  "/physicalExaminationFields",
  FieldConfigController.getPhycicalExaminationFields
);

router.get("/vitalsignFields", FieldConfigController.getVitalSignFields);

module.exports = router;
