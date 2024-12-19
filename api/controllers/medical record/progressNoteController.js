const asyncHandler = require("express-async-handler");
// const { getMedicalRecordById } = require("./MedicalRecordController");
const {
  getMedicalRecordPrescription,
} = require("./helper/getMedicalRecordPrescription");
const db = require("../../models");
// const MedicalRecordHelper = require("./helper/MedicalRecordHelper");
const { getMedicalRecordById } = require("./helper/getMedicalRecordById");
const {
  add_MedicalRecord_medicineItem_to_Billing,
} = require("./helper/MedicalRecordHelper");
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
  getProgressNoteDetail: asyncHandler(async (req, res) => {
    const { progressNoteId } = req.params;
    const progessNote = await db.ProgressNote.findOne({
      where: {
        id: progressNoteId,
      },
    });

    res.status(200).json(progessNote);
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
    const investigationsParsed = investigations
      ? JSON.parse(investigations)
      : null;
    const underPanelsParsed = underPanels ? JSON.parse(underPanels) : null;
    const internal_prescriptionsParsed = internal_prescriptions
      ? JSON.parse(internal_prescriptions)
      : null;
    const physicalExaminationsParsed = physicalExaminations
      ? JSON.parse(physicalExaminations)
      : null;
    const vitalsParsed = vitals ? JSON.parse(vitals) : null;
    const diagnosesParsed = diagnoses ? JSON.parse(diagnoses) : null;
    console.log(req.file);
    // return;
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
    // store medical documenet
    if (req.file) {
      await db.MedicalRecordDocument.create({
        medical_record_id: medicalRecord.id,
        document_name: "Lab Report",
        document_url: "uploads/" + req.file.filename,
        created_by: req.user.id,
      });
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
    if (investigationsParsed?.length > 0) {
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
        const newInvestigation = await db.InvestigationOrder.create(
          {
            medicalRecord_id: medicalRecord.id,
          },
          {
            userId: req.user.id,
          }
        );
        if (!newInvestigation) {
          res.status(500);
          throw new Error("unable to createInvestigation");
        }
        investiagtionId = newInvestigation.id;
      }
      await Promise.all(
        investigationsParsed?.map(async (test) => {
          return db.OrderedTest.create(
            {
              serviceItem_id: test,
              investigationOrder_id: investiagtionId,
              requested_by: req.user.id,
              reported_by: null,
              comment: "",
              result: "",
            },
            {
              userId: req.user.id,
            }
          );
        })
      );
      add_MedicalRecord_medicineItem_to_Billing(
        medicalRecord.id,
        investigationsParsed,
        "lab",
        req.user.id
      );
      if (underPanelsParsed?.length > 0) {
        await Promise.all(
          underPanels.map((test) => {
            return db.OrderedTest.create(
              {
                serviceItem_id: test,
                investigationOrder_id: investiagtionId,
                requested_by: req.user.id,
                reported_by: null,
                comment: "",
                result: "",
                is_underpanel: true,
              },
              {
                userId: req.user.id,
              }
            );
          })
        );
      }
      is_Invetigated.status = true;
      await is_Invetigated.save({ userId: req.user.id });
    }

    // console.log(prescriptionExist);

    if (internal_prescriptionsParsed?.length > 0) {
      const medicineItemIds = internal_prescriptionsParsed.map((medicine) => {
        return parseInt(medicine.medicine_id);
      });
      let prescriptionID;
      if (prescriptionExist) {
        prescriptionID = prescriptionExist.id;
      } else {
        const prescription = await db.Prescription.create(
          {
            medical_record_id: medical_record_id,
            patient_id: medicalRecord.patient_id,
          },
          {
            userId: req.user.id,
          }
        );
        prescriptionID = prescription.id;
      }
      await Promise.all(
        internal_prescriptions.map(async (prescription) => {
          return await db.PrescribedMedicine.create(
            {
              prescription_id: prescriptionID,
              doctor_id: req.user.id,
              medicine_id: prescription.medicine_id,
              dosage: prescription.dosage,
              frequency: prescription.frequency,
              duration: prescription.duration,
              // notes: prescription.notes,
              is_internal: true,
              start_date: prescription.start_date,
            },
            {
              userId: req.user.id,
            }
          );
        })
      ).then(() => {
        return add_MedicalRecord_medicineItem_to_Billing(
          medicalRecord.id,
          medicineItemIds,
          "medication",
          req.user.id
        );
      });

      // console.log(medicineItemIds);
    }
    if (diagnosesParsed?.length > 0) {
      await Promise.all(
        diagnosesParsed.map(async (diagnosis) => {
          return db.Diagnosis.create(
            {
              medical_record_id: medical_record_id,
              diagnosis: diagnosis,
              doctor_id: req.user.id,
            },
            { userId: req.user.id }
          );
        })
      );
    }

    const medicalRecordDetail = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: medical_record_id,
        doctor_id: req.user.id,
      },
    });
    if (medicalRecordDetail && physicalExaminationsParsed) {
      const physicalExamination = await db.PhysicalExamination.create(
        {
          medicalRecordDetail_id: medicalRecordDetail.id,
          examiner_id: req.user.id,
          progressNote_id: progressNote.id,
        },
        {
          userId: req.user.id,
        }
      );
      await Promise.all(
        physicalExaminationsParsed.map(async (Examination) => {
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
    if (vitalsParsed?.length > 0) {
      const vital = await db.Vital.create(
        {
          medicalRecord_id: medicalRecord.id,
          examiner_id: req.user.id,
          progressNote_id: progressNote.id,
        },
        {
          userId: req.user.id,
        }
      );
      await Promise.all(
        vitalsParsed.map(async (v) => {
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
    // const MedicaRecordID = parseInt(medical_record_id);
    const medicalRecord = await getMedicalRecordById(medical_record_id);
    if (!medicalRecord) {
      res.status(404);
      throw new Error("Medical record not found");
    }
    // console.log(medicalRecord);
    const medicalBilling = await db.MedicalBilling.findOne({
      where: {
        medical_record_id: medicalRecord.id,
      },
    });
    const unpaidPayments = await db.Payment.findOne({
      where: {
        medical_billing_id: medicalBilling.id,
        status: "Unpaid",
      },
    });
    if (unpaidPayments) {
      res.status(400);
      throw new Error("This History has unpaid billing");
    }
    const labInvestigation = await db.InvestigationOrder.findOne({
      where: { medicalRecord_id: medicalRecord.id },
    });
    // console.log(labInvestigation);
    const uncompletedLabTest = await db.OrderedTest.findOne({
      where: {
        result: "",
        investigationOrder_id: labInvestigation?.id,
        reported_by: null,
      },
    });
    // console.log(uncompletedLabTest);
    if (uncompletedLabTest) {
      res.status(400);
      throw new Error(
        "This Medical Record has  has uncompleted lab investigation tests"
      );
    }
    // res.status(200).json({ msg: "Completed" });
    await db.PatientAssignment.update(
      {
        discharge_summary: req.body.discharge_summary,
        discharge_date: new Date(),
        discharged_by: req.user.id,
        stage: "Done",
        status: false,
      },
      {
        where: {
          medicalRecord_id: medicalRecord.id,
        },
        userId: req.user.id,
      }
    );

    medicalRecord.status = false;
    // medicalRecord.sta
    await medicalRecord.save({ userId: req.user.id });
    medicalBilling.status = false;
    await medicalBilling.save({ userId: req.user.id });
    await db.Patient.update(
      { patient_type: "outpatient" },
      {
        where: {
          id: medicalRecord.patient_id,
        },
        userId: req.user.id,
      }
    );

    res.status(200).json({ msg: "Patient discharged successfully" });
  }),
};
