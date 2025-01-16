// const express = require("express");
import express from "express";
import * as UserController from "../controllers/User.Controller";
import { userRegisterSchema } from "../types/user";
import { validate } from "../middleware/validate";
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/reset", UserController.resetPassword);
router.get("/", UserController.getUsers);
router.get("/active", UserController.getActiveUsers);

router.get("/search", protect, UserController.getDoctors);
router.get("/doctors", UserController.getDoctors);
router.get("/:id", protect, UserController.getUserById);

router.post(
  "/",
  protect,
  validate(userRegisterSchema),
  UserController.registerUser
);
router.post("/login", protect, UserController.loginUser);
router.post("/doctor/workhours", protect, UserController.addWorkingHour);
router.put("/:id", protect, UserController.updateUser);

router.put("/doctor/:id/workhours", protect, UserController.updateWorkHour);
router.patch("/:id/activate", protect, UserController.activateUser);
router.patch("/:id/deactivate", protect, UserController.deactivateUser);
router.patch("/:id/changepassword", protect, UserController.changePassword);

export default router;
