const { MedicalRecordAssociation } = require("./MedicalRecordAssociation");
const {
  MedicalRecordDetailAssocations,
} = require("./medicalRecordDetailAssocations");
const { InvestiagtionAssocation } = require("./investiagtionAssocation.js");
const { employeeAssociation } = require("./employeeAssociation.js");
const { roleAssociation } = require("./roleAssociation.js");
const { userAssociation } = require("./userAssociation.js");
module.exports = {
  MedicalRecordAssociation,
  MedicalRecordDetailAssocations,
  InvestiagtionAssocation,
  employeeAssociation,
  roleAssociation,
  userAssociation,
};
