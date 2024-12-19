// const db = require("..");

module.exports.dutyAssociation = (db) => {
  db.DutyAssignment.belongsTo(db.DutyProgram, {
    foreignKey: "dutyprogram_id",
    as: "dutyProgram",
  });
  db.DutyAssignment.belongsTo(db.Employee, {
    foreignKey: "employee_id",
    as: "employee",
  });
  db.DutyProgram.hasMany(db.DutyAssignment, {
    foreignKey: "dutyprogram_id",
    as: "dutyAssignments",
  });
};
