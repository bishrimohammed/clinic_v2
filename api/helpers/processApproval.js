const db = require("../models");
const {
  appointmentApprovalHelper,
} = require("./approvalHelper/approvalHelper");

module.exports.processApproval = async (
  tableName,
  targetId,
  hasNextApprover,
  nextApprover,
  processedUser,
  approvalRequest
) => {
  switch (tableName) {
    case "appointments_audit":
      const appointmentData = await db.AppointmentAudit.findOne({
        where: {
          id: targetId,
        },
      });
      appointmentApprovalHelper(
        appointmentApprovalHelper,
        approvalRequest,
        processedUser,
        hasNextApprover,
        nextApprover
      );
    // case 'medical_records': return 'MedicalRecord';
    // case 'prescriptions': return 'Prescription';
    // case 'prescribed_medicines': return 'PrescribedMedicine';
    // case 'current_medications': return 'CurrentMedication';
    // case 'medical_record_details': return 'MedicalRecordDetail';
    // case 'patient_details': return 'PatientDetail';
    // case 'patient_medical_records': return 'PatientMedicalRecord';
    // case 'patient_prescriptions': return 'PatientPrescription';
    // case 'patient_prescribed_medicines': return 'PatientPrescribedMedicine';
    // case 'patient_current_medications': return 'PatientCurrentMedication';
    // case 'patient_medical_record_details': return 'PatientMedicalRecordDetail';
    // case 'patient_notes': return 'PatientNote';
    // case 'patient_notes_audit': return 'PatientNote
  }
};
