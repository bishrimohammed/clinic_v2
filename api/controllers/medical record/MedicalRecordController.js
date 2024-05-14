const db = require("../../models");
const asyncHandler = require("express-async-handler");
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
  // @desc    add investigation test a MedicalRecord
  // @route   post /api/medicalRecords/:id/investigation
  // @access  Private
  addInvestigation: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { investigations, clinical_finding } = req.body;
    const medicalRecord = await db.MedicalRecord.findByPk(id);

    if (!medicalRecord) {
      res.status(404);
      throw new Error("MedicalRecordDetail not found");
    }
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
    res.status(200).json({ msg: "success" });
  }),
  // @desc    get investigation test ordered a MedicalRecord
  // @route   get /api/medicalRecords/:id/investigation
  // @access  Private
  getInvestigation: asyncHandler(async (req, res) => {
    const { id } = req.params;
    // const medicalRecord = await db.MedicalRecord.findByPk(id,{
    //   include: [
    //     {
    //       model: db.InvestigationOrder,
    //       as: "investigationOrder",
    //       include: [
    //         {
    //           model: db.OrderedTest,
    //           as: "orderedTest",
    //           include: [
    //             {
    //               model: db.ServiceItem,
    //               as: "serviceItem",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // });
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
    const orderedTest = await db.OrderedTest.findAll({
      where: {
        investigationOrder_id: investigation.id,
      },
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
    });
    // console.log(
    //   labcategory_ids.includes(investigation.tests[0].serviceCategory_id)
    // );
    // const hh = investigation?.tests?.map((test) => {
    //   isin = labcategory_ids.includes(test.serviceCategory_id);

    //   if (isin) return { ...test, type: "lab" };
    //   return { ...test, type: "imaging" };
    // });
    // console.log(hh);

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
    // const { vitals } = req.body;
    const today = new Date();
    const vitals = req.body;
    // console.log(req.body);
    console.log(vitals);
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
};
