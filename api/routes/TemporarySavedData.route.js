const express = require("express");
const { protect } = require("../middleware/authMiddleWare");
const TemporarySavedDataController = require("../controllers/TemporarySavedDataController");
const router = express.Router();
router.get(
  "/:medical_record_id/progressnote",
  protect,
  TemporarySavedDataController.getSavedTemporaryProgressNote
);
router.post(
  "/:medical_record_id/progressnote",
  protect,
  TemporarySavedDataController.saveTemporaryProgressNoteData
);

module.exports = router;
