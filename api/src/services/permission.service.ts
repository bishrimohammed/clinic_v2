import { User } from "../models";

export const formatUserPermission = async (user: User) => {
  const permissions = await user.getUserPermissions();

  const processedPermissions = permissions.map((p) => {
    return {
      name: p.name,
      permissionId: p.UserPermission?.dataValues.permission_id as number,
      create: p.UserPermission?.dataValues.create!,
      read: p.UserPermission?.dataValues.read!,
      edit: p.UserPermission?.dataValues.edit!,
      delete: p.UserPermission?.dataValues.delete!,
    };
  });
  return processedPermissions;
};
