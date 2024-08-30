const express = require("express");
const ProcedureController = require("../controllers/ProcedureController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/:medicalRecordId", ProcedureController.getByMedicalRecordId);
router.post("/:medicalRecordId", protect, ProcedureController.createProcedure);
module.exports = router;
