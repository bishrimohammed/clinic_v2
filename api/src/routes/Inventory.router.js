const express = require("express");
const InventoryController = require("../controllers/InventoryController");
const router = express.Router();

router.get("/instock-medicines", InventoryController.getInStockMedicines);

module.exports = router;
