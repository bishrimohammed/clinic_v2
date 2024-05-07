const express = require("express");
const DutyController = require("../controllers/DutyController");

const router = express.Router();

router.get("/thisweek", DutyController.getThisWeekDutyProgram);

module.exports = router;
