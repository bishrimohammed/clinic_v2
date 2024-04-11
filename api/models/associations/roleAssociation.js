// const db = require("..")

module.exports.roleAssociation = (db) => {
  db.Role.belongsToMany(db.Permission, {
    through: db.rolePermission,
    foreignKey: "role_id",
    as: "permissions",
  });
  db.Permission.belongsToMany(db.Role, {
    through: db.rolePermission,
    foreignKey: "permission_id",
    as: "roles",
  });
  db.Permission.belongsToMany(db.User, {
    through: db.UserPermission,
    foreignKey: "permission_id",
    as: "users",
  });
};
