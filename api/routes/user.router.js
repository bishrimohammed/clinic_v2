const express = require("express");
const UserController = require("../controllers/User.Controller.js");
const { protect } = require("../middleware/authMiddleWare.js");
const router = express.Router();

router.get("/", UserController.getUsers);
router.get("/search", protect, UserController.getDoctors);
router.get("/doctors", UserController.getDoctors);
router.get("/:id", protect, UserController.getUserById);
router.post("/", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/doctor/workhours", UserController.addWorkingHour);
router.put("/:id", UserController.updateUser);

router.put("/doctor/:id/workhours", UserController.updateWorkHour);
router.patch("/:id/activate", UserController.activateUser);
router.patch("/:id/deactivate", UserController.deactivateUser);
router.patch("/:id/changepassword", UserController.changePassword);

module.exports = router;
