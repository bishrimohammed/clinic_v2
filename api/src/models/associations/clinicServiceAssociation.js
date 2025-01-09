// import db = require("..")

module.exports.clinicServiceAssociation = (db) => {
  db.ServiceItem.hasOne(db.LabTestProfile, {
    foreignKey: "labTest_id",
    as: "labTestProfile",
  });
  db.LabTestProfile.belongsTo(db.ServiceItem, {
    foreignKey: "labTest_id",
    as: "serviceItem",
  });
  db.PanelUnderpanel.belongsTo(db.LabTestProfile, {
    foreignKey: "underpanel_id",
    as: "ParentPanel",
  });
  db.LabTestProfile.hasMany(db.PanelUnderpanel, {
    foreignKey: "panel_id",
    as: "underPanels",
  });
};
