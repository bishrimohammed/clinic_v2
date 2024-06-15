const db = require("../../models");
const asyncHandler = require("express-async-handler");
const { getMedicalRecordById } = require("./helper/getMedicalRecordById");
const {
  getMedicalRecordPrescription,
} = require("./helper/getMedicalRecordPrescription");
const MedicalRecordHelper = require("./helper/MedicalRecordHelper");
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
    console.log(req.body);
    const medicalRecord = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: id,
        doctor_id: req.user.id,
      },
    });
    console.log(medicalRecord);
    if (medicalRecord) {
      await medicalRecord.update({
        // chief_complaint: medicalRecord.chief_complaint + ", " + chief_complaint,
        // hpi: medicalRecord.hpi + " \n" + HPI,
        // note: note,
        chief_complaint: chief_complaint,
        hpi: HPI,
        notes: note,
      });
      res.status(200).json({ message: "Chief Complaint updated successfully" });
    } else {
      const newMedicalRecordDetail = await db.MedicalRecordDetail.create({
        medicalRecord_id: id,

        chief_complaint: chief_complaint,
        hpi: HPI,
        doctor_id: req.user.id,
        notes: note,
      });
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

  get_physical_examination: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const medicalRecord = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: id,
        doctor_id: req.user.id,
      },
    });
    console.log(medicalRecord);
    const physicalExamination = await db.PhysicalExamination.findOne({
      where: {
        medicalRecordDetail_id: medicalRecord.id,
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
    console.log(physicalExamination);
    const vital = await db.Vital.findAll({
      where: {
        medicalRecord_id: id,
        examiner_id: req.user.id,
      },
      include: [
        {
          model: db.VitalResult,
          as: "vitalResults",
          // include: [
          //   {
          //     model: db.VitalSignField,
          //     as: "vitalResultFields",
          //   },
          // ]
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
    res.status(200).json({
      physicalExamination,
      // vital,
    });
  }),
  add_physical_examination: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { physicalExaminations, vitals } = req.body;
    console.log(req.body);
    const medicalRecordDetail = await db.MedicalRecordDetail.findOne({
      where: {
        medicalRecord_id: id,
        doctor_id: req.user.id,
      },
    });
    const physicalExamination = await db.PhysicalExamination.findOne({
      where: {
        medicalRecordDetail_id: medicalRecordDetail.id,
        examiner_id: req.user.id,
      },
    });
    const vital = await db.Vital.findOne({
      where: {
        medicalRecord_id: id,
        examiner_id: req.user.id,
      },
    });
    //physicalExaminationId
    // value
    if (physicalExamination) {
      await Promise.all(
        physicalExaminations.map(async (physicalExamination) => {
          await db.PhysicalExamination.update(
            {
              value: physicalExamination.value,
              // examiner_id: req.user.id,
            },
            {
              where: {
                physical_ExaminationField_id:
                  physicalExamination.physicalExaminationId,
                examiner_id: req.user.id,
                medicalRecordDetail_id: medicalRecordDetail.id,
              },
            }
          );
        })
      );
    } else {
      await Promise.all(
        physicalExaminations.map(async (physicalExamination) => {
          await db.PhysicalExamination.create({
            medicalRecordDetail_id: medicalRecordDetail.id,
            physical_ExaminationField_id:
              physicalExamination.physicalExaminationId,
            value: physicalExamination.value,
            examiner_id: req.user.id,
          });
        })
      );
    }

    //vitals
    if (vital) {
      await Promise.all(
        vitals.map(async (vital) => {
          await db.Vital.update(
            {
              result: vital.value,
              // examiner_id: req.user.id,
            },
            {
              where: {
                vitalSignField_id: vital.vitalId,
                examiner_id: req.user.id,
                medicalRecord_id: id,
              },
            }
          );
        })
      );
    } else {
      await Promise.all(
        vitals.map(async (vital) => {
          await db.Vital.create({
            medicalRecord_id: id,
            vitalSignField_id: vital.vitalId,
            result: vital.value,
            examiner_id: req.user.id,
          });
        })
      );
    }

    // console.log(medicalRecordDetail);
    res.status(200).json({
      message: physicalExamination
        ? "Physical Examination update successfully"
        : "Physical Examination added successfully",
    });
  }),
  get_Diagnosis: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const diagnosis = await db.Diagnosis.findAll({
      where: {
        medical_record_id: id,
        doctor_id: req.user.id,
      },
    });
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
    const Diagnosis = await db.Diagnosis.create({
      medical_record_id: id,
      diagnosis,
      doctor_id: req.user.id,
    });
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
    Diagnosis.update({
      status: "Confirmed",
    });
    res.status(200).json({ message: "Diagnosis confirmed successfully" });
  }),
  Ruled_out_Diagnosis: asyncHandler(async (req, res) => {
    const { diagnosis_id } = req.params;
    const Diagnosis = await db.Diagnosis.findByPk(diagnosis_id);
    if (!Diagnosis) {
      res.status(404);
      throw new Error("Diagnosis not found");
    }

    Diagnosis.update({
      status: "Ruled out",
    });
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
      is_Invetigated.clinical_finding =
        is_Invetigated.clinical_finding + "\n" + clinical_finding;
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
    const orderTests = await Promise.all(
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
    console.log(investigation);
    const orderedTest = await db.OrderedTest.findAll({
      where: {
        investigationOrder_id: investigation.id,
      },
      include: [
        {
          model: db.ServiceItem,
          as: "test",

          attributes: ["id", "service_name", "serviceCategory_id"],
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
  addVitalSign: asyncHandler(async (req, res) => {
    const { vitals, symptom, visit_type } = req.body;
    const today = new Date();
    // const vitals = req.body;
    // console.log(req.body);
    // return;
    // console.log(vitals);
    const patientVisit = await db.PatientAssignment.findOne({
      where: {
        medicalRecord_id: req.params.id,
      },
    });
    console.log(patientVisit);
    if (!patientVisit) {
      res.status(404);
      throw new Error("Patient assignment not found");
    }
    patientVisit.symptom_notes = patientVisit.symptom_notes
      ? patientVisit.symptom_notes + "\n" + symptom
      : symptom;
    patientVisit.stage = "Waiting for examiner";
    patientVisit.visit_type = visit_type;
    await patientVisit.save();
    const VitalSigns = vitals.map((v) => {
      return {
        ...v,
        medicalRecord_id: req.params.id,
        examiner_id: req.user.id,
        taken_date: today,
      };
    });
    // console.log(VitalSigns);
    // return;
    const newVitalSigns = await db.Vital.bulkCreate(VitalSigns);
    res.status(201).json({ msg: "Vital Signatures added successfully" });
  }),

  // @desc add prescriptions
  addPrescription: asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
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
      console.log("\nPrescription\n");
      const prescription = await db.Prescription.create({
        medical_record_id: id,
        patient_id: medicalRecord.patient_id,
      });
      prescriptionID = prescription.id;
    } else {
      console.log("\n\nheloo\n\n");
      prescriptionID = prescriptionExist.id;
    }
    const medicineItemIds = prescription.map(
      (medicine) => medicine.medicine_id
    );
    // console.log(medicineItemIds);
    // return;
    await Promise.all(
      req.body.map(async (prescription) => {
        await db.PrescribedMedicine.create({
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
    )
      .then(() => {
        return MedicalRecordHelper.add_MedicalRecord_medicineItem_to_Billing(
          medicalRecord.id,
          medicineItemIds
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
    const prescribed_medicines = await db.PrescribedMedicine.findAll({
      where: {
        prescription_id: prescription.id,
        is_internal: true,
      },
      include: [
        {
          model: db.ServiceItem,
          as: "medicine",
        },
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

  get_External_MedicalRecord_Prescription: asyncHandler(async (req, res) => {
    const prescription = await db.Prescription.findOne({
      where: {
        medical_record_id: req.params.id,
      },
    });
    const prescribed_medicines = await db.PrescribedMedicine.findAll({
      where: {
        prescription_id: prescription.id,
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
    console.log(req.body);
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
      const prescription = await db.Prescription.create({
        medical_record_id: id,
        patient_id: medicalRecord.patient_id,
      });
      prescriptionID = prescription.id;
    } else {
      console.log("\n\nheloo\n\n");
      prescriptionID = prescriptionExist.id;
    }

    await Promise.all(
      req.body.map(async (prescription) => {
        return await db.PrescribedMedicine.create({
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
        });
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
};
