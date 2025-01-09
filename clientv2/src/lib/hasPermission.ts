import { useUserSession } from "@/store/auth";
import { PermissionAction, PermissionName } from "@/types/global";

export const hasPermission = (
  permission_name: PermissionName,
  action: PermissionAction = "read"
) => {
  const userPermissions = useUserSession.getState().user?.permissions;
  const permissionFound = userPermissions?.find(
    (p) => p.name === permission_name
  );
  const hasAccess = permissionFound ? permissionFound[action] : false;
  //   console.log(hasAccess);

  return hasAccess;
};
