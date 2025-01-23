import { Request, RequestHandler, Response } from "express-serve-static-core";
import {
  authService,
  clinicProfileService,
  permissionService,
  userService,
} from "../services";
import { Employee, Role, User } from "../models";
import configs from "../config/configs";
import {
  addDoctorWorkingHoursInput,
  changePasswordInput,
  UserLoginInput,
  userRegisterSchema,
  UserUpdateInput,
  userUpdateSchema,
} from "../types/user";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import asyncHandler from "../utils/asyncHandler";

// const db = require("../models");
// import { generateToken } from "../utils/generateToken"
// import { Op } from "sequelize";
import { ApiError } from "../shared/error/ApiError";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getUsers();

  res.json(users);
});
export const getActiveUsers: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // const users = await User.findAll({
    //   where: { status: true },
    //   attributes: { exclude: ["password"] },
    //   include: [
    //     {
    //       model: Employee,
    //       as: "employee",
    //       attributes: ["id", "firstName", "lastName", "middleName"],
    //     },
    //   ],
    // });
    // res.json(users);
  }
);
export const getDoctors = asyncHandler(async (req: Request, res: Response) => {
  const doctors = await userService.getDoctorsUser();
  res.json(doctors);
});
export const getUserById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await userService.getUserById(userId);
    const { password, ...userData } = user.toJSON();

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
export const loginUser = asyncHandler(
  async (req: Request & { validatedData: UserLoginInput }, res: Response) => {
    // const { username, password } = req.body;
    // console.log(req.body);
    const { password, username } = req.validatedData;
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
      statsu: "success",
      message: "Logged in successfully",
      data: {
        user: userData,
        accessToken,
        refreshToken,
        clinicInfo: clinicInfo,
      },
    });
  }
);
export const updateUser = asyncHandler<{
  validatedData: typeof userUpdateSchema._type;
}>(async (req, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  const user = await userService.updateUser(userId, req.validatedData);
  const { password, ...userData } = user.toJSON();

  res.json({ success: true, message: "success", data: userData });
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
  }
);
export const addWorkingHour = asyncHandler<{
  validatedData: addDoctorWorkingHoursInput;
}>(async (req, res: Response) => {
  const doctorId = parseInt(req.params.id, 10);
  const schedule = await userService.AddDoctorWorkingHour(
    doctorId,
    req.validatedData
  );

  res.status(201).json({ success: true, message: "success", data: schedule });
});
export const updateWorkHour = asyncHandler<{
  validatedData: addDoctorWorkingHoursInput;
}>(async (req, res: Response) => {
  const doctorId = parseInt(req.params.id, 10);
  const scheduleId = parseInt(req.params.scheduleId, 10);
  const schedule = await userService.updatedDoctorWorkingHour(
    doctorId,
    scheduleId,
    req.validatedData
  );

  res.json({
    success: true,
    message: "schedule successfully updated",
    data: schedule,
  });
});
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
});
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    // const username = "user-0003";
    // const user = await db.User.findOne({
    //   where: {
    //     username: username,
    //   },
    // });
    // if (!user) {
    //   res.status(404);
    //   throw new Error("User not found");
    // }
    // user.password = "123456";
    // await user.save();
    res.status(200).json({ msg: "success" });
  }
);
// };

// module.exports = UserController;
