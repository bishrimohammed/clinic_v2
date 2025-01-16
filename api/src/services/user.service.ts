// import { register } from "module";
import exp from "constants";
import { User, UserPermission, Role } from "../models";
import { ApiError } from "../shared/error/ApiError";
import { UserRegisterInput, UserUpdateInput } from "../types/user";

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
export const getUsers = async (page: number, limit: number, sort: string) => {
  const users = await User.findAndCountAll({
    limit: limit,
    offset: (page - 1) * limit,
    order: [[sort, "ASC"]],
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

export const getUserById = async (id: number) => {
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
  const user = await User.create({
    employee_id: employeeId,
    password,
    role_id,
    username,
  });
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
  await UserPermission.bulkCreate(transformedPermissions);
  return user;
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
  await user.setUsersPermissions([]);
  // await createUserPermission(user.id, permissions);
  const transformedPermissions = permissions.map((permission) => {
    return { ...permission, user_id: user.id };
  });
  await UserPermission.bulkCreate(transformedPermissions);
  return user;
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
