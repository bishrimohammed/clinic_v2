const db = require("../models");
const {
  createAppointment,
  updateAppointment,
} = require("../services/appointment.Service");
const { createApprovalRequestAction } = require("../services/approvalService");
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
      // console.log(appointmentData);
      // console.log(nextApprover);

      // appointmentApprovalHelper(
      //   appointmentData,
      //   approvalRequest,
      //   processedUser,
      //   hasNextApprover,
      //   nextApprover
      // );

      await createApprovalRequestAction(
        approvalRequest.id,
        processedUser.id,
        "Approved"
      );
      if (hasNextApprover) {
        // .then(async () => {
        approvalRequest.current_approval_level += 1;
        approvalRequest.current_approval_user = nextApprover.user_id;
        await approvalRequest.save({ hooks: false });
        return "Request is sent to the next Approver";
        // })
        // .catch((err) => {
        //   console.log(err);
        //   return "Request not sent to the next Approver";
        // });
      } else {
        const Data = JSON.parse(appointmentData.metaData);
        // console.log(Data);
        if (appointmentData.operation_type === "I") {
          const appointment = await createAppointment(Data, processedUser.id);
          // .then(async (response) => {
          // console.log(response);
          approvalRequest.status = "Approved";
          await approvalRequest.save({ hooks: false });
          return "Request is Approved Successfully";
          // })
          // .catch((err) => {
          // console.log(err);
          // return err;
          // });
        } else if (appointmentData.operation_type === "U") {
          updateAppointment(approvalRequest.main_targetId, Data);
        }
        // approvalRequest.status = "Approved"
        // await approvalRequest.save({hooks: false})
      }
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
