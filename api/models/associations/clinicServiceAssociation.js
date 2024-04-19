// import db = require("..")

module.exports.clinicServiceAssociation = (db) => {
  db.ServiceItem.hasOne(db.LabTestProfile, {
    foreignKey: "labTest_id",
    as: "labTestProfile",
  });
  //   db.LabTestProfile.hasMany(db.LabTestProfile, {
  //     // through: db.PanelUnderpanel,
  //     foreignKey: "parentId",
  //     as: "children",
  //   });
  //   db.LabTestProfile.belongsTo(db.LabTestProfile, {
  //     foreignKey: "parentId",
  //     as: "parent",
  //   });

  db.PanelUnderpanel.belongsTo(db.LabTestProfile, {
    // through: db.PanelUnderpanel,
    foreignKey: "underpanel_id",
    as: "ParentPanel",
  });
  db.LabTestProfile.hasMany(db.PanelUnderpanel, {
    // through: db.PanelUnderpanel,
    foreignKey: "panel_id",
    as: "underPanels",
  });
};
