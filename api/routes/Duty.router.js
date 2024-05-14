const express = require("express");
const DutyController = require("../controllers/DutyController");

const router = express.Router();

router.get("/thisweek", DutyController.getThisWeekDutyProgram);
router.get("/", DutyController.getDutyPrograms);
router.get("/:id", DutyController.getDutyProgramById);
router.post("/", DutyController.createDutyprogram);
router.post("/assign", DutyController.assignDutyToEmployee);

module.exports = router;
