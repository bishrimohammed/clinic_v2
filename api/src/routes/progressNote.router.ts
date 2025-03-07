const express = require("express");
const progressNoteController = require("../controllers/medical record/progressNoteController");
const { protect } = require("../middleware/authMiddleWare");
import upload from "../config/multerConfig";
const router = express.Router();

router.get(
  "/:medical_record_id",
  progressNoteController.getMedicalRecordProgressNote
);
router.get(
  "/:progressNoteId",
  progressNoteController.getMedicalRecordProgressNote
);
router.post(
  "/:medical_record_id",
  protect,
  upload.single("externalLabReport"),
  progressNoteController.createprogressNote
);
router.patch(
  "/:medical_record_id/finish",
  protect,
  progressNoteController.finishProgressNote
);

module.exports = router;
