// const db = require("..");

module.exports.userAssociation = (db) => {
  db.User.belongsTo(db.Employee, {
    foreignKey: "employee_id",
    as: "employee",
  });
  db.User.belongsToMany(db.Permission, {
    through: db.UserPermission,
    as: "userPermissions",
    foreignKey: "user_id",
  });
};
