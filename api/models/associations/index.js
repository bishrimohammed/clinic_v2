const { MedicalRecordAssociation } = require("./MedicalRecordAssociation");
const {
  MedicalRecordDetailAssocations,
} = require("./medicalRecordDetailAssocations");
const { InvestiagtionAssocation } = require("./investiagtionAssocation.js");
const { employeeAssociation } = require("./employeeAssociation.js");
const { roleAssociation } = require("./roleAssociation.js");
const { userAssociation } = require("./userAssociation.js");
const { clinicServiceAssociation } = require("./clinicServiceAssociation.js");
const { creditCompanyAssociation } = require("./creditCompanyAssociation.js");
const { dutyAssociation } = require("./dutyAssociation.js");
const { patientAssocation } = require("./patientAssocation.js");
const { paymentAssociation } = require("./paymentAssociation.js");
module.exports = {
  MedicalRecordAssociation,
  MedicalRecordDetailAssocations,
  InvestiagtionAssocation,
  employeeAssociation,
  roleAssociation,
  userAssociation,
  clinicServiceAssociation,
  creditCompanyAssociation,
  dutyAssociation,
  patientAssocation,
  paymentAssociation,
};
