export const hasPermission = (permissionName, action) => {
  const permissions = JSON.parse(
    localStorage.getItem("currentUser")
  )?.permissions;
  return permissions.some((p) => {
    return p.name === permissionName && p.userpermission?.action;
  });
};
