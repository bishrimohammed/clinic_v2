const asyncHandler = require("express-async-handler");
const db = require("../models");

module.exports = ExternalServiceController = {
  getActiveExternalServices: asyncHandler(async (req, res) => {
    // console.log(req.query);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    let sortDirection;
    let where = {
      status: true,
    };
    if (req.query.role === "doctor") {
      where.examiner = req.user.id;
    }
    if (req.query.role === "laboratorian") {
      where.service_type = "lab";
    }
    switch (req.query?.sortBy) {
      case "patient_name":
        if (req.query?.order === "asc") {
          sortDirection = [["patient_name", "ASC"]];
        } else {
          sortDirection = [["patient_name", "DESC"]];
        }
        break;
      case "service_date":
        if (req.query?.order === "asc") {
          sortDirection = [["service_time", "ASC"]];
        } else {
          sortDirection = [["service_time", "DESC"]];
        }
        break;
      case "service_type":
        if (req.query?.order === "asc") {
          sortDirection = [["service_type", "ASC"]];
        } else {
          sortDirection = [["service_type", "DESC"]];
        }
        break;

      default:
        sortDirection = [["service_time", "ASC"]];
    }
    // console.log(sortDirection);

    const { count, rows } = await db.ExternalService.findAndCountAll({
      where,
      include: [
        {
          model: db.User,
          as: "Examiner",
          //   required: false,
        },
      ],
      order: sortDirection,
      offset: (page - 1) * limit,
      limit: limit,
    });
    const hasMore = count > page * limit;
    // console.log(patients);
    res.status(200).json({
      results: rows,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      hasMore: hasMore,
    });
  }),
  getExternalServiceLabTests: asyncHandler(async (req, res) => {
    const { externalServiceId } = req.params;
    // const externalService = await db.ExternalService.findByPk(
    //   externalServiceId
    // );
    const labInvestigation = await db.InvestigationOrder.findOne({
      where: { externalService_id: externalServiceId },
    });
    // console.log(externalService);
    // console.log(externalServiceId);
    // console.log(labInvestigation);
    const labTests = await db.OrderedTest.findAll({
      where: {
        investigationOrder_id: labInvestigation?.id,
      },
      include: [
        {
          model: db.ServiceItem,
          as: "test",
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
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
        {
          model: db.User,
          as: "reportedBy",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
      ],
    });
    res.json(labTests);
  }),
  createExternalService: asyncHandler(async (req, res) => {
    const {
      externalService,
      indirectlySelectedLabs: underPanels,
      selectedLabs: investigations,
      procedure,
    } = req.body;
    // console.log(req.body);
    // res.json({ m: "srdgerg" });
    // return;
    const externalservice = await db.ExternalService.create(
      {
        patient_name: externalService.patient_name,
        examiner: externalService.examiner,
        service_type: externalService.service_type,
        service_time: externalService.service_time,
        reason: externalService.reason,
      },
      {
        userId: req.user.id,
      }
    );
    if (procedure) {
      await db.Procedure.create({
        externalService_id: externalservice.id,
        is_internal_service: false,
        created_by: req.user.id,
        serviceItem_id: procedure,
      });
      createMedicalPayment(
        externalservice.id,
        procedure,
        "procedure",
        req.user.id
      );
    }
    if (investigations?.length > 0) {
      const newInvestigation = await db.InvestigationOrder.create(
        {
          medicalRecord_id: null,
          externalService_id: externalservice.id,
          is_internal_service: false,
        },
        { userId: req.user.id }
      );
      await Promise.all(
        investigations.map(async (test) => {
          return db.OrderedTest.create(
            {
              serviceItem_id: test,
              investigationOrder_id: newInvestigation.id,
              requested_by: req.user.id,
              reported_by: null,
              comment: "",
              result: "",
            },
            { userId: req.user.id }
          );
        })
      );

      if (underPanels?.length > 0) {
        await Promise.all(
          underPanels.map((test) => {
            return db.OrderedTest.create(
              {
                serviceItem_id: test,
                investigationOrder_id: newInvestigation.id,
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
      createMedicalPayment(
        externalservice.id,
        investigations,
        "lab",
        req.user.id
      );
    }

    res.status(201).json({ msg: "External service created successfully" });
  }),
};
const createMedicalPayment = async (
  externalServiceId,
  items,
  service_type,
  userId
) => {
  const medicalBilling = await db.MedicalBilling.create(
    {
      externalService_id: externalServiceId,
      is_internal_service: false,
    },
    {
      userId,
      // include: [{ model: db.ServiceItem, where: { id: items } }],
    }
  );
  if (service_type === "lab") {
    await Promise.all(
      items.map(async (itemId) => {
        return await db.Payment.create(
          {
            medical_billing_id: medicalBilling.id,
            item_id: itemId,
          },
          { userId }
        );
      })
    );
  } else {
    await db.Payment.create(
      {
        medical_billing_id: medicalBilling.id,
        item_id: items,
      },
      {
        userId,
      }
    );
  }
};
