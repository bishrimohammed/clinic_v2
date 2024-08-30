const db = require("../../models");
const asyncHandler = require("express-async-handler");
const { getMedicalRecordById } = require("./helper/getMedicalRecordById");
const {
  getMedicalRecordPrescription,
} = require("./helper/getMedicalRecordPrescription");
const {
  add_MedicalRecord_medicineItem_to_Billing,
} = require("./helper/MedicalRecordHelper");
// const { where } = require("sequelize");

module.exports = MedicalRecordController = {
  // @desc    Get all MedicalRecord
  // @route   GET /api/medicalRecords
  // @access  Public
  getMedicalRecords: asyncHandler(async (req, res) => {
    const medicalRecords = await db.MedicalRecord.findAll({
      include: [
        {
          model: db.Patient,
          as: "patient",
          attributes: [
            "id",
            "firstName",
            "middleName",
            "lastName",
            "birth_date",
            "gender",
            "card_number",
          ],
        },
      ],
    });
    res.json(medicalRecords);
  }),
  getMedicalRecordsOverview: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    let sortDirection;
    // console.log(where);
    switch (req.query?.sortBy) {
      case "patient_name":
        if (req.query?.order === "asc") {
          sortDirection = [
            ["patient", "firstName", "ASC"],
            ["patient", "lastName", "ASC"],
            ["patient", "middleName", "ASC"],
          ];
        } else {
          sortDirection = [
            ["patient", "firstName", "DESC"],
            ["patient", "lastName", "DESC"],
            ["patient", "middleName", "DESC"],
          ];
        }
        break;
      case "visit_date":
        if (req.query?.order === "asc") {
          sortDirection = [["visit", "assignment_date", "ASC"]];
        } else {
          sortDirection = [["visit", "assignment_date", "DESC"]];
        }
        break;
      case "patientId":
        if (req.query?.order === "asc") {
          sortDirection = [["patient", "card_number", "ASC"]];
        } else {
          sortDirection = [["patient", "card_number", "DESC"]];
        }
        break;
      // case "registation_date":
      //   if (req.query?.order === "asc") {
      //     sortDirection = [["createdAt", "ASC"]];
      //   } else {
      //     sortDirection = [["createdAt", "DESC"]];
      //   }
      //   break;
      default:
        sortDirection = [["createdAt", "DESC"]];
    }
    const { count, rows } = await db.MedicalRecord.findAndCountAll({
      where: { status: true },
      include: [
        {
          model: db.Patient,
          as: "patient",
          attributes: [
            "id",
            "firstName",
            "middleName",
            "lastName",
            // "birth_date",
            "gender",
            "card_number",
            "phone",
          ],
        },
        {
          model: db.PatientAssignment,
          as: "visit",
          attributes: ["assignment_date"],
        },
      ],
      order: sortDirection,
      offset: (page - 1) * limit,
      limit: limit,
    });
    console.log(req.query);
    const hasMore = count > page * limit;
    // console.log(patients);
    res.status(200).json({
      visits: rows,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      hasMore: hasMore,
    });
  }),
  getMedicalRecordsOverviewDetail: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const medicalRecords = await db.MedicalRecord.findAll({
      where: { status: true, id: id },
      include: [
        {
          model: db.Patient,
          as: "patient",
          attributes: [
            "id",
            "firstName",
            "middleName",
            "lastName",
            "birth_date",
            "gender",
            "card_number",
            "phone",
          ],
        },
      ],
    });
    res.json(medicalRecords);
  }),
  // @desc    Get a single MedicalRecord by ID
  // @route   GET /api/medicalRecords/:id
  // @access  Public
  getMedicalRecordById: asyncHandler(async (req, res) => {
    const medicalRecord = await db.MedicalRecord.findByPk(req.params.id, {
      include: [
        {
          model: db.Patient,
          as: "patient",
          attributes: [
            "id",
            "firstName",
            "middleName",
            "lastName",
            "birth_date",
            "gender",
            "card_number",
          ],
        },
      ],
    });
    if (medicalRecord) {
      res.json(medicalRecord);
    } else {
      res.status(404);
      throw new Error("MedicalRecord not found");
    }
  }),
  // @desc    Create a MedicalRecord
  // @route   POST /api/medicalRecords
  // @access  Private
  getMedicalRecordDetailById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(req.user);
    const medicalRecordDetail = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: id,
        doctor_id: req.user.id,
      },
      include: ["physicalExamination"],
    });
    const vitals = await db.Vital.findAll({
      where: {
        medicalRecord_id: id,
      },
    });

    // console.log(vitals[vitals.length - 1]);
    // if (!medicalRecordDetail) {
    //   res.status(404);
    //   throw new Error("MedicalRecordDetail not found");
    // }
    const vital = vitals[vitals.length - 1];
    const resData = medicalRecordDetail
      ? { ...medicalRecordDetail?.dataValues, vital }
      : null;
    // console.log(dd);

    res.status(200).json(resData);
  }),
  createMedicationRecordDetail: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
      physicalExamination,
      plan,
      assesement,
      chiefcomplaint,
      HPI,
      vital,
    } = req.body;
    console.log(req.body);
    // first find if medical record detail is already present if present update existing record detail if not present create
    const medicalRecordDetailExist = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: id,
        doctor_id: req.user.id,
      },
    });
    if (medicalRecordDetailExist) {
      await medicalRecordDetailExist.update({
        plan,
        assassement: assesement,
        chief_complaint: chiefcomplaint,
        hpi: HPI,
        doctor_id: req.user.id,
      });
      // update PhysicalExamination
      await db.PhysicalExamination.update(
        {
          general_appreance: physicalExamination.general_appreance,
          respiratory: physicalExamination.respiratory,
          neurological: physicalExamination.neurological,
          musculoskeletal: physicalExamination.musculoskeletal,
          cardiovascular: physicalExamination.cardiovascular,
          abdominal: physicalExamination.abdominal,
          heent: physicalExamination.HEENT,
          examiner_id: req.user.id,
        },
        {
          where: {
            medicalRecordDetail_id: medicalRecordDetailExist.id,
          },
        }
      );
    } else {
      const newMedicalRecordDetail = await db.MedicalRecordDetail.create({
        medicalRecord_id: id,
        plan,
        assassement: assesement,
        chief_complaint: chiefcomplaint,
        hpi: HPI,
        doctor_id: req.user.id,
      });
      db.PhysicalExamination.create({
        medicalRecordDetail_id: newMedicalRecordDetail.id,
        general_appreance: physicalExamination.general_appreance,
        respiratory: physicalExamination.respiratory,
        neurological: physicalExamination.neurological,
        musculoskeletal: physicalExamination.musculoskeletal,
        cardiovascular: physicalExamination.cardiovascular,
        abdominal: physicalExamination.abdominal,
        heent: physicalExamination.HEENT,
        examiner_id: req.user.id,
      });
      await db.Vital.create({
        medicalRecord_id: id,
        systolic_blood_pressure: vital.systolic_blood_pressure,
        diastolic_blood_pressure: vital.diastolic_blood_pressure,
        pulse_rate: vital.pulse_rate,
        temperature: vital.temperature,
        weight: vital.weight,
        height: vital.height,
        SPO2: vital.SPO2,
        respiration_rate: vital.respiration_rate,
        examiner_id: req.user.id,
      });
    }
    // const addesVital = await db.Vital.create({
    //   medicalRecord_id: id,
    //   systolic_blood_pressure: vital.systolic_blood_pressure,
    //   diastolic_blood_pressure: vital.diastolic_blood_pressure,
    //   pulse_rate: vital.pulse_rate,
    //   temperature: vital.temperature,
    //   weight: vital.weight,
    //   height: vital.height,
    //   SPO2: vital.SPO2,
    //   respiration_rate: vital.respiration_rate,
    //   examiner_id: req.user.id,
    // });
    res.status(201).json(medicalRecordDetailExist);
  }),
  add_ChiefComplaint: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { chief_complaint, HPI, note } = req.body;
    // console.log(req.body);
    const medicalRecord = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: id,
        doctor_id: req.user.id,
      },
    });
    // console.log(medicalRecord);
    if (medicalRecord) {
      await medicalRecord.update(
        {
          // chief_complaint: medicalRecord.chief_complaint + ", " + chief_complaint,
          // hpi: medicalRecord.hpi + " \n" + HPI,
          // note: note,
          chief_complaint: chief_complaint,
          hpi: HPI,
          notes: note,
        },
        { userId: req.user.id }
      );
      res.status(200).json({ message: "Chief Complaint updated successfully" });
    } else {
      const newMedicalRecordDetail = await db.MedicalRecordDetail.create(
        {
          medicalRecord_id: id,

          chief_complaint: chief_complaint,
          hpi: HPI,
          doctor_id: req.user.id,
          notes: note,
        },
        { userId: req.user.id }
      );
      if (!newMedicalRecordDetail) {
        res.status(404);
        throw new Error("Chief Complaint not added");
      }
      res.status(200).json({ message: "Chief Complaint added successfully" });
    }
  }),
  get_ChiefComplaint: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const medicalRecord = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: id,
        doctor_id: req.user.id,
      },
    });
    res.status(200).json(medicalRecord);
  }),
  addPlan: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { plan, sickNote, RefferalNote } = req.body;
    // console.log(req.body);
    // res.status(400);
    // return;
    const medicalRecordDetail = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: id,
        doctor_id: req.user.id,
      },
    });
    if (!medicalRecordDetail) {
      res.status(404);
      throw new Error("Medical Record Detail not found");
    }
    medicalRecordDetail.plan = plan;
    await medicalRecordDetail.save({ userId: req.user.id });
    const medicalRecord = await db.MedicalRecord.findByPk(req.params.id);
    if (sickNote) {
      // let sickNoteId;

      await Promise.all(
        sickNote.map(async (sicknote) => {
          const SN = await db.SickLeaveNote.create({
            medical_record_id: medicalRecord.id,
            patient_id: medicalRecord.patient_id,
            doctor_id: req.user.id,
            date: Date.now(),
            sick_leave_day: sicknote.sick_leave_day,

            // start_date: sicknote.start_date,
            // end_date: sicknote.end_date,
            date_of_examination: medicalRecord.createdAt,
          });

          await Promise.all(
            sicknote.diagnosis.map(async (diagnosticId) => {
              return db.DiagnosisSickLeave.create({
                sick_leave_note_id: SN.id,
                diagnosis_id: diagnosticId,
              });
            })
          );
        })
      );
      //   const SickNOTE = await db.SickLeaveNote.create({
      //     medical_record_id: medicalRecord.id,
      //     patient_id: medicalRecord.patient_id,
      //     doctor_id: req.user.id,
      //     date: Date.now(),
      //     start_date: sickNote.start_date,
      //     end_date: sickNote.end_date,
      //     date_of_examination: medicalRecord.createdAt,
      //     // note: sickNote,
      //     // examiner_id: req.user.id,
      //   });
      //   sickNoteId = SickNOTE.id;
      // }
      // await db.Diagnosis.update(
      //   {
      //     sick_leave_note_id: null,
      //   },
      //   {
      //     where: {
      //       medical_record_id: medicalRecord.id,
      //     },
      //   }
      // );
      // await Promise.all(
      //   sickNote.diagnosis?.map((id) => {
      //     return db.Diagnosis.update(
      //       {
      //         sick_leave_note_id: sickNoteId,
      //       },
      //       { where: { id: id } }
      //     );
      //   })
      // );
    }
    if (RefferalNote) {
      await Promise.all(
        RefferalNote.map((referralNotes) => {
          return db.ReferralNote.create({
            medical_record_id: medicalRecord.id,
            patient_id: medicalRecord.patient_id,
            doctor_id: req.user.id,
            referral_date: Date.now(),
            reason_for_referral: referralNotes.reason,
            referral_to: referralNotes.hospital_name,
            department: referralNotes.department_name,
            clinical_finding: referralNotes.clinical_finding,
          });
        })
      );
    }
    res.json({ message: "Plan added successfully" });
  }),
  getSickNote: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const medicalRecord = await db.MedicalRecord.findByPk(id);

    if (!medicalRecord) {
      res.status(404);
      throw new Error("Medical Record not found");
    }
    const sickLeaveNotes = await db.SickLeaveNote.findAll({
      where: { medical_record_id: id },
      include: [
        {
          model: db.User,
          as: "doctor",
          include: [
            {
              model: db.Employee,
              as: "employee",
              attributes: [
                "id",
                "firstName",
                "middleName",
                "lastName",
                "digital_signature",
                "doctor_titer",
              ],
            },
          ],
          attributes: ["id"],
        },
        {
          model: db.Patient,
          as: "patient",
          attributes: [
            "id",
            "firstName",
            "middleName",
            "lastName",
            "card_number",
            "gender",
            "birth_date",
          ],
        },
        {
          model: db.Diagnosis,

          through: {
            model: db.DiagnosisSickLeave,
          },
          as: "diagnoses",
        },
      ],
    });
    res.json(sickLeaveNotes);
  }),
  getRefferalNote: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const medicalRecord = await db.MedicalRecord.findByPk(id);
    if (!medicalRecord) {
      res.status(404);
      throw new Error("Medical Record not found");
    }
    const ReferralNote = await db.ReferralNote.findAll({
      where: { medical_record_id: id },
      include: [
        {
          model: db.User,
          as: "doctor",
          include: [
            {
              model: db.Employee,
              as: "employee",
              attributes: [
                "id",
                "firstName",
                "middleName",
                "lastName",
                "digital_signature",
                "doctor_titer",
              ],
            },
          ],
          attributes: ["id"],
        },
        {
          model: db.Patient,
          as: "patient",
          attributes: [
            "id",
            "firstName",
            "middleName",
            "lastName",
            "card_number",
            "gender",
            "birth_date",
          ],
        },
      ],
    });
    res.json(ReferralNote);
  }),
  get_physical_examination: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const medicalRecord = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: id,
        doctor_id: req.user.id,
      },
    });
    if (!medicalRecord) {
      res.status(404);
      throw new Error("Medical Record Detail not found");
    }
    // console.log(medicalRecord);
    const physicalExamination = await db.PhysicalExamination.findAll({
      where: {
        medicalRecordDetail_id: medicalRecord?.id,
        examiner_id: req.user.id,
      },
      include: [
        {
          model: db.physicalExaminationResult,
          as: "physicalExaminationResults",
        },
        {
          model: db.User,
          as: "examiner",
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
    });
    // console.log(physicalExamination);
    // const vital = await db.Vital.findAll({
    //   where: {
    //     medicalRecord_id: id,
    //     examiner_id: req.user.id,
    //   },
    //   include: [
    //     {
    //       model: db.VitalResult,
    //       as: "vitalResults",
    //       // include: [
    //       //   {
    //       //     model: db.VitalSignField,
    //       //     as: "vitalResultFields",
    //       //   },
    //       // ]
    //     },
    //     {
    //       model: db.User,
    //       as: "examiner",
    //       include: [
    //         {
    //           model: db.Employee,
    //           as: "employee",
    //           attributes: ["id", "firstName", "middleName", "lastName"],
    //         },
    //       ],
    //       attributes: ["id"],
    //     },
    //   ],
    // });
    res.status(200).json(
      physicalExamination
      // vital,
    );
  }),
  add_physical_examination: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
      physicalExaminations,

      indirectlySelectedLabs: underPanels,
      selectedLabs: investigations,
    } = req.body;
    console.log(req.body);
    // return;
    const medicalRecord = await db.MedicalRecord.findByPk(id);

    if (!medicalRecord) {
      res.status(404);
      throw new Error("MedicalRecord not found");
    }
    const medicalRecordDetail = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: id,
        doctor_id: req.user.id,
      },
    });
    if (physicalExaminations) {
      const physicalExamination = await db.PhysicalExamination.create(
        {
          medicalRecordDetail_id: medicalRecordDetail.id,
          examiner_id: req.user.id,
        },
        { userId: req.user.id }
      );

      await Promise.all(
        physicalExaminations.map(async (Examination) => {
          return db.physicalExaminationResult.create({
            // medicalRecordDetail_id: medicalRecordDetail.id,
            physicalExamination_id: physicalExamination.id,
            physical_ExaminationField_id: Examination.physicalExaminationId,
            result: Examination.value,
            physicalExamination_id: physicalExamination.id,
            // examiner_id: req.user.id,
            // progressNote_id: progressNote.id
          });
        })
      );
    }

    const is_Invetigated = await db.InvestigationOrder.findOne({
      where: {
        medicalRecord_id: id,
      },
    });
    let investiagtionId;
    if (is_Invetigated) {
      // is_Invetigated.clinical_finding =
      //   is_Invetigated.clinical_finding + "\n" + clinical_finding;
      is_Invetigated.status = true;
      await is_Invetigated.save({ hooks: false });
      investiagtionId = is_Invetigated.id;
    } else {
      const newInvestigation = await db.InvestigationOrder.create(
        {
          medicalRecord_id: id,
          // clinical_finding,
        },
        { userId: req.user.id }
      );
      if (!newInvestigation) {
        res.status(500);
        throw new Error("unable to createInvestigation");
      }
      investiagtionId = newInvestigation.id;
    }
    await Promise.all(
      investigations.map(async (test) => {
        return db.OrderedTest.create(
          {
            serviceItem_id: test,
            investigationOrder_id: investiagtionId,
            requested_by: req.user.id,
            reported_by: null,
            comment: "",
            result: "",
          },
          { userId: req.user.id }
        );
      })
    );

    await add_MedicalRecord_medicineItem_to_Billing(
      medicalRecord.id,
      investigations,
      "lab",
      req.user.id
    );

    if (underPanels?.length > 0) {
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
            { userId: req.user.id }
          );
        })
      );
    }
    //vitals
    // if (vital) {
    //   await Promise.all(
    //     vitals.map(async (vital) => {
    //       await db.Vital.update(
    //         {
    //           result: vital.value,
    //           // examiner_id: req.user.id,
    //         },
    //         {
    //           where: {
    //             vitalSignField_id: vital.vitalId,
    //             examiner_id: req.user.id,
    //             medicalRecord_id: id,
    //           },
    //         }
    //       );
    //     })
    //   );
    // } else {
    //   await Promise.all(
    //     vitals.map(async (vital) => {
    //       await db.Vital.create({
    //         medicalRecord_id: id,
    //         vitalSignField_id: vital.vitalId,
    //         result: vital.value,
    //         examiner_id: req.user.id,
    //       });
    //     })
    //   );
    // }

    // console.log(medicalRecordDetail);
    res.status(201).json({
      message:
        // physicalExamination
        //   ? "Physical Examination update successfully"        :
        "Physical Examination added successfully",
    });
  }),
  get_Diagnosis: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const diagnosis = await db.Diagnosis.findAll({
      where: {
        medical_record_id: parseInt(id),
        doctor_id: req.user.id,
      },
    });
    console.log("\n\n" + id + "\n\n");
    console.log("\n\n" + diagnosis.length + "\n\n");
    res.status(200).json(diagnosis);
  }),
  add_Diagnosis: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { diagnosis } = req.body;
    const medicalRecord = await db.MedicalRecord.findByPk(id);
    if (!medicalRecord) {
      res.status(404);
      throw new Error("MedicalRecord not found");
    }
    const Diagnosis = await db.Diagnosis.create(
      {
        medical_record_id: id,
        diagnosis,
        doctor_id: req.user.id,
      },
      { userId: req.user.id }
    );
    if (!Diagnosis) {
      res.status(404);
      throw new Error("Diagnosis not added");
    }
    res.status(201).json({ message: "Diagnosis added successfully" });
  }),
  confirm_Diagnosis: asyncHandler(async (req, res) => {
    const { diagnosis_id } = req.params;
    const Diagnosis = await db.Diagnosis.findByPk(diagnosis_id);
    if (!Diagnosis) {
      res.status(404);
      throw new Error("Diagnosis not found");
    }
    Diagnosis.update(
      {
        status: "Confirmed",
      },
      { userId: req.user.id }
    );
    res.status(200).json({ message: "Diagnosis confirmed successfully" });
  }),
  Ruled_out_Diagnosis: asyncHandler(async (req, res) => {
    const { diagnosis_id } = req.params;
    const Diagnosis = await db.Diagnosis.findByPk(diagnosis_id);
    if (!Diagnosis) {
      res.status(404);
      throw new Error("Diagnosis not found");
    }

    Diagnosis.update(
      {
        status: "Ruled out",
      },
      { userId: req.user.id }
    );
    res.status(200).json({ message: "Diagnosis ruled out successfully" });
  }),
  // @desc    add investigation test a MedicalRecord
  // @route   post /api/medicalRecords/:id/investigation
  // @access  Private
  addInvestigation: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { investigations, clinical_finding, underPanels, plan } = req.body;
    // console.log(req.body);
    // return;
    const medicalRecord = await db.MedicalRecord.findByPk(id);

    if (!medicalRecord) {
      res.status(404);
      throw new Error("MedicalRecord not found");
    }
    // console.log(medicalRecord);
    // console.log(req.body);
    // return;
    const is_Invetigated = await db.InvestigationOrder.findOne({
      where: {
        medicalRecord_id: id,
      },
    });
    let investiagtionId;
    if (is_Invetigated) {
      // is_Invetigated.clinical_finding =
      //   is_Invetigated.clinical_finding + "\n" + clinical_finding;
      is_Invetigated.status = true;
      await is_Invetigated.save();
      investiagtionId = is_Invetigated.id;
    } else {
      const newInvestigation = await db.InvestigationOrder.create({
        medicalRecord_id: id,
        clinical_finding,
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

    add_MedicalRecord_medicineItem_to_Billing(
      medicalRecord.id,
      investigations,
      "lab"
    );

    if (underPanels?.length > 0) {
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
    // if (is_Invetigated) {
    //   is_Invetigated.status = false;
    //   await is_Invetigated.save();
    // }

    // console.log(payments);
    res.status(201).json({ msg: "Lab investigation added successfully" });

    // const orderTests = await Promise.all(
    //   investigations.map(async (test) => {
    //     return db.OrderedTest.create({
    //       serviceItem_id: test,
    //       investigationOrder_id: investiagtionId,
    //       requested_by: req.user.id,
    //       reported_by: null,
    //       comment: "",
    //       result: "",
    //     });
    //   })
    // )
    //   .then(() => {
    //     return MedicalRecordHelper.add_MedicalRecord_medicineItem_to_Billing(
    //       medicalRecord.id,
    //       investigations
    //     );
    //   })
    //   .then(async (payments) => {
    //     if (underPanels.length > 0) {
    //       underPanels.map((test) => {
    //         return db.OrderedTest.create({
    //           serviceItem_id: test,
    //           investigationOrder_id: investiagtionId,
    //           requested_by: req.user.id,
    //           reported_by: null,
    //           comment: "",
    //           result: "",
    //         });
    //       });
    //     }

    //     console.log(payments);
    //     res.status(201).json({ msg: "Lab investigation added successfully" });
    //   });
    // res.status(200).json({ msg: "success" });
  }),
  // @desc    get investigation test ordered a MedicalRecord
  // @route   get /api/medicalRecords/:id/investigation
  // @access  Private
  getInvestigation: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const labcategory = await db.ClinicService.findOne({
      where: {
        is_laboratory: true,
      },
      include: ["serviceCategory"],
      attributes: ["id"],
    });
    const labcategory_ids = labcategory.serviceCategory.map((c) => c.id);
    console.log(labcategory_ids);
    const investigation = await db.InvestigationOrder.findOne({
      where: {
        medicalRecord_id: id,
      },

      // include: [
      //   {
      //     model: db.ServiceItem,
      //     as: "tests",
      //     //
      //     // include: [
      //     //   {
      //     //     model: db.ServiceCategory,
      //     //     as: "serviceCategory",
      //     //     include: [
      //     //       {
      //     //         model: db.ClinicService,
      //     //         as: "clinicService",
      //     //       },
      //     //     ],
      //     //   },
      //     // ],
      //   },
      //   // {
      //   //   model: db.OrderedTest,
      //   //   as: "requestedBy",
      //   // },
      // ],
    });
    // console.log(investigation);
    const orderedTest = await db.OrderedTest.findAll({
      where: {
        investigationOrder_id: investigation.id,
      },
      include: [
        {
          model: db.ServiceItem,
          as: "test",

          attributes: ["id", "service_name", "serviceCategory_id"],
          include: [
            {
              model: db.LabTestProfile,
              as: "labTestProfile",
            },
          ],
        },
        {
          model: db.User,
          as: "requestedBy",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["firstName", "lastName", "middleName"],
          },
          attributes: ["id"],
        },
        {
          model: db.User,
          as: "reportedBy",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["firstName", "lastName", "middleName"],
          },
          attributes: ["id"],
        },
      ],
    });

    res.json({ orderedTest, labcategoryIDS: labcategory_ids });
  }),
  // @desc    add investigation ordered result a MedicalRecord
  // @route
  addInvestigationResult: asyncHandler(async (req, res) => {
    const { labresults } = req.body;
    const { id: investigationOrder_id } = req.params;
    console.log(investigationOrder_id);
    // console.log(labresults);
    const ordersResult = await Promise.all(
      labresults.map(async (value) => {
        return db.OrderedTest.update(
          {
            reported_by: req.user.id,
            comment: value.comment,
            result: value.result,
            report_time: new Date(),
            status: "completed",
          },
          {
            where: {
              id: value.orderId,
              investigationOrder_id: investigationOrder_id,
            },
          }
        );
      })
    );
    const updatedOrdersCount = await db.OrderedTest.count({
      where: {
        investigationOrder_id,
        status: "completed",
      },
    });
    if (updatedOrdersCount === labresults.length) {
      await db.InvestigationOrder.update(
        {
          status: false,
        },
        {
          where: {
            id: investigationOrder_id,
          },
        }
      );
    }

    res.status(201).json(ordersResult);
  }),
  // @desc get active investigation ordered
  getActiveInvestigation: asyncHandler(async (req, res) => {
    const ActiveInvestigation = await db.InvestigationOrder.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: db.OrderedTest,
          as: "orderedTests",
          // attributes: ["id"],
          include: [
            {
              model: db.ServiceItem,
              as: "test",
            },
            {
              model: db.User,
              as: "requestedBy",
              attributes: ["firstName", "lastName"],
            },
            {
              model: db.User,
              as: "reportedBy",
              attributes: ["firstName", "lastName"],
            },
          ],
        },
        {
          model: db.MedicalRecord,
          as: "medicalRecord",
          attributes: ["id"],
          include: [
            {
              model: db.Patient,
              as: "patient",
              attributes: ["firstName", "lastName", "middleName"],
            },
          ],
        },
      ],
    });
    // console.log(ActiveInvestigation);
    res.json(ActiveInvestigation);
  }),
  getCompletedInvestigation: asyncHandler(async (req, res) => {
    const ActiveInvestigation = await db.InvestigationOrder.findAll({
      where: {
        status: false,
      },
      include: [
        {
          model: db.OrderedTest,
          as: "orderedTests",
          // attributes: ["id"],
          include: [
            {
              model: db.ServiceItem,
              as: "test",
            },
            {
              model: db.User,
              as: "requestedBy",
              attributes: ["firstName", "lastName"],
            },
            {
              model: db.User,
              as: "reportedBy",
              attributes: ["firstName", "lastName"],
            },
          ],
        },
        {
          model: db.MedicalRecord,
          as: "medicalRecord",
          attributes: ["id"],
          include: [
            {
              model: db.Patient,
              as: "patient",
              attributes: ["firstName", "lastName", "middleName"],
            },
          ],
        },
      ],
    });
    // console.log(ActiveInvestigation);
    res.json(ActiveInvestigation);
  }),
  // @desc get investigation ordered by medical record id
  getOrdered_Investigation_ByMedicalRecordId: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const investigation = await db.InvestigationOrder.findOne({
      where: {
        medicalRecord_id: id,
      },
      include: [
        {
          model: db.OrderedTest,
          as: "orderedTests",
        },
      ],
    });
    res.json(investigation);
  }),
  // @desc add vital sign
  addTriage: asyncHandler(async (req, res) => {
    const { vitals, symptom, visit } = req.body;
    // const today = new Date();
    // const vitals = req.body;
    console.log(req.body);
    // return;
    // console.log(vitals);
    const patientVisit = await db.PatientAssignment.findOne({
      where: {
        medicalRecord_id: req.params.id,
      },
    });
    // console.log(patientVisit);
    if (!patientVisit) {
      res.status(404);
      throw new Error("Patient assignment not found");
    }
    patientVisit.symptom_notes = patientVisit.symptom_notes
      ? patientVisit.symptom_notes + "\n" + symptom
      : symptom;
    patientVisit.stage = "Waiting for doctor";
    patientVisit.visit_type = visit.visit_type;
    patientVisit.assignment_date = visit.date;
    patientVisit.visit_time = new Date(visit.date)

      .toISOString()
      .substring(11.16);
    patientVisit.doctor_id = visit.doctor_id;
    await patientVisit.save({ userId: req.user.id });

    const vital = await db.Vital.create(
      {
        medicalRecord_id: patientVisit.medicalRecord_id,
        examiner_id: req.user.id,
        // progrssNote_id: progressNote.id,
      },
      { userId: req.user.id }
    );
    // const VitalSigns = vitals.map((v) => {
    //   return db.VitalResult.create({
    //     vital_id: vital.id,
    //     vitalSignField_id: v.vitalId,
    //     result: v.value,
    //     // progrssNote_id: req.user.id,
    //   });
    // });
    // console.log(vi);
    await Promise.all(
      vitals.map(async (v) => {
        return db.VitalResult.create({
          vital_id: vital.id,
          vitalSignField_id: v.vitalSignField_id,
          result: v.result,
          // progrssNote_id: req.user.id,
        });
      })
    );
    // console.log(VitalSigns);
    // return;
    // const newVitalSigns = await db.Vital.bulkCreate(VitalSigns);
    res.status(201).json({ msg: "Vital Signatures added successfully" });
  }),
  addVitalSign: asyncHandler(async (req, res) => {
    const { vitals, vital_takenAt } = req.body;
    console.log(req.body);
    const medicalRecord = await db.MedicalRecord.findByPk(req.params.id);
    if (!medicalRecord) {
      res.status(404);
      throw new Error("Medical record not found");
    }
    const vital = await db.Vital.create(
      {
        medicalRecord_id: medicalRecord.id,
        examiner_id: req.user.id,
        taken_date: vital_takenAt ? new Date(vital_takenAt) : Date.now(),
        // progrssNote_id: progressNote.id,
      },
      { userId: req.user.id }
    );

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
    // console.log(VitalSigns);
    // return;
    // const newVitalSigns = await db.Vital.bulkCreate(VitalSigns);
    res.status(201).json({ msg: "Vital Signatures added successfully" });
  }),
  getVitalSign: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const vital = await db.Vital.findAll({
      where: {
        medicalRecord_id: parseInt(id),
      },
      include: [
        {
          model: db.VitalResult,
          as: "vitalResults",
          include: [
            {
              model: db.VitalSignField,
              as: "vitalSignField",
            },
          ],
        },
        {
          model: db.User,
          as: "examiner",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["firstName", "lastName", "middleName"],
          },
          attributes: ["id"],
        },
      ],
    });
    // const medicalRecord = await db.MedicalRecord.findByPk(id, {
    //   include: ["vitals"],
    // });
    // const vital = await db.Vital.findByPk(70);
    res.json(vital);
  }),
  // @desc add prescriptions
  addPrescription: asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(req.body);
    // return;
    const prescription = req.body;
    const medicalRecord = await getMedicalRecordById(id);
    const prescriptionExist = await getMedicalRecordPrescription(id);
    // console.log(prescriptionExist);
    if (!medicalRecord) {
      res.status(404);
      throw new Error("Medical record not found");
    }
    let prescriptionID;
    if (!prescriptionExist) {
      // console.log("\nPrescription\n");
      const prescription = await db.Prescription.create(
        {
          medical_record_id: id,
          patient_id: medicalRecord.patient_id,
        },
        { userId: req.user.id }
      );
      prescriptionID = prescription.id;
    } else {
      // console.log("\n\nheloo\n\n");
      prescriptionID = prescriptionExist.id;
    }
    const medicineItemIds = prescription.map(
      (medicine) => medicine.medicine_id
    );
    // console.log(medicineItemIds);
    // return;
    await Promise.all(
      req.body.map(async (prescription) => {
        await db.PrescribedMedicine.create(
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
            route: prescription.route,
            when: prescription.when,
          },
          { userId: req.user.id }
        );
      })
    )
      .then(() => {
        add_MedicalRecord_medicineItem_to_Billing(
          medicalRecord.id,
          medicineItemIds,
          "prescription",
          req.user.id
        );
      })
      .then((payments) => {
        console.log(payments);
        res.status(201).json({ msg: "Prescription added successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong" });
      });
    // const medicineItemIds = prescription.map(medicine=> medicine.medicine_id)
    // console.log(medicineItemIds);
    // const prescriptions = req.body.map((p) => {
  }),
  getMedicalRecord_Internal_Prescription: asyncHandler(async (req, res) => {
    const prescription = await db.Prescription.findOne({
      where: {
        medical_record_id: req.params.id,
      },
    });
    if (!prescription) {
      res.status(404);

      throw new Error("Medical record not found");
    }
    const prescribed_medicines = await db.PrescribedMedicine.findAll({
      where: {
        prescription_id: prescription.id,
        is_internal: true,
      },
      include: [
        {
          model: db.ServiceItem,
          as: "medicine",
          attributes: ["id", "service_name"],
        },
        {
          model: db.User,
          as: "doctor",
          include: [
            {
              model: db.Employee,
              as: "employee",
              attributes: [
                "id",
                "firstName",
                "middleName",
                "lastName",
                "digital_signature",
                "doctor_titer",
              ],
            },
          ],
          attributes: ["id"],
        },
      ],
    });
    res.json(prescribed_medicines);
  }),
  get_External_MedicalRecord_Prescription: asyncHandler(async (req, res) => {
    const prescription = await db.Prescription.findOne({
      where: {
        medical_record_id: req.params.id,
      },
    });
    if (!prescription) {
      res.status(404);
      throw new Error("Medical record not found");
    }
    const prescribed_medicines = await db.PrescribedMedicine.findAll({
      where: {
        prescription_id: prescription?.id,
        is_internal: false,
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
    });
    res.json(prescribed_medicines);
  }),
  add_External_MedicalRecord_Prescription: asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(req.body);
    const medicalRecord = await getMedicalRecordById(id);
    const prescriptionExist = await getMedicalRecordPrescription(id);
    // console.log(prescriptionExist);
    if (!medicalRecord) {
      res.status(404);
      throw new Error("Medical record not found");
    }
    let prescriptionID;
    if (!prescriptionExist) {
      // console.log("\nPrescription\n");
      const prescription = await db.Prescription.create(
        {
          medical_record_id: id,
          patient_id: medicalRecord.patient_id,
        },
        { userId: req.user.id }
      );
      prescriptionID = prescription.id;
    } else {
      // console.log("\n\nheloo\n\n");
      prescriptionID = prescriptionExist.id;
    }

    await Promise.all(
      req.body.map(async (prescription) => {
        return await db.PrescribedMedicine.create(
          {
            prescription_id: prescriptionID,
            doctor_id: req.user.id,
            // medicine_id: prescription.medicine_id,
            dosage: prescription.dosage,
            frequency: prescription.frequency,
            drug_name: prescription.drug_name,
            duration: prescription.duration,
            // notes: prescription.notes,
            is_internal: false,
            start_date: prescription.start_date,
            route: prescription.route,
            when: prescription.when,
          },
          { userId: req.user.id }
        );
      })
    )
      .then((prescription) => {
        console.log(prescription);
        res.status(201).json({ msg: "Prescription added successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong" });
      });
  }),
  addSickLeaveNote: asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const { diagnosis } = req.body;
    const medicalRecord = await getMedicalRecordById(id);
    if (!medicalRecord) {
      res.status(404);
      throw new Error("Medical record not found");
    }
    const sickLeaveNote = await db.SickLeaveNote.create({
      medical_record_id: id,
      doctor_id: req.user.id,
      // note: req.body.note,
      patient_id: medicalRecord.patient_id,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      date: Date.now(),
      date_of_examination: medicalRecord.createdAt,
    });
    await Promise.all(
      diagnosis.map(async (id) => {
        return await db.Diagnosis.update(
          {
            sick_leave_note_id: sickLeaveNote.id,
          },
          {
            where: id,
          }
        );
      })
    );
    res.status(201).json({ msg: "Sick leave note added successfully" });
  }),
  cancelMedicalRecord: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const medicalRecord = await getMedicalRecordById(id);
    if (!medicalRecord) {
      res.status(404);
      throw new Error("Medical record not found");
    }
    await db.CurrentMedication.destroy({
      where: {
        medical_record_id: medicalRecord.id,
        created_by: req.user.id,
      },
      userId: req.user.id,
    });
    await db.DiscontinuedMedication.destroy({
      where: {
        medical_record_id: medicalRecord.id,
        created_by: req.user.id,
      },
      userId: req.user.id,
    });
    await db.Vital.destroy({
      where: {
        medicalRecord_id: medicalRecord.id,
        examiner_id: req.user.id,
      },
      userId: req.user.id,
    });
    const medicalRecordDetail = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: medicalRecord?.id,
        doctor_id: req.user.id,
      },
    });
    if (medicalRecordDetail) {
      await db.PhysicalExamination.destroy({
        where: {
          medicalRecordDetail_id: medicalRecordDetail?.id,
          examiner_id: req.user.id,
        },
        userId: req.user.id,
      });
    }

    await db.Diagnosis.destroy({
      where: {
        medical_record_id: medicalRecord.id,
        doctor_id: req.user.id,
      },
      userId: req.user.id,
    });
    const InvestigationOrder = await db.InvestigationOrder.findOne({
      where: {
        medicalRecord_id: medicalRecord.id,
      },
    });
    if (InvestigationOrder) {
      await db.OrderedTest.destroy({
        where: {
          investigationOrder_id: InvestigationOrder?.id,
          requested_by: req.user.id,
        },
        userId: req.user.id,
      });
      await InvestigationOrder.destroy({ userId: req.user.id });
    }

    const prescription = await db.Prescription.findOne({
      where: {
        medical_record_id: medicalRecord.id,
      },
    });
    if (prescription) {
      await db.PrescribedMedicine.destroy(
        {
          where: {
            prescription_id: prescription?.id,
            doctor_id: req.user.id,
          },
        },
        { userId: req.user.id }
      );
    }

    await medicalRecordDetail?.destroy({ userId: req.user.id });
    res.status(200).json({ msg: "Medical record cancelled successfully" });
  }),
  finishConsultation: asyncHandler(async (req, res) => {
    const { medicalRecordId } = req.params;
    const medicalRecord = await getMedicalRecordById(medicalRecordId);
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
        discharged_date: Date.now(),
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
    res.status(200).json({ msg: "Consultation finished successfully" });
  }),
};
