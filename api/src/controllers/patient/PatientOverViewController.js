const asyncHandler = require("express-async-handler");
const db = require("../../models");
module.exports = PatientOverViewController = {
  getResentData: asyncHandler(async (req, res) => {
    const patientId = req.params.patientId;
    const medicalRecordIds = await getPatientMedicalRecordIds(patientId);
    const clinicDatas = await db.MedicalRecordDetail.findAll({
      where: {
        medicalRecord_id: { [db.Sequelize.Op.in]: medicalRecordIds },
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
      order: [["createdAt", "DESC"]],
      limit: 2,
    });
    const prescription = await db.Prescription.findAll({
      where: {
        medical_record_id: { [db.Sequelize.Op.in]: medicalRecordIds },
      },
    });
    const prescriptionIds = prescription?.map((p) => p.id);
    const prescribedMedicines = await db.PrescribedMedicine.findAll({
      where: {
        prescription_id: { [db.Sequelize.Op.in]: prescriptionIds },
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
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    const investigationOrders = await db.InvestigationOrder.findAll({
      where: {
        medicalRecord_id: { [db.Sequelize.Op.in]: medicalRecordIds },
      },
    });
    const investigationOrderIds = investigationOrders?.map((p) => p.id);
    const patientlabs = await db.OrderedTest.findAll({
      where: {
        investigationOrder_id: { [db.Sequelize.Op.in]: investigationOrderIds },
        is_underpanel: false,
      },
      include: [
        {
          model: db.ServiceItem,
          as: "test",
          include: {
            model: db.LabTestProfile,
            as: "labTestProfile",
          },
          attributes: ["id", "service_name"],
        },
        {
          model: db.User,
          as: "requestedBy",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
        // {
        //   model: db.User,
        //   as: "reportedBy",
        //   include: {
        //     model: db.Employee,
        //     as: "employee",
        //     attributes: ["id", "firstName", "middleName", "lastName"],
        //   },
        //   attributes: ["id"],
        // },
      ],
      // offset: (parseInt(req.query.page) - 1) * parseInt(req.query.limit),
      // limit: parseInt(req.query.limit),
      order: [["createdAt", "DESC"]],
      limit: 5,
      // offset: ,
    });
    res.json({ clinicDatas, prescribedMedicines, patientlabs });
  }),
  getPatientClinicData: asyncHandler(async (req, res) => {
    const patientId = req.params.patientId;
    const medicalRecordIds = await getPatientMedicalRecordIds(patientId);
    const clinicDatas = await db.MedicalRecordDetail.findAll({
      where: {
        medicalRecord_id: { [db.Sequelize.Op.in]: medicalRecordIds },
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
      order: [["createdAt", "DESC"]],
    });
    res.json(clinicDatas);
  }),
  getPatientPrescriptions: asyncHandler(async (req, res) => {
    const patientId = req.params.patientId;
    const medicalRecordIds = await getPatientMedicalRecordIds(patientId);
    const prescription = await db.Prescription.findAll({
      where: {
        medical_record_id: { [db.Sequelize.Op.in]: medicalRecordIds },
      },
    });
    const prescriptionIds = prescription?.map((p) => p.id);
    const prescribedMedicines = await db.PrescribedMedicine.findAll({
      where: {
        prescription_id: { [db.Sequelize.Op.in]: prescriptionIds },
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
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(prescribedMedicines);
  }),
  getPatientMedicalCertificates: asyncHandler(async (req, res) => {
    const patientId = req.params.patientId;
    const medicalRecordIds = await getPatientMedicalRecordIds(patientId);
    const medicalCertificates = await db.SickLeaveNote.findAll({
      where: {
        medical_record_id: { [db.Sequelize.Op.in]: medicalRecordIds },
      },
      include: [
        {
          model: db.User,
          as: "doctor",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
      ],
    });
    res.json(medicalCertificates);
  }),
  getPatientReferralNotes: asyncHandler(async (req, res) => {
    const patientId = req.params.patientId;
    const medicalRecordIds = await getPatientMedicalRecordIds(patientId);
    const referralNotes = await db.ReferralNote.findAll({
      where: {
        medical_record_id: { [db.Sequelize.Op.in]: medicalRecordIds },
      },
      include: [
        {
          model: db.User,
          as: "doctor",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
      ],
    });
    res.json(referralNotes);
  }),
  // getPatientVitals: asyncHandler(async (req, res) => {}),
  getPatientLabs: asyncHandler(async (req, res) => {
    const patientId = req.params.patientId;
    console.log(req.query);
    const medicalRecordIds = await getPatientMedicalRecordIds(patientId);
    const investigationOrders = await db.InvestigationOrder.findAll({
      where: {
        medicalRecord_id: { [db.Sequelize.Op.in]: medicalRecordIds },
      },
    });
    const investigationOrderIds = investigationOrders?.map((p) => p.id);
    const patientlabs = await db.OrderedTest.findAll({
      where: {
        investigationOrder_id: { [db.Sequelize.Op.in]: investigationOrderIds },
        is_underpanel: false,
      },
      include: [
        {
          model: db.ServiceItem,
          as: "test",
          include: {
            model: db.LabTestProfile,
            as: "labTestProfile",
          },
          attributes: ["id", "service_name"],
        },
        {
          model: db.User,
          as: "requestedBy",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
        // {
        //   model: db.User,
        //   as: "reportedBy",
        //   include: {
        //     model: db.Employee,
        //     as: "employee",
        //     attributes: ["id", "firstName", "middleName", "lastName"],
        //   },
        //   attributes: ["id"],
        // },
      ],
      // offset: (parseInt(req.query.page) - 1) * parseInt(req.query.limit),
      // limit: parseInt(req.query.limit),
      order: [["createdAt", "DESC"]],
      // offset: ,
    });
    res.json(patientlabs);
  }),
  getPatientImagingStudies: asyncHandler(async (req, res) => {}),
  getPatientProcedure: asyncHandler(async (req, res) => {
    const patientId = req.params.patientId;
    const medicalRecordIds = await getPatientMedicalRecordIds(patientId);
    const procedures = await db.Procedure.findAll({
      where: {
        medical_record_id: { [db.Sequelize.Op.in]: medicalRecordIds },
      },
      include: [
        {
          model: db.User,
          as: "createdBy",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
        {
          model: db.ServiceItem,
          as: "serviceItem",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(procedures);
  }),
  // getPatientImmunizations: asyncHandler(async (req, res) => {}),
};

const getPatientMedicalRecordIds = async (patientId) => {
  const medicalRecords = await db.MedicalRecord.findAll({
    where: {
      patient_id: patientId,
    },

    order: [["createdAt", "DESC"]],
    // limit: 1, // only get the latest medical record for the patient (if any) to avoid duplicate data.
  });

  return medicalRecords.map((record) => record.id);
};
