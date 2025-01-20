import express from "express";
import * as EmployeeController from "../controllers/EmployeeController";
import upload from "../config/multerConfig";
import { protect } from "../middleware/authMiddleWare";
import {
  validate,
  validateQuery,
  validateParams,
} from "../middleware/validate";
import {
  createEmployeeSchema,
  employeeFilterQuerySchema,
  employeeGetByIdParamSchema,
  updateEmployeeSchema,
} from "../types/employee";
import { parseDate, parseJSON } from "../utils/helpers";

const router = express.Router();

router.get(
  "/",
  validateQuery(employeeFilterQuerySchema),
  EmployeeController.getEmployees
);
router.get(
  "/has-no-account",
  EmployeeController.getEmployeesWithNoUserAccounts
);
router.get("/positions", EmployeeController.getEmployeePostions);
router.get(
  "/:id",
  validateParams(employeeGetByIdParamSchema),
  EmployeeController.getEmployeeById
);
router.post(
  "/",
  protect,
  upload.fields([
    { name: "photo" },
    { name: "digital_signature" },
    { name: "doctor_titer" },
  ]),

  validate(createEmployeeSchema, {
    address: parseJSON,
    emergencyContact: parseJSON,
    date_of_hire: parseDate,
    date_of_birth: parseDate,
  }),
  EmployeeController.createEmployee
);
router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "photo" },
    { name: "digital_signature" },
    { name: "doctor_titer" },
  ]),
  validate(updateEmployeeSchema, {
    address: parseJSON,
    emergencyContact: parseJSON,
    date_of_hire: parseDate,
    date_of_birth: parseDate,
  }),
  EmployeeController.updateEmployee
);
router.delete("/:id", protect, EmployeeController.deleteEmployee);
router.patch("/:id/deactivate", protect, EmployeeController.deactivateEmployee);
router.patch("/:id/activate", protect, EmployeeController.activateEmployee);

export default router;
