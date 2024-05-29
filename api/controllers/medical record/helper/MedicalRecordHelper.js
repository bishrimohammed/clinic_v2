const asyncHandler = require("express-async-handler");
const db = require("../../../models");
module.exports = MedicalRecordHelper = {
  add_MedicalRecord_medicineItem_to_Billing: asyncHandler(
    async (medical_record_id, items) => {
      const medical_record = await db.MedicalRecord.findByPk(medical_record_id);
      const MedicalBillingExist = await db.MedicalBilling.findOne({
        where: {
          medical_record_id: medical_record_id,
        },
      });
      let medicalBilling_Id;
      const visit = await db.PatientAssignment.findOne({
        where: {
          medicalRecord_id: medical_record_id,
        },
      });
      if (MedicalBillingExist) {
        medicalBilling_Id = MedicalBillingExist.id;
      } else {
        const MedicalRecord = await db.MedicalBilling.create({
          medical_record_id: medical_record_id,
          patient_id: medical_record.patient_id,
          visit_id: visit.id,
          date: new Date(),
        });
        medicalBilling_Id = MedicalRecord.id;
      }

      await Promise.all(
        items.map(async (medinice_id) => {
          return await db.Payment.create({
            medical_billing_id: medicalBilling_Id,
            item_id: medinice_id,
          });
        })
      )
        .then(async (payments) => {
          await visit.update({
            stage: "Waiting for payment",
          });
          console.log(payments);
          return "payment created successfully";
        })
        .catch((err) => {
          console.log(err);
          return "payment not created";
        });
    }
  ),
};
