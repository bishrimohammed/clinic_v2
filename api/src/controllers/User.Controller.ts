import { Request, RequestHandler, Response } from "express-serve-static-core";
import {
  authService,
  clinicProfileService,
  // clinicService,
  permissionService,
  userService,
} from "../services";
import { Employee, Role, User } from "../models";
import configs from "../config/configs";
import {
  changePasswordInput,
  userRegisterSchema,
  UserUpdateInput,
  userUpdateSchema,
} from "../types/user";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import asyncHandler from "../utils/asyncHandler";

// const asyncHandler = require("express-async-handler");
import bcrypt from "bcryptjs";
const db = require("../models");
// import { generateToken } from "../utils/generateToken"
import { Op } from "sequelize";
import { ApiError } from "../shared/error/ApiError";
// import { ApiError } from "shared/error/ApiError";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  // await User.findAll({
  //   attributes: { exclude: ["password"] },
  //   include: [
  //     {
  //       model: db.Role,
  //       as: "role",
  //       attributes: ["name"],
  //       include: [
  //         {
  //           model: db.Permission,
  //           as: "permissions",
  //           // attributes: ["name"],
  //         },
  //       ],
  //     },
  //     {
  //       model: db.Employee,
  //       as: "employee",
  //       // attributes: ["name"],
  //       include: [
  //         {
  //           model: db.Address,
  //           as: "address",
  //           // attributes: ["name"],
  //         },
  //       ],
  //     },
  //     {
  //       model: db.Permission,
  //       as: "userPermissions",
  //     },
  //   ],
  // });

  res.json(users);
});
export const getActiveUsers: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await User.findAll({
      where: { status: true },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: db.Employee,
          as: "employee",

          attributes: ["id", "firstName", "lastName", "middleName"],
        },
      ],
    });
    res.json(users);
  }
);
export const getDoctors = asyncHandler(async (req: Request, res: Response) => {
  const { query } = req.query;
  console.log(req.user);
  const role = await db.Role.findOne({
    where: {
      name: {
        [Op.like]: `%doctor%`,
      },
    },
  });
  const doctors = await User.findAll({
    where: { role_id: role.id, status: true },
    attributes: { exclude: ["password"] },
    include: ["employee", "schedules", "role"],
  });
  res.json(doctors);
});
export const getUserById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await userService.getUserById(userId);
    const { password, ...userData } = user.toJSON();
    console.log(userData);
    res.json({
      success: true,
      data: userData,
    });
  }
);
export const registerUser = asyncHandler<{
  validatedData: typeof userRegisterSchema._type;
}>(async (req, res: Response) => {
  const user = await userService.registerUser(req.validatedData);
  const { password, ...userData } = user.toJSON();
  res.status(201).json({ sucess: true, message: "success", data: userData });
});
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // console.log(req.body);
  const user = await authService.login(username, password);
  const [employee, role] = await Promise.all([
    Employee.findByPk(user.dataValues.employee_id),
    Role.findByPk(user.dataValues.role_id),
  ]);

  const permissions = await permissionService.formatUserPermission(user);

  // const token = generateToken(user.id);
  const userData = {
    id: user.id as number,
    is_new: user.is_new!,
    name: employee?.getFullName().trim()!,
    digital_signature: employee?.digital_signature || null,
    doctor_titer: employee?.doctor_titer || null,
    role: role?.name!,
    permissions: permissions,
  };
  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);
  const clinicInfo = await clinicProfileService.getClinicInfo();
  // console.log(token);
  // const permissions = user.userPermissions;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: configs.NODE_DEV === "production",
    sameSite: "strict",
    maxAge: 60 * 60,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: configs.NODE_DEV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
  });
  res.status(200).json({
    user: userData,
    accessToken,
    refreshToken,
    clinicInfo: clinicInfo,
  });
});
export const updateUser = asyncHandler<{
  validatedData: typeof userUpdateSchema._type;
}>(async (req, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = await userService.updateUser(userId, req.validatedData);
  const { password, ...userData } = user.toJSON();
  // const user = await db.User.findByPk(req.params.id);
  // if (!user) {
  //   res.status(404);
  //   throw new Error("User not found");
  // }
  // const updatedUser = await db.User.update(req.body);
  // user.password = req.body.password;
  // user.email = req.body.email;
  // const Otheruser = await db.User.findOne({
  //   where: {
  //     username: req.body.username,
  //   },
  // });
  // console.log(Otheruser?.id !== user.id);
  // if (Otheruser && Otheruser?.id !== user.id) {
  //   res.status(400);
  //   throw new Error("Username was taken. Please try another one.");
  // }
  // if (req.body.isUpdatePasswordNeeded) {
  //   user.password = req.body.password;
  // }
  // user.role_id = req.body.role;
  // user.username = req.body.username;
  // await user.save();
  // await user.setUserPermissions([]);
  // await db.UserPermission.bulkCreate(req.body.permissions);
  res.json({ success: true, message: "success", data: userData });
  // console.log(req.body);
});
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body.userData);
});
export const deactivateUser = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    // console.log(req.body.userData);
    const userId = parseInt(req.params.id, 10);
    const user = await userService.deactivateUser(userId);
    const { password, ...userData } = user.toJSON();
    res.status(200).json({
      success: true,
      message: "Account successfully deactivated",
      data: userData,
    });
  }
);
export const activateUser = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await userService.activateUser(userId);
    const { password, ...userData } = user.toJSON();
    res.json({
      success: true,
      message: "Account successfully activated",
      data: userData,
    });
    // console.log(updatedUser);
  }
);
export const addWorkingHour = asyncHandler(
  async (req: Request, res: Response) => {
    // const { id } = req.params;
    const { start_time, end_time, doctorId, day_of_week } = req.body;
    // console.log(req.body);
    const clinicISworking = await db.Schedule.findOne({
      clinis_id: 4,
      // doctor_id: doctorId,
      day_of_week: day_of_week,
    });
    // i want to check if clinic is open or not
    if (clinicISworking) {
      if (
        clinicISworking.start_time > start_time ||
        clinicISworking.end_time < end_time
      ) {
        res.status(400);
        throw new Error("Sorry, the clinic is not open at this time");
      }
    } else {
      res.status(404);
      throw new Error("Sorry, the clinic is not open on this day.");
    }
    const schedule = await db.Schedule.create(
      {
        start_time: start_time,
        end_time: end_time,
        doctor_id: doctorId,
        day_of_week: day_of_week,
      },
      { userId: req?.user?.id }
    );
    res.status(201).json({ msg: "success" });
  }
);
export const updateWorkHour = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { start_time, end_time, doctorId, day_of_week } = req.body;
    // console.log(req.body);
    // console.log(id);
    const schedule = await db.Schedule.findByPk(id);
    if (!schedule) {
      res.status(404);
      throw new Error("Schedule not found");
    }
    const clinicISworking = await db.Schedule.findOne({
      clinis_id: 4,
      // doctor_id: doctorId,
      day_of_week: day_of_week,
    });
    // i want to check if clinic is open or not
    if (clinicISworking) {
      if (
        clinicISworking.start_time > start_time ||
        clinicISworking.end_time < end_time
      ) {
        res.status(400);
        throw new Error("Sorry, the clinic is not open at this time range");
      }
    }
    schedule.start_time = start_time;
    schedule.end_time = end_time;
    schedule.doctor_id = doctorId;
    schedule.day_of_week = day_of_week;
    await schedule.save({ userId: req?.user?.id });
    res.json({ msg: "success" });
  }
);
export const changePassword = asyncHandler<{
  validatedData: changePasswordInput;
}>(async (req, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const loggedInUserId = req.user?.id;

  if (userId !== loggedInUserId) {
    throw new ApiError(403, "You can't change other user paaword");
  }
  const user = await userService.changeUserPassword(userId, req.validatedData);
  const [employee, role] = await Promise.all([
    Employee.findByPk(user.dataValues.employee_id),
    Role.findByPk(user.dataValues.role_id),
  ]);

  const permissions = await permissionService.formatUserPermission(user);

  // const token = generateToken(user.id);
  const userData = {
    id: user.id as number,
    is_new: user.is_new!,
    name: employee?.getFullName().trim()!,
    digital_signature: employee?.digital_signature || null,
    doctor_titer: employee?.doctor_titer || null,
    role: role?.name!,
    permissions: permissions,
  };
  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);
  const clinicInfo = await clinicProfileService.getClinicInfo();
  // console.log(token);
  // const permissions = user.userPermissions;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: configs.NODE_DEV === "production",
    sameSite: "strict",
    maxAge: 60 * 60,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: configs.NODE_DEV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
  });
  res.status(200).json({
    success: true,
    message: "password changed successfully",
    data: {
      user: userData,
      accessToken,
      refreshToken,
      clinicInfo: clinicInfo,
    },
  });
  // const { id } = req.params;
  // const { password } = req.body;
  // const user = await db.User.findOne({
  //   where: {
  //     id: id,
  //   },
  //   include: [
  //     {
  //       model: db.Role,
  //       as: "role",
  //       // include: ["permissions"],
  //     },
  //     {
  //       model: db.Employee,
  //       as: "employee",
  //     },
  //     {
  //       model: db.Permission,
  //       as: "userPermissions",
  //     },
  //   ],
  // });
  // if (!user) {
  //   res.status(404);
  //   throw new Error("User not found");
  // }
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   res.status(400);
  //   throw new Error("Invalid password");
  // }
  // user.password = req.body.newPassword;
  // user.is_new = false;
  // await user.save();
  // const token = generateToken(res, user.id);
  // console.log(token);
  // const permissions = user.userPermissions;
  // res.status(200).json({
  // id: user.id,
  // is_new: user.is_new,
  // name:
  //   user.employee.firstName +
  //   " " +
  //   user.employee.middleName +
  //   " " +
  //   user.employee.lastName,
  // token,
  // role: user.role,
  // permissions: user.userPermissions,
  // user,
  // address: user.address,
  // });
});
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const username = "user-0003";
    const user = await db.User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    user.password = "123456";
    await user.save();
    res.status(200).json({ msg: "success" });
  }
);
// };

// module.exports = UserController;
