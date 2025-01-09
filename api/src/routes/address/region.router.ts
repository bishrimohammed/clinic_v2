import express from "express";
import * as RegionController from "../../controllers/address/RegionController";
// const UserController = require("../controllers/User.Controller.js");
// const { protect } = require("../middleware/authMiddleWare.js");
// const RegionController = require("../../controllers/address/RegionController.js");
const router = express.Router();

router.get("/static-addresses", RegionController.getRegions);
// router.get("/:id", RegionController.getRegion);
// router.post("/", RegionController.createRegion);
// // router.post("/login", RegionController.);
// router.put("/id", RegionController.updateRegion);
// router.delete("/", RegionController.deleteRegion);

export default router;
