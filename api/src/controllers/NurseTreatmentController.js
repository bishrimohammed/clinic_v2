const asyncHandler = require("express-async-handler");
const db = require("../models");

module.exports = NurseTreatmentController = {
  getNurseTreatments: asyncHandler(async (req, res) => {
    const nurseTreatments = await db.NurseTreatment.findAll();
    res.json(nurseTreatments);
  }),
  getActiveNurseTreatments: asyncHandler(async (req, res) => {
    const nurseTreatments = await db.Prescription.findAll({
      include: [
        {
          model: db.PrescribedMedicine,
          as: "prescribedMedicines",
          where: {
            is_excuted: false,
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
        },
        {
          model: db.MedicalRecord,
          as: "medicalRecord",
          include: {
            model: db.PatientAssignment,
            as: "visit",
            // attributes: ["id", "firstName", "middleName", "lastName"],
          },
          where: {
            status: true,
          },
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
          ],
          include: [
            {
              model: db.Address,
              as: "address",
            },
          ],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    res.json(nurseTreatments);
  }),
  getPrescribedmedicineByPrescriptionId: asyncHandler(async (req, res) => {
    const { prescriptionId } = req.params;
    const prescribedMedicines = await db.PrescribedMedicine.findAll({
      where: {
        prescription_id: prescriptionId,
        is_excuted: false,
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
              attributes: ["id", "firstName", "middleName", "lastName"],
            },
          ],
          attributes: ["id"],
        },
      ],
    });
    res.json(prescribedMedicines);
  }),
  getExcutedPrescribedmedicineByPrescriptionId: asyncHandler(
    async (req, res) => {
      const { prescriptionId } = req.params;
      const prescribedMedicines = await db.PrescribedMedicine.findAll({
        where: {
          prescription_id: prescriptionId,
          is_excuted: true,
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
                attributes: ["id", "firstName", "middleName", "lastName"],
              },
            ],
            attributes: ["id"],
          },
          {
            model: db.User,
            as: "excutedBy",
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
      res.json(prescribedMedicines);
    }
  ),
  excuteMedication: asyncHandler(async (req, res) => {
    const { medicationId } = req.params;
    const prescription = await db.PrescribedMedicine.findByPk(medicationId);
    prescription.is_excuted = true;
    prescription.excuted_by = req.user.id;
    prescription.excutedAt = Date.now();
    await prescription.save({ userId: req.user.id });
    res.json(prescription);
  }),
  excuteMedications: asyncHandler(async (req, res) => {
    const { prescriptionId } = req.params;
    const prescription = await db.Prescription.findByPk(prescriptionId);
    // console.log("\n\n\n" + prescription + "\n\n");
    // console.log("\n\n\n" + prescriptionId + "\n\n");
    const prescriptions = await db.PrescribedMedicine.update(
      {
        is_excuted: true,
        excuted_by: req.user.id,
        excutedAt: Date.now(),
      },
      {
        where: {
          prescription_id: prescription.id,
          is_excuted: false,
        },
        userId: req.user.id,
      }
    );
    // prescriptions.forEach(async (prescription) => {
    //   prescription.is_excuted = true;
    //   await prescription.save({ userId: req.user.id });
    // });
    res.json(prescriptions);
  }),
};
