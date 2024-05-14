const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const db = require("../models/");
const { generateToken } = require("../utils/generateToken.js");
const { Op, where } = require("sequelize");
// const db = require("../models/index.js");
// const { getPaddedName } = require("../utils/getPaddedName.js");
const User = db.User;
const UserController = {
  getUsers: asyncHandler(async (req, res) => {
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
  }),
  getDoctors: asyncHandler(async (req, res) => {
    const { query } = req.query;
    console.log(req.user);
    const role = await db.Role.findOne({
      where: {
        name: {
          [Op.like]: `%doctor%`,
        },
        // status: true,
      },
      // include: ["users"],
    });
    // destrut users from roles

    // console.log(role);
    const doctors = await User.findAll({
      where: { role_id: role.id, status: true },
      attributes: { exclude: ["password"] },
      include: ["employee", "schedules", "role"],
    });
    res.json(doctors);
  }),
  getUserById: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);
    res.json(user);
  }),
  registerUser: asyncHandler(async (req, res) => {
    // return;
    const { employeeId, password, role, username, permissions } = req.body;
    // return;
    console.log(req.body);
    const isUserExist = await db.User.findOne({
      where: {
        username: username.toLowerCase(),
      },
    });

    // if (isUserExist) {
    //   res.status(500);
    //   throw new Error("Username was taken. Please try another one.");
    // }

    const user = await db.User.create({
      password: password,
      employee_id: employeeId,
      username: username,
      role_id: role,
    });
    // const username1 = getPaddedName(user.id, 4, "user-");
    // user.username = username;
    await user.save();
    await Promise.all(
      permissions.map((p) => {
        return db.UserPermission.create({
          user_id: user.id,
          permission_id: p.permissionId,
          create: p.create,
          read: p.read,
          update: p.update,
          delete: p.delete,
        });
      })
    );
    res.status(201).json({ message: "success" });
  }),
  loginUser: asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await db.User.findOne({
      where: {
        username: username,
      },
      // include: ["role", "employee", "userPermissions"],
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
      //   raw: true,
    });
    // console.log(req.body);
    // const userpassword = await user.getDataValue("password");
    // console.log(user);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("isMatch: " + isMatch);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid password");
    }
    const {
      id: userId,

      role_id,

      role,
    } = user;
    const token = generateToken(res, user.id);
    // console.log(token);
    // const permissions = user.userPermissions;
    res.status(200).json({
      id: userId,
      is_new: user.is_new,
      name:
        user.employee.firstName +
        " " +
        user.employee.middleName +
        " " +
        user.employee.lastName,
      token,
      role: role,
      permissions: user.userPermissions,
      // user,
      // address: user.address,
    });
    // res.status(201).json(user);
    // console.log(req.body.userData);
  }),
  updateUser: asyncHandler(async (req, res) => {
    // console.log(req.body);
    // res.status(400).json({ m: "ferf" });
    // return;
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    // const updatedUser = await db.User.update(req.body);
    // user.password = req.body.password;
    // user.email = req.body.email;
    const Otheruser = await db.User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // console.log(Otheruser?.id !== user.id);
    // if (Otheruser && Otheruser?.id !== user.id) {
    //   res.status(400);
    //   throw new Error("Username was taken. Please try another one.");
    // }
    if (req.body.isUpdatePasswordNeeded) {
      user.password = req.body.password;
    }
    user.role_id = req.body.role;
    user.username = req.body.username;
    await user.save();
    await user.setUserPermissions([]);
    await db.UserPermission.bulkCreate(req.body.permissions);
    res.json({ msg: "success" });
    // console.log(req.body);
  }),
  deleteUser: asyncHandler(async (req, res) => {
    console.log(req.body.userData);
  }),
  deactivateUser: asyncHandler(async (req, res) => {
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
  }),
  activateUser: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedUser = await db.User.update(
      { status: true },
      { where: { id: id } }
    );
    // .then(([rowsUpdated, [updatedUser]]) => {
    //   res.status(200).json(updatedUser);
    // })
    res.json({ msg: "success" });
    console.log(updatedUser);
  }),
  addWorkingHour: asyncHandler(async (req, res) => {
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
    const schedule = await db.Schedule.create({
      start_time: start_time,
      end_time: end_time,
      doctor_id: doctorId,
      day_of_week: day_of_week,
    });
    res.status(201).json({ msg: "success" });
  }),
  updateWorkHour: asyncHandler(async (req, res) => {
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
    await schedule.save();
    res.json({ msg: "success" });
  }),
  changePassword: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password, newPassword } = req.body;
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
  }),
};

module.exports = UserController;
