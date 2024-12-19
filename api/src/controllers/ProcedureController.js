const asyncHandler = require("express-async-handler");
const db = require("../models");
module.exports = ProcedureController = {
  getByMedicalRecordId: asyncHandler(async (req, res) => {
    const { medicalRecordId } = req.params;
    const procedures = await db.Procedure.findAll({
      where: {
        medical_record_id: medicalRecordId,
      },
      include: [
        {
          model: db.ServiceItem,
          as: "serviceItem",
        },
        {
          model: db.User,
          as: "createdBy",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["firstName", "lastName", "middleName"],
          },
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(procedures);
  }),
  createProcedure: asyncHandler(async (req, res) => {
    const { medicalRecordId } = req.params;
    const { procedures } = req.body;
    await Promise.all(
      procedures.map(async (procedure) => {
        return await db.Procedure.create({
          medical_record_id: medicalRecordId,
          created_by: req.user.id,
          serviceItem_id: procedure,
        });
      })
    );
    res.status(201).json({ message: "Procedures added successfully" });
  }),
};
