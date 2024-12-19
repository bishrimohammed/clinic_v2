const express = require("express");
const CityController = require("../../controllers/address/CityController");
// const UserController = require("../controllers/User.Controller.js");
// const { protect } = require("../middleware/authMiddleWare.js");
// const RegionController = require("../../controllers/address/RegionController.js");
const router = express.Router();

router.get("/", CityController.getCities);
router.get("/:id", CityController.getCity);
router.post("/", CityController.createCity);
// router.post("/login", CityController.);
router.put("/id", CityController.updateCity);
router.delete("/", CityController.deleteCity);

module.exports = router;
