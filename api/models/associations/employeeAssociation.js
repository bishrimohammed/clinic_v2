// const db = require("..");

const employeeAssociation = (db) => {
  db.Employee.belongsTo(db.Address, {
    foreignKey: "address_id",
    as: "address",
  });
  // employee belongsto one employee emergence contact
  db.Employee.belongsTo(db.EmergencyContact, {
    foreignKey: "emergence_contact_id",
    as: "emergencyContact",
  });

  db.EmergencyContact.belongsTo(db.Address, {
    foreignKey: "address_id",
    as: "address",
  });
  db.Employee.hasOne(db.User, {
    foreignKey: "employee_id",
    as: "user",
  });
};

module.exports = { employeeAssociation };
