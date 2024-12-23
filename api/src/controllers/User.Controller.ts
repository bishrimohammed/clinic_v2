import { Request, RequestHandler, Response } from "express";
import { authService, clinicService, userService } from "../services";
import { Employee, Role } from "../models";
import configs from "../config/configs";
import { UserRegisterInput, UserUpdateInput } from "../types/user";

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const db = require("../models");
const { generateToken } = require("../utils/generateToken");
const { Op, where } = require("sequelize");
const getClinicInformation = require("../helpers/getClinicInformation");
// const db = require("../models/index.js");
// const { getPaddedName } = require("../utils/getPaddedName.js");
const User = db.User;
// req.user.id;
// const UserController = {
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: db.Role,
        as: "role",
        attributes: ["name"],
        include: [
          {
            model: db.Permission,
            as: "permissions",
            // attributes: ["name"],
          },
        ],
      },
      {
        model: db.Employee,
        as: "employee",
        // attributes: ["name"],
        include: [
          {
            model: db.Address,
            as: "address",
            // attributes: ["name"],
          },
        ],
      },
      {
        model: db.Permission,
        as: "userPermissions",
      },
    ],
  });
  // const user = await User.findAll({
  //   include: [
  //     {
  //       model: db.Permission,
  //       as: "userPermissions",
  //     },
  //   ],
  // });
  // const region = await db.Region.findAll({ include: ["cities"] });
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
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  res.json(user);
});
export const registerUser = asyncHandler(
  async (req: Request<{}, {}, {}>, res: Response) => {
    // return;
    // const { employeeId, password, role, username, permissions } = req.body;
    const body = req.body as UserRegisterInput;
    // return;
    // console.log(req.body);
    // const isUserExist = await db.User.findOne({
    //   where: {
    //     username: username.toLowerCase(),
    //   },
    // });
    const user = await userService.registerUser(body);
    // if (isUserExist) {
    //   res.status(500);
    //   throw new Error("Username was taken. Please try another one.");
    // }

    // const user = await db.User.create({
    //   password: password,
    //   employee_id: employeeId,
    //   username: username,
    //   role_id: role,
    // });
    // const username1 = getPaddedName(user.id, 4, "user-");
    // user.username = username;
    // await user.save();
    // await Promise.all(
    //   permissions.map((p) => {
    //     return db.UserPermission.create({
    //       user_id: user.id,
    //       permission_id: p.permissionId,
    //       create: p.create,
    //       read: p.read,
    //       update: p.update,
    //       delete: p.delete,
    //     });
    //   })
    // );
    res.status(201).json({ message: "success" });
  }
);
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // console.log(req.body);
  const user = await authService.login(username, password);
  const [employee, role] = await Promise.all([
    Employee.findByPk(user.dataValues.employee_id),
    Role.findByPk(user.dataValues.role_id),
  ]);
  // const user = await db.User.findOne({
  //   where: {
  //     username: username,
  //   },
  //   // include: ["role", "employee", "userPermissions"],
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
  // // console.log("isMatch: " + isMatch);
  // if (!isMatch) {
  //   res.status(400);
  //   throw new Error("Invalid password");
  // }
  const {
    id: userId,

    role_id,

    // role,
  } = user;
  const token = generateToken(user.id);
  const clinicInfo = await clinicService.getClinics();
  // console.log(token);
  // const permissions = user.userPermissions;
  res.cookie("token", token, {
    httpOnly: true,
    secure: configs.NODE_DEV === "production",
    sameSite: "strict",
    maxAge: 3 * 60 * 60 * 24,
  });
  res.status(200).json({
    user: {
      id: userId,
      is_new: user.is_new,
      name: employee?.getFullName().trim(),
      digital_signature: employee?.digital_signature,
      doctor_titer: employee?.doctor_titer,
      role: role?.name,
    },
    token,
    // permissions: user.userPermissions,
    clinicInfo: clinicInfo,
    // user,
    // address: user.address,
  });
  // res.status(201).json(user);
  // console.log(req.body.userData);
});
export const updateUser = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const body = req.body as UserUpdateInput;
    const user = await userService.updateUser(req.params.id, body);
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
    res.json({ msg: "success", user });
    // console.log(req.body);
  }
);
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body.userData);
});
export const deactivateUser = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.body.userData);
    const { id } = req.params;
    const updatedUser = await db.User.update(
      { status: false },
      { where: { id: id } }
    );
    // .then(([rowsUpdated, [updatedUser]]) => {
    //   res.status(200).json(updatedUser);
    // })
    res.status(200).json({ msg: "success" });
  }
);
export const activateUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser = await db.User.update(
      { status: true },
      { where: { id: id } }
    );
    // .then(([rowsUpdated, [updatedUser]]) => {
    //   res.status(200).json(updatedUser);
    // })
    res.json({ msg: "success" });
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
export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password } = req.body;
    const user = await db.User.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: db.Role,
          as: "role",
          // include: ["permissions"],
        },
        {
          model: db.Employee,
          as: "employee",
        },
        {
          model: db.Permission,
          as: "userPermissions",
        },
      ],
    });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid password");
    }
    user.password = req.body.newPassword;
    user.is_new = false;
    await user.save();
    const token = generateToken(res, user.id);
    // console.log(token);
    const permissions = user.userPermissions;
    res.status(200).json({
      id: user.id,
      is_new: user.is_new,
      name:
        user.employee.firstName +
        " " +
        user.employee.middleName +
        " " +
        user.employee.lastName,
      token,
      role: user.role,
      permissions: user.userPermissions,
      // user,
      // address: user.address,
    });
  }
);
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
