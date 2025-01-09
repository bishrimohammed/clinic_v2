// const db = require("..");

const InvestiagtionAssocation = (db) => {
  db.InvestigationOrder.belongsTo(db.MedicalRecord, {
    foreignKey: "medicalRecord_id",
    as: "medicalRecord",
  });
  // db.InvestigationOrder.hasMany(db.OrderedTest,{
  //   foreignKey: "investigationOrder_id",
  //   as: "orderedTests",
  // })
  db.InvestigationOrder.hasMany(db.OrderedTest, {
    foreignKey: "investigationOrder_id",
    as: "orderedTests",
  });
  db.InvestigationOrder.belongsToMany(db.ServiceItem, {
    through: db.OrderedTest,
    foreignKey: "investigationOrder_id",
    as: "tests",
  });
  db.ServiceItem.belongsToMany(db.InvestigationOrder, {
    through: db.OrderedTest,
    foreignKey: "serviceItem_id",
    as: "investigationOrders",
  });
  db.OrderedTest.belongsTo(db.User, {
    foreignKey: "requested_by",
    as: "requestedBy",
  });
  db.OrderedTest.belongsTo(db.User, {
    foreignKey: "reported_by",
    as: "reportedBy",
  });
  db.OrderedTest.belongsTo(db.ServiceItem, {
    foreignKey: "serviceItem_id",
    as: "test",
  });
};

module.exports = { InvestiagtionAssocation };
