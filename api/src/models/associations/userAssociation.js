// const db = require("..");

module.exports.userAssociation = (db) => {
  db.User.belongsTo(db.Role, {
    foreignKey: "role_id",
    as: "role",
  });
  db.User.belongsTo(db.Employee, {
    foreignKey: "employee_id",
    as: "employee",
  });
  db.User.belongsToMany(db.Permission, {
    through: db.UserPermission,
    as: "userPermissions",
    foreignKey: "user_id",
  });
  db.User.hasMany(db.Schedule, {
    foreignKey: "doctor_id",
    as: "schedules",
  });
};
