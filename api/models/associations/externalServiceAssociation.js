// const db = require("..");

const externalServiceAssociation = (db) => {
  db.ExternalService.hasOne(db.Procedure, {
    foreignKey: "externalService_id",
    as: "procedure",
  });

  db.Procedure.belongsTo(db.ExternalService, {
    foreignKey: "externalService_id",
    as: "externalService",
  });
  db.Procedure.belongsTo(db.User, {
    foreignKey: "created_by",
    as: "createdBy",
  });
  db.Procedure.belongsTo(db.ServiceItem, {
    foreignKey: "serviceItem_id",
    as: "serviceItem",
  });
  db.MedicalBilling.belongsTo(db.ExternalService, {
    foreignKey: "externalService_id",
    as: "externalService",
  });
  db.ExternalService.hasOne(db.InvestigationOrder, {
    foreignKey: "externalService_id",
    as: "investigation",
  });
  db.InvestigationOrder.belongsTo(db.ExternalService, {
    foreignKey: "externalService_id",
    as: "externalService",
  });
  db.ExternalService.belongsTo(db.User, {
    foreignKey: "examiner",
    as: "Examiner",
  });
};
module.exports = {
  externalServiceAssociation,
};
