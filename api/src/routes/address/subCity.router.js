const express = require("express");
const SubCityController = require("../../controllers/address/SubCityController");
// const UserController = require("../controllers/User.Controller.js");
// const { protect } = require("../middleware/authMiddleWare.js");
// const RegionController = require("../../controllers/address/RegionController.js");
const router = express.Router();

router.get("/", SubCityController.getSubCities);
router.get("/:id", SubCityController.getSubCity);
router.post("/", SubCityController.createSubCity);
// router.post("/login", SubCityController.);
router.put("/id", SubCityController.updateSubCity);
router.delete("/", SubCityController.deleteSubCity);

module.exports = router;
