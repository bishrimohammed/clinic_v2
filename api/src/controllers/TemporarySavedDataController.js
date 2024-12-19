const asyncHandler = require("express-async-handler");
const db = require("../models");
module.exports = TemporarySavedDataController = {
  getSavedTemporaryProgressNote: asyncHandler(async (req, res) => {
    const { medical_record_id } = req.params;
    const progressNote = await db.Temporary_ProgressNote.findOne({
      where: {
        medical_record_id: medical_record_id,
        user_id: req.user.id,
      },
    });
    let responseData = {};
    if (progressNote) {
      const physicalExamination =
        await db.Temporary_PhysicalExamination.findOne({
          where: {
            medical_record_id: medical_record_id,
            user_id: req.user.id,
            progress_note_id: progressNote.id,
          },
        });
      const lab = await db.Temporary_LabInvestigationOrder.findOne({
        where: {
          medical_record_id: medical_record_id,
          user_id: req.user.id,
          progress_note_id: progressNote.id,
        },
      });
      const vital = await db.Temporary_VitalSign.findOne({
        where: {
          medical_record_id: medical_record_id,
          user_id: req.user.id,
          progress_note_id: progressNote.id,
        },
      });
      const prescription = await db.Temporary_Prescription.findOne({
        where: {
          medical_record_id: medical_record_id,
          user_id: req.user.id,
          progress_note_id: progressNote.id,
        },
      });
      const diagnoses = await db.Temporary_Diagnosis.findOne({
        where: {
          medical_record_id: medical_record_id,
          user_id: req.user.id,
          progress_note_id: progressNote.id,
        },
      });
      responseData = {
        physicalExamination: physicalExamination,
        lab: lab,
        vital: vital,
        prescription: prescription,
        diagnoses: diagnoses,
        progressNote,
      };
    } else {
      responseData = null;
    }
    res.json(responseData);
  }),
  saveTemporaryProgressNoteData: asyncHandler(async (req, res) => {
    // console.log("fhvkjh");
    const { medical_record_id } = req.params;
    const {
      problemList,
      currentmanagement,
      plan,
      physicalExaminations,
      vitals,
      diagnoses,
      internal_prescriptions,
      selectedLabs,
      indirectlySelectedLabs,
    } = req.body;
    console.log(medical_record_id);
    const SavedForLateprogressNote = await db.Temporary_ProgressNote.findOne({
      where: {
        medical_record_id: medical_record_id,
        user_id: req.user.id,
      },
    });
    console.log(SavedForLateprogressNote);
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
    // console.log(SavedForLateprogressNote);
    // return;
    const progressNote = await db.Temporary_ProgressNote.create({
      medical_record_id: medical_record_id,
      problem_list: problemList,
      current_management: currentmanagement,
      plan: plan,
      user_id: req.user.id,
    });
    // indirectlySelectedLabs selectedLabs
    const lab = {
      selectedLabs,
      indirectlySelectedLabs,
    };
    await db.Temporary_LabInvestigationOrder.create({
      medical_record_id: medical_record_id,
      user_id: req.user.id,
      progress_note_id: progressNote.id,
      data: lab,
    });
    await db.Temporary_PhysicalExamination.create({
      medical_record_id: medical_record_id,
      progress_note_id: progressNote.id,
      data: physicalExaminations,
      user_id: req.user.id,
    });
    await db.Temporary_Diagnosis.create({
      medical_record_id: medical_record_id,
      progress_note_id: progressNote.id,
      data: diagnoses,
      user_id: req.user.id,
    });
    await db.Temporary_VitalSign.create({
      medical_record_id: medical_record_id,
      progress_note_id: progressNote.id,
      data: vitals,
      user_id: req.user.id,
    });
    await db.Temporary_Prescription.create({
      medical_record_id: medical_record_id,
      data: internal_prescriptions,
      progress_note_id: progressNote.id,
      user_id: req.user.id,
    });
    // res.status(201).json(progressNote);
    console.log(req.body);
  }),
  saveTemporaryConsultationData: asyncHandler(async (req, res) => {
    const { medical_record_id } = req.params;
    const { symptoms, examination, plan } = req.body;
    console.log(req.body);
    res.json({ msg: "jhdvbjwgv" });
  }),
};
