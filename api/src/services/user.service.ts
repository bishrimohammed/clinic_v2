// import { clinicProfileService } from "services";
import { clinicProfileService, scheduleService } from ".";
import logger from "../config/logger";
import sequelize from "../db";
import {
  User,
  UserPermission,
  Role,
  Employee,
  Schedule,
  Appointment,
} from "../models";
import { ApiError } from "../shared/error/ApiError";
import {
  addDoctorWorkingHoursInput,
  changePasswordInput,
  UserRegisterInput,
  UserUpdateInput,
} from "../types/user";
import { Op } from "sequelize";

interface permissionType {
  permissionId: number;
  create: boolean;
  read: boolean;
  edit: boolean;
  delete: boolean;
}
/**
 * Create user permission
 * @param {number} userId - user id
 * @param {permissionType[]} permissions - permissions to be created
 * @returns created permissions
 */
const createUserPermission = async (
  userId: number,
  permissions: permissionType[]
) => {
  const createdpermissions = await Promise.all(
    permissions.map((p) => {
      return UserPermission.create({
        user_id: userId,
        permission_id: p.permissionId,
        create: p.create,
        read: p.read,
        edit: p.edit,
        delete: p.delete,
      });
    })
  );
  return createdpermissions;
};
// get paginated users and sort
export const getUsers = async (
  page?: number,
  limit?: number,
  sort?: string
) => {
  // const users = await User.findAndCountAll({
  //   limit: limit,
  // offset: (page - 1) * limit,
  // order: [[sort, "ASC"]],
  // });
  const users = await User.findAll({
    // where: {
    //   "$role.name$": "CAshier",
    // },
    include: [
      {
        model: Employee,
        as: "employee",
        attributes: ["id", "firstName", "middleName", "lastName"],
      },
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "username", "status"],
    order: [
      ["employee", "firstName", "ASC"],
      ["employee", "lastName", "ASC"],
      ["employee", "middleName", "ASC"],
    ],
  });

  return users;
};

export const getDoctorsUser = async () => {
  const users = await User.findAll({
    where: {
      "$role.name$": "doctor",
    },
    include: [
      {
        model: Employee,
        as: "employee",
        attributes: ["id", "firstName", "middleName", "lastName"],
      },
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
      {
        model: Schedule,
        as: "schedules",
      },
    ],
    attributes: ["id", "username", "status"],
    order: [
      ["employee", "firstName", "ASC"],
      ["employee", "lastName", "ASC"],
      ["employee", "middleName", "ASC"],
    ],
  });

  return users;
};
/**
 * Get user by username
 * @param username
 * @returns user object or null
 */
export const getUserByusername = async (username: string) => {
  return await User.findOne({
    where: { username: username },
  });
};

/**
 * Get user by id
 * @param {string} id
 * @returns {User} user object or null
 */

export const getUserById = async (id: number): Promise<User> => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

/**
 * Register a new user
 * @param {UserRegisterInput} data - user data to be registered
 * @returns {User} user object
 * @throws {ApiError} if user already exist
 */

export const registerUser = async ({
  employeeId,
  password,
  role_id,
  username,
  permissions,
}: UserRegisterInput) => {
  const userExist = await getUserByusername(username);
  if (userExist) {
    throw new ApiError(403, "User already exist", [
      { message: "User already exist", path: ["username"] },
    ]);
  }
  const user = await User.findOne({
    where: {
      employee_id: employeeId,
    },
  });
  if (user) {
    throw new ApiError(403, "Employee has already an account", []);
  }
  const transaction = await sequelize.transaction();
  try {
    const user = await User.create(
      {
        employee_id: employeeId,
        password,
        role_id,
        username,
      },
      { transaction }
    );
    // user.removeUserPermissions()
    const transformedPermissions = permissions.map((permission) => {
      return { ...permission, user_id: user.id };
    });
    // await Promise.all(
    //   permissions.map((p) => {
    //     return UserPermission.create({
    //       user_id: user.id,
    //       permission_id: p.permission_id,
    //       create: p.create,
    //       read: p.read,
    //       edit: p.edit,
    //       delete: p.delete,
    //     });
    //   })
    // );
    await UserPermission.bulkCreate(transformedPermissions, { transaction });
    await transaction.commit();
    return user;
  } catch (error) {
    const err = error as Error;
    await transaction.rollback();
    throw err;
    // ApiError(400, `Failed to create user account: ${err.message}`);
    // next
  }
};
/**
 * Update user
 * @param {string} userId - user id
 * @param {UserUpdateInput} newData - new data to be updated
 * @returns user object
 * @throws {ApiError} if user not found
 */
export const updateUser = async (userId: number, newData: UserUpdateInput) => {
  const {
    employeeId,
    password,
    role_id,
    username,
    permissions,
    // isUpdatePassword,
  } = newData;
  const transaction = await sequelize.transaction();
  try {
    const user = await getUserById(userId);
    await user.update({
      role_id: role_id,
      employee_id: employeeId,
      username: username,
    });
    // if (isUpdatePassword) {
    //   user.setPassword(password);
    //   await user.save();
    // }
    await user.setUserPermissions([]);
    // await createUserPermission(user.id, permissions);
    const transformedPermissions = permissions.map((permission) => {
      return { ...permission, user_id: user.id };
    });
    await UserPermission.bulkCreate(transformedPermissions);
    await transaction.commit();
    return user;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const deleteUser = async (userId: string) => {};

/**
 * Deactivate user
 * @param {string} userId - user id
 * @returns user object
 * @throws {ApiError} if user not found
 */

export const deactivateUser = async (userId: number) => {
  const user = await getUserById(userId);

  await user.update({
    status: false,
  });
  return user;
};

/**
 * Activate user
 * @param {string} userId - user id
 * @returns user object
 * @throws {ApiError} if user not found
 */

export const activateUser = async (userId: number) => {
  const user = await getUserById(userId);
  await user.update({
    status: true,
  });
  return user;
};

export const changeUserPassword = async (
  userId: number,
  data: changePasswordInput
) => {
  const { newpassword, oldpassword } = data;
  const user = await getUserById(userId);
  const isPasswordMatch = user.isPasswordMatch(oldpassword);
  if (!isPasswordMatch) {
    throw new ApiError(400, "Invalid oldPassword");
  }

  await user.update({
    password: newpassword,
  });
  return user;
};

export const AddDoctorWorkingHour = async (
  userId: number,
  working_hour: addDoctorWorkingHoursInput
) => {
  const { day_of_week, end_time, start_time } = working_hour;
  const clinicProfile = await clinicProfileService.getClinicInfo();
  const isClinicOpen = await clinicProfile.getWorkinghours({
    where: {
      day_of_week: day_of_week,
      start_time: {
        [Op.lte]: start_time,
      },
      end_time: {
        [Op.gte]: end_time,
      },
    },
  });
  // console.log(isClinicOpen);

  if (!isClinicOpen.length) {
    throw new ApiError(
      400,
      `The clinic is not open during the specified hours (${start_time} to ${end_time}) on ${day_of_week}. Please choose a different time or check the clinic's operating hours.`
    );
  }

  // check overlap doctor working hour
  const doctor = await getUserById(userId);
  const isDoctor = (await doctor.getRole()).name.toLowerCase() === "doctor";
  if (!isDoctor) {
    throw new ApiError(400, `The user is not a Doctor`);
  }
  const doctorWorkingHours = await doctor.getSchedules({
    where: {
      day_of_week: day_of_week,

      [Op.or]: [
        {
          start_time: { [Op.between]: [start_time, end_time] },
        },
        {
          end_time: { [Op.between]: [start_time, end_time] },
        },
        {
          [Op.and]: [
            { start_time: { [Op.lt]: start_time } },
            { end_time: { [Op.gt]: end_time } },
          ],
        },
      ],
    },
  });
  // console.log(doctorWorkingHours);

  if (doctorWorkingHours.length) {
    throw new ApiError(
      400,
      `The time interval overlaps (${start_time} to ${end_time} on ${day_of_week}) with an existing schedule .`
    );
  }

  const schedule = await scheduleService.createDoctorWorkingHour({
    ...working_hour,
    doctorId: doctor.id,
  });

  return schedule;
};

export const updatedDoctorWorkingHour = async (
  userId: number,
  scheduleId: number,
  working_hour: addDoctorWorkingHoursInput
) => {
  const { day_of_week, end_time, start_time } = working_hour;
  const doctor = await getUserById(userId);
  const schedules = await doctor.getSchedules({
    where: {
      id: scheduleId,
    },
  });
  if (!schedules.length) {
    throw new ApiError(400, `Schedule not found`);
  }
  const clinicProfile = await clinicProfileService.getClinicInfo();
  const isClinicOpen = await clinicProfile.getWorkinghours({
    where: {
      day_of_week: day_of_week,
      start_time: {
        [Op.lte]: start_time,
      },
      end_time: {
        [Op.gte]: end_time,
      },
    },
  });
  // console.log(isClinicOpen);

  if (!isClinicOpen.length) {
    throw new ApiError(
      400,
      `The clinic is not open during the specified hours (${start_time} to ${end_time}) on ${day_of_week}. Please choose a different time or check the clinic's operating hours.`
    );
  }

  // check overlap doctor working hour
  // const isDoctor = (await doctor.getRole()).name.toLowerCase() === "doctor";
  // if (!isDoctor) {
  //   throw new ApiError(400, `The user is not a Doctor`);
  // }
  const doctorWorkingHours = await doctor.getSchedules({
    where: {
      id: { [Op.ne]: scheduleId },
      day_of_week: day_of_week,
      [Op.or]: [
        {
          start_time: { [Op.between]: [start_time, end_time] },
        },
        {
          end_time: { [Op.between]: [start_time, end_time] },
        },
        {
          [Op.and]: [
            { start_time: { [Op.lt]: start_time } },
            { end_time: { [Op.gt]: end_time } },
          ],
        },
      ],
    },
  });
  // console.log(doctorWorkingHours);

  if (doctorWorkingHours.length) {
    throw new ApiError(
      400,
      `The time interval overlaps (${start_time} to ${end_time} on ${day_of_week}) with an existing schedule .`
    );
  }

  const schedule = schedules[0];
  await schedule.update({
    day_of_week,
    start_time,
    end_time,
  });
  // const schedule = await scheduleService.createDoctorWorkingHour({
  //   ...working_hour,
  //   doctorId: doctor.id,
  // });

  return schedule;
};

interface isDoctorAvailableParam {
  doctor: User;
  date: Date;
  dayOfWeek:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  time: string;
}
export const isDoctorAvailable = async (data: isDoctorAvailableParam) => {
  const { doctor, date, dayOfWeek, time } = data;
  // const doctor = await getUserById(doctorId);
  const schedules = await doctor.getSchedules({
    where: {
      day_of_week: dayOfWeek,
      [Op.and]: [
        {
          start_time: { [Op.lte]: time },
          end_time: { [Op.gte]: time },
        },
      ],
    },
  });
  // console.log(schedules);
  const hasSchedule = schedules.length > 0;
  if (!hasSchedule) {
    throw new ApiError(400, "Doctor doesn't have work now ");
  }

  const isAvailable = hasSchedule;
  return isAvailable;
};
