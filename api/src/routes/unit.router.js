const express = require("express");
const UnitController = require("../controllers/UnitController");
const router = express.Router();
// const UnitController = require('../controllers/
router.get("/", UnitController.getUnits);

module.exports = router;
