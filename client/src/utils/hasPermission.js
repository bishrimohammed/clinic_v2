export const hasPermission = (permissionName, action) => {
  const permissions = JSON.parse(
    localStorage.getItem("currentUser")
  )?.permissions;
  //   console.log(permissions);
  return permissions?.some((p) => {
    if (p.name.toLowerCase() === permissionName.toLowerCase()) {
      if (action === "read") {
        return p.userpermission?.read;
      } else if (action === "create") {
        return p.userpermission?.create;
      } else if (action === "update") {
        return p.userpermission?.update;
      } else if (action === "delete") {
        return p.userpermission;
      }
      //   return p.userpermission?.action;
    }
    return false;
  });
};
