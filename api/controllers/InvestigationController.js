const asyncHandler = require("express-async-handler");
const db = require("../models");
module.exports = InvestigationController = {
  getPendingLabRequests: asyncHandler(async (req, res) => {
    const labs = await db.InvestigationOrder.findAll({
      where: {
        status: true,
      },

      include: [
        {
          model: db.MedicalRecord,
          as: "medicalRecord",
          include: [
            {
              model: db.Patient,
              as: "patient",
              attributes: ["id", "firstName", "middleName", "lastName"],
            },
          ],
          attributes: ["id"],
        },
        {
          model: db.OrderedTest,
          as: "orderedTests",
          include: [
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
          ],
          limit: 1,
          // attributes: ["id", "name", "price"],
        },
      ],
    });
    res.json(labs);
  }),
  getInvestigationLabTests: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const labtests = await db.OrderedTest.findAll({
      where: {
        investigationOrder_id: id,
      },
      include: [
        {
          model: db.ServiceItem,
          as: "test",
          include: [
            {
              model: db.LabTestProfile,
              as: "labTestProfile",

              where: {
                isPanel: false,
              },
              //   include: [
              //     {
              //       model: db.PanelUnderpanel,
              //       as: "underPanels",
              //       //   include: [
              //       //     {
              //       //       model: db.ServiceItem,
              //       //       as: "serviceItem",
              //       //       attributes: ["id", "service_name", "serviceCategory_id"],
              //       //     },
              //       //   ],
              //      },
              //   ],
            },
          ],
        },
      ],
    });
    res.json(labtests);
  }),
  getCompletedLabRequests: asyncHandler(async (req, res) => {
    const labs = await db.InvestigationOrder.findAll({
      where: {
        status: false,
      },
      include: [
        {
          model: db.MedicalRecord,
          as: "medicalRecord",
          include: [
            {
              model: db.Patient,
              as: "patient",
              attributes: ["id", "firstName", "middleName", "lastName"],
            },
          ],
          attributes: ["id"],
        },
        {
          model: db.OrderedTest,
          as: "orderedTests",
          include: [
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
          ],
          limit: 1,
          // attributes: ["id", "name", "price"],
        },
      ],
    });
    res.json(labs);
  }),
  addLabResult: asyncHandler(async (req, res) => {
    const { results } = req.body;
    const { id } = req.params;
    // console.log(results);
    await Promise.all(
      results.map(async (value) => {
        return db.OrderedTest.update(
          {
            result: value.result,
            comment: value.comment,
            report_time: new Date(),
            status: "completed",
            reported_by: req.user.id,
          },
          {
            where: {
              id: value.test_id,
            },
          }
        );
      })
    ).then(async (result) => {
      await db.InvestigationOrder.update(
        {
          status: false,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({
        message: "success",
      });
    });
  }),
};
