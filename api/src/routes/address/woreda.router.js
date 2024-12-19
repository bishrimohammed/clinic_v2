const express = require("express");
const woredaController = require("../../controllers/address/woredaController");
// const UserController = require("../controllers/User.Controller.js");
// const { protect } = require("../middleware/authMiddleWare.js");
// const woredaController = require("../../controllers/address/woredaController.js");
const router = express.Router();

router.get("/", woredaController.getWoredas);
router.get("/:id", woredaController.getWoreda);
router.post("/", woredaController.createWoreda);
// router.post("/login", woredaController.);
router.put("/id", woredaController.updateWoreda);
router.delete("/", woredaController.deleteWoreda);

module.exports = router;
