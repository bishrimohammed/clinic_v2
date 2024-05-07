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

  db.CreditCompanyProfile.hasMany(db.CompanyEmployee, {
    foreignKey: "company_id",
    as: "companyEmployees",
  });

  db.CompanyEmployee.belongsTo(db.CreditCompanyProfile, {
    foreignKey: "company_id",
    as: "company",
  });
  db.CompanyEmployee.belongsTo(db.Address, {
    foreignKey: "address_id",
    as: "address",
  });
  //
  db.CreditAgreement.belongsToMany(db.Patient, {
    through: db.CreditPatient,
    foreignKey: "agreement_id",
    as: "patients",
  });

  db.CreditPatient.belongsTo(db.CompanyEmployee, {
    foreignKey: "employee_id",
    as: "employee",
  });
  db.CreditPatient.hasMany(db.CreditPatientAttachment, {
    foreignKey: "creditPatient_id",
    as: "attachments",
  });
};
