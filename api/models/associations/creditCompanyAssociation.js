// const db = require("..");

module.exports.creditCompanyAssociation = (db) => {
  db.CreditCompanyProfile.belongsTo(db.Address, {
    foreignKey: "address_id",
    as: "address",
  });
  db.CreditCompanyProfile.hasMany(db.CreditAgreement, {
    foreignKey: "company_id",
    as: "agreements",
  });
};
