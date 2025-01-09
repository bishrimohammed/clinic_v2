const express = require("express");
const { printLabResult } = require("../controllers/print/printController");
const router = express.Router();

router.get("/", printLabResult);

module.exports = router;
