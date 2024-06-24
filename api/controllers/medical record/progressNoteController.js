const asyncHandler = require("express-async-handler");
// const { getMedicalRecordById } = require("./MedicalRecordController");
const {
  getMedicalRecordPrescription,
} = require("./helper/getMedicalRecordPrescription");
const db = require("../../models");
const MedicalRecordHelper = require("./helper/MedicalRecordHelper");
const { getMedicalRecordById } = require("./helper/getMedicalRecordById");
// const progressNote = require("../../models/progressNote");
module.exports = progressNoteController = {
  getMedicalRecordProgressNote: asyncHandler(async (req, res) => {
    const { medical_record_id } = req.params;
    const progessNotes = await db.ProgressNote.findAll({
      where: {
        medical_record_id,
      },
      include: [
        {
          model: db.User,
          as: "doctor",
          include: [
            {
              model: db.Employee,
              as: "employee",
              attributes: ["id", "firstName", "middleName", "lastName"],
            },
          ],
          attributes: ["id"],
        },
      ],
      order: [["taken_date", "DESC"]],
    });
    res.status(200).json(progessNotes);
  }),
  createprogressNote: asyncHandler(async (req, res) => {
    const { medical_record_id } = req.params;
    // [].length
    const {
      problemList,
      currentmanagement,
      plan,
      physicalExaminations,
      vitals,
      diagnoses,
      internal_prescriptions,
      underPanels,
      investigations,
    } = req.body;

    // console.log(req.body);
    // console.log(req.params);
    // return;
    const SavedForLateprogressNote = await db.Temporary_ProgressNote.findOne({
      where: {
        medical_record_id: medical_record_id,
        user_id: req.user.id,
      },
    });
    // console.log(SavedForLateprogressNote);
    if (SavedForLateprogressNote) {
      await db.Temporary_VitalSign.destroy({
        where: {
          medical_record_id: medical_record_id,
          user_id: req.user.id,
          progress_note_id: SavedForLateprogressNote.id,
        },
      });
      await db.Temporary_PhysicalExamination.destroy({
        where: {
          medical_record_id: medical_record_id,
          user_id: req.user.id,
          progress_note_id: SavedForLateprogressNote.id,
        },
      });
      await db.Temporary_LabInvestigationOrder.destroy({
        where: {
          medical_record_id: medical_record_id,
          user_id: req.user.id,
          progress_note_id: SavedForLateprogressNote.id,
        },
      });
      await db.Temporary_Diagnosis.destroy({
        where: {
          medical_record_id: medical_record_id,
          user_id: req.user.id,
          progress_note_id: SavedForLateprogressNote.id,
        },
      });
      await db.Temporary_Prescription.destroy({
        where: {
          medical_record_id: medical_record_id,
          user_id: req.user.id,
          progress_note_id: SavedForLateprogressNote.id,
        },
      });
      await SavedForLateprogressNote.destroy();
    }

    const MedicaRecordID = parseInt(medical_record_id);
    const medicalRecord = await getMedicalRecordById(MedicaRecordID);
    const prescriptionExist = await getMedicalRecordPrescription(
      medical_record_id
    );
    if (!medicalRecord) {
      res.status(404);
      throw new Error("Medical record not found");
    }
    // console.log(medicalRecord);
    // console.log(req.body);
    const progressNote = await db.ProgressNote.create({
      doctor_id: req.user.id,
      medical_record_id: medicalRecord.id,
      plan: plan,
      problem_list: problemList,
      current_management: currentmanagement,
      taken_date: new Date(),
    });
    if (investigations.length > 0) {
      // console.log("\nejdgbwjegfv\n");
      const is_Invetigated = await db.InvestigationOrder.findOne({
        where: {
          medicalRecord_id: medicalRecord.id,
        },
      });
      let investiagtionId;
      if (is_Invetigated) {
        investiagtionId = is_Invetigated.id;
      } else {
        const newInvestigation = await db.InvestigationOrder.create({
          medicalRecord_id: medicalRecord.id,
        });
        if (!newInvestigation) {
          res.status(500);
          throw new Error("unable to createInvestigation");
        }
        investiagtionId = newInvestigation.id;
      }
      await Promise.all(
        investigations.map(async (test) => {
          return db.OrderedTest.create({
            serviceItem_id: test,
            investigationOrder_id: investiagtionId,
            requested_by: req.user.id,
            reported_by: null,
            comment: "",
            result: "",
          });
        })
      );
      await MedicalRecordHelper.add_MedicalRecord_medicineItem_to_Billing(
        medicalRecord.id,
        investigations
      );
      if (underPanels.length > 0) {
        await Promise.all(
          underPanels.map((test) => {
            return db.OrderedTest.create({
              serviceItem_id: test,
              investigationOrder_id: investiagtionId,
              requested_by: req.user.id,
              reported_by: null,
              comment: "",
              result: "",
              is_underpanel: true,
            });
          })
        );
      }
      is_Invetigated.status = false;
      await is_Invetigated.save();
    }

    // console.log(prescriptionExist);

    if (internal_prescriptions.length > 0) {
      const medicineItemIds = internal_prescriptions.map((medicine) => {
        return parseInt(medicine.medicine_id);
      });
      let prescriptionID;
      if (prescriptionExist) {
        prescriptionID = prescriptionExist.id;
      } else {
        const prescription = await db.Prescription.create({
          medical_record_id: medical_record_id,
          patient_id: medicalRecord.patient_id,
        });
        prescriptionID = prescription.id;
      }
      await Promise.all(
        internal_prescriptions.map(async (prescription) => {
          return await db.PrescribedMedicine.create({
            prescription_id: prescriptionID,
            doctor_id: req.user.id,
            medicine_id: prescription.medicine_id,
            dosage: prescription.dosage,
            frequency: prescription.frequency,
            duration: prescription.duration,
            // notes: prescription.notes,
            is_internal: true,
            start_date: prescription.start_date,
          });
        })
      ).then(() => {
        return MedicalRecordHelper.add_MedicalRecord_medicineItem_to_Billing(
          medicalRecord.id,
          medicineItemIds
        );
      });

      console.log(medicineItemIds);
    }
    if (diagnoses.length > 0) {
      await Promise.all(
        diagnoses.map(async (diagnosis) => {
          return db.Diagnosis.create({
            medical_record_id: medical_record_id,
            diagnosis: diagnosis,
            doctor_id: req.user.id,
          });
        })
      );
    }

    const medicalRecordDetail = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: medical_record_id,
        doctor_id: req.user.id,
      },
    });
    if (medicalRecordDetail) {
      const physicalExamination = await db.PhysicalExamination.create({
        medicalRecordDetail_id: medical_record_id,
        examiner_id: req.user.id,
        progressNote_id: progressNote.id,
      });
      await Promise.all(
        physicalExaminations.map(async (Examination) => {
          return db.physicalExaminationResult.create({
            // medicalRecordDetail_id: medicalRecordDetail.id,
            physicalExamination_id: physicalExamination.id,
            physical_ExaminationField_id: Examination.physicalExaminationId,
            result: Examination.value,
            // examiner_id: req.user.id,
            // progressNote_id: progressNote.id
          });
        })
      );
    }
    if (vitals.length > 0) {
      const vital = await db.Vital.create({
        medicalRecord_id: medicalRecord.id,
        examiner_id: req.user.id,
        progrssNote_id: progressNote.id,
      });
      await Promise.all(
        vitals.map(async (v) => {
          return db.VitalResult.create({
            vital_id: vital.id,
            vitalSignField_id: v.vitalId,
            result: v.value,
            // progrssNote_id: req.user.id,
          });
        })
      );
    }

    res.status(201).json({
      msg: "Progress Note added successfully",
    });
  }),
  finishProgressNote: asyncHandler(async (req, res) => {
    const { medical_record_id } = req.params;

    const MedicaRecordID = parseInt(medical_record_id);
    const medicalRecord = await getMedicalRecordById(MedicaRecordID);
    if (!medicalRecord) {
      res.status(404);
      throw new Error("Medical record not found");
    }
    medicalRecord.status = false;
    await medicalRecord.save();
    await db.Patient.update(
      { patient_type: "outpatient" },
      {
        where: {
          id: medicalRecord.patient_id,
        },
      }
    );

    res.status(200).json({ msg: "Patient discharged successfully" });
  }),
};
