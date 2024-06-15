const express = require("express");
const progressNoteController = require("../controllers/medical record/progressNoteController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get(
  "/:medical_record_id",
  progressNoteController.getMedicalRecordProgressNote
);
router.post(
  "/:medical_record_id",
  protect,
  progressNoteController.createprogressNote
);

module.exports = router;
