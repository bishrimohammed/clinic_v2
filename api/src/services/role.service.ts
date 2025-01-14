import { Role, RolePermission } from "../models";
import { ApiError } from "../shared/error/ApiError";
import { createRoleT } from "../types/role";

export const getRoles = async (query: {
  status: "true" | "false" | undefined;
}) => {
  const whereClause: any = {};
  if (query.status) {
    whereClause.status = query.status === "true";
  }
  const roles = await Role.findAll({
    where: whereClause,
  });
  return roles;
};

export const getRoleById = async (id: string) => {
  const role = await Role.findByPk(id);
  if (!role) {
    throw new ApiError(404, "Role is not found");
  }
  return role;
};
// : {
//     name: string;
//     permissions: {
//       permission_id: number;
//       create: boolean;
//       read: boolean;
//       update: boolean;
//       delete: boolean;
//     }[];
//   }
export const createRole = async (data: createRoleT) => {
  const { name, permissions } = data;
  const role = await Role.create({
    name: name,
  });
  const transformedPermissions = permissions.map((p) => {
    return { ...p, role_id: role.id };
  });
  //   await role.addPermissions([1]);
  await RolePermission.bulkCreate(transformedPermissions);
  return role;
};
export const updateRole = async (id: string, data: createRoleT) => {
  const { name, permissions } = data;
  const role = await getRoleById(id);
  await role.update({
    name: name,
  });
  await role.setPermissions([]);
  const transformedPermissions = permissions.map((p) => {
    return { ...p, role_id: role.id };
  });
  //   await role.addPermissions([1]);
  await RolePermission.bulkCreate(transformedPermissions);
  return role;
};
export const deactivateRole = async (id: string) => {
  const Role = await getRoleById(id);
  await Role.update({ status: false });
  return Role;
};

export const activateRole = async (id: string) => {
  const Role = await getRoleById(id);
  await Role.update({ status: true });
  return Role;
};
