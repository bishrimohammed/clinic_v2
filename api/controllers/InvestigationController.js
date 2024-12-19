const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
module.exports = InvestigationController = {
  getPendingLabRequests: asyncHandler(async (req, res) => {
    const labs = await db.InvestigationOrder.findAll({
      where: {
        status: true,
        is_internal_service: true,
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
  getExternalLabRequests: asyncHandler(async (req, res) => {
    const labs = await db.InvestigationOrder.findAll({
      where: {
        status: true,
        is_internal_service: false,
      },
      include: [
        // {
        //   model: db.InvestigationOrder,
        //   as: "investigation",
        //   include: [
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
            },
          ],
          // attributes: ["id", "name", "price"],
        },
        {
          model: db.ExternalService,
          as: "externalService",
        },
        //   ],
        // },
      ],
    });
    res.json(labs);
  }),
  getInvestigationLabTests: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const investigation = await db.InvestigationOrder.findByPk(id);
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

              // where: {
              //   isPanel: false,
              // },
              // include: [
              //   {
              //     model: db.PanelUnderpanel,
              //     as: "underPanels",
              //     //   include: [
              //     //     {
              //     //       model: db.ServiceItem,
              //     //       as: "serviceItem",
              //     //       attributes: ["id", "service_name", "serviceCategory_id"],
              //     //     },
              //     //   ],
              //   },
              // ],
            },
          ],
        },
      ],
    });
    // console.log(investigation);
    let medicalBilling;
    if (db.is_internal_service) {
      medicalBilling = await db.MedicalBilling.findOne({
        where: {
          medical_record_id: investigation.medicalRecord_id,
        },
      });
    } else {
      medicalBilling = await db.MedicalBilling.findOne({
        where: {
          externalService_id: investigation.externalService_id,
        },
      });
    }
    // console.log(medicalBilling);
    const payments = await db.Payment.findAll({
      where: {
        medical_billing_id: medicalBilling.id,
      },
    });
    // console.log(labtests);
    let ll = labtests.map((test) => {
      return {
        ...test.dataValues,
        isPaid:
          payments.find((payment) => payment.item_id === test.serviceItem_id)
            ?.status === "Paid",
      };
    });
    // console.log(ll);
    res.json(ll);
  }),
  getCompletedLabRequests: asyncHandler(async (req, res) => {
    const labs = await db.InvestigationOrder.findAll({
      where: {
        status: false,
        is_internal_service: true,
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
    const { results, panels } = req.body;
    const { id } = req.params;
    // console.log(panels);
    await Promise.all(
      results.map(async (value) => {
        return db.OrderedTest.update(
          {
            result: value.result,
            comment: value.comment,
            report_time: Date.now(),
            status: "completed",
            reported_by: req.user.id,
          },
          {
            where: {
              id: value.test_id,
            },
            individualHooks: true,
            userId: req.user.id,
          }
        );
      })
    );
    const labResult = await db.OrderedTest.findOne({
      where: {
        id: { [Op.notIn]: panels },
        investigationOrder_id: id,
        status: "pending",
      },
    });
    console.log(labResult);
    // .then(async (result) => {
    // });
    if (!labResult) {
      await db.OrderedTest.update(
        {
          report_time: Date.now(),
          status: "completed",
          reported_by: req.user.id,
        },
        {
          where: {
            id: panels,
          },
          individualHooks: true,
          userId: req.user.id,
        }
      );
      await db.InvestigationOrder.update(
        {
          status: false,
        },
        {
          where: {
            id,
          },
          individualHooks: true,
          userId: req.user.id,
        }
      );
    }

    res.status(200).json({
      message: "success",
    });
  }),
  getMedicalRecordDocuments: asyncHandler(async (req, res) => {
    const { medicalRecordId } = req.params;
    const documents = await db.MedicalRecordDocument.findAll({
      where: {
        medical_record_id: medicalRecordId,
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
      ],
      order: [["created_at", "DESC"]],
    });
    res.json(documents);
  }),
};
