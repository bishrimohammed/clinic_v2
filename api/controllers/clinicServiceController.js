const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");

module.exports.clinicServiceController = {
  getClinicServices: asyncHandler(async (req, res) => {
    const clinicServices = await db.ClinicService.findAll();
    res.json(clinicServices);
  }),
  // @desc get clinic service by id
  getClinicServiceItems: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const clinicService = await db.ClinicService.findByPk(id);
    if (!clinicService) {
      res.status(404);
      throw new Error("Clinic service not found");
    }
    // let items = [];
    const categorys = await clinicService.getServiceCategory();
    const categoryIds = categorys.map((category) => category.id);
    const items = await db.ServiceItem.findAll({
      where: {
        serviceCategory_id: categoryIds,
      },
      include: [
        {
          model: db.ServiceCategory,
          as: "serviceCategory",
          attributes: ["name"],
        },
        {
          model: db.Unit,
          as: "unit",
          attributes: ["name"],
        },
      ],
    });
    // .then((c) => {
    //   return Promise.all(
    //     c.map(async (category) => await category.getServiceItem())
    //   );
    // });
    // .then((items) => {
    //   items.forEach((categoryItems) => {
    //     categoryItems.forEach((item) => {
    //       items.push(item);
    //     });
    //     // console.log(items);
    //     return items;
    //     // console.log(items);
    //     // console.log(ccc);
    //   });
    //   // return items.map((i) => i);
    // });

    // ccc.forEach((categoryItems) => {
    //   categoryItems.forEach((item) => {
    //     items.push(item);
    //   });
    // });
    // const ggg = await ccc[0].getServiceItem();
    // items = await Promise.all(
    //   cc.map(async (category) => await category.getServiceItem())
    // );
    res.json(items);
  }),

  // @desc get all laboratory services
  getLabServiceItems: asyncHandler(async (req, res) => {
    const labServiceItems = await db.ServiceItem.findAll({
      where: { is_laboratory: true },
      include: [
        {
          model: db.ServiceCategory,
          as: "serviceCategory",
          attributes: ["name"],
        },
      ],
    });
    res.json(labServiceItems);
  }),
  // @desc create lab service items item

  createLabServiceItem: asyncHandler(async (req, res) => {
    const { test_name, price, unit } = req.body;
    // console.log(req.body);
    const labServiceItem = await db.ServiceItem.create({
      service_name: test_name,
      price,
      is_laboratory: true,
      unit_id: unit,
      serviceCategory_id: req.body.lab_category,
    });
    res.status(201).json(labServiceItem);
  }),
  // @desc update lab service items item
  updateLabServiceItem: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { test_name, price, unit } = req.body;
    console.log(req.body);

    const labServiceItem = await db.ServiceItem.update(
      {
        service_name: test_name,
        price,
        is_laboratory: true,
        unit_id: unit,
        serviceCategory_id: req.body.lab_category,
      },
      {
        where: { id },
      }
    );
    res.json(labServiceItem);
  }),
  // @desc get all laboratory category
  getLabServiceCategories: asyncHandler(async (req, res) => {
    const labServiceCategory = await db.ClinicService.findOne({
      where: { is_laboratory: true },
      include: [
        {
          model: db.ServiceCategory,
          as: "serviceCategory",
          attributes: ["name", "id"],
        },
      ],
    });
    const labServiceCategories = labServiceCategory.serviceCategory;
    res.json(labServiceCategories);
  }),
  // @desc delete lab service items item
  deleteLabServiceItem: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const labServiceItem = await db.ServiceItem.destroy({
      where: { id },
    });
    res.json(labServiceItem);
  }),
  // @desc get all imaging service items
  getImagingServiceItems: asyncHandler(async (req, res) => {
    const imagingServiceItems = await db.ServiceItem.findAll({
      where: { is_imaging: true },
      include: [
        {
          model: db.ServiceCategory,
          as: "serviceCategory",
          attributes: ["name"],
        },
      ],
    });
    res.json(imagingServiceItems);
  }),
  // @desc create imaging service item
  createImagingServiceItem: asyncHandler(async (req, res) => {
    const { test_name, price, unit } = req.body;
    console.log(req.body);
    const imagingServiceItem = await db.ServiceItem.create({
      service_name: test_name,
      price,
      is_imaging: true,
      unit_id: unit,
      serviceCategory_id: req.body.imaging_category,
    });
    res.status(201).json(imagingServiceItem);
  }),
  // @desc delete imaging service items item
  deleteImagingServiceItem: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const imagingServiceItem = await db.ServiceItem.destroy({
      where: { id },
    });
    res.json(imagingServiceItem);
  }),

  // @desc get all imaging category
  getImagingServiceCategories: asyncHandler(async (req, res) => {
    const imagingServiceCategory = await db.ClinicService.findOne({
      where: { is_imaging: true },
      include: [
        {
          model: db.ServiceCategory,
          as: "serviceCategory",
          attributes: ["name", "id"],
        },
      ],
    });
    const imagingServiceCategories = imagingServiceCategory.serviceCategory;
    res.json(imagingServiceCategories);
  }),
  // @desc update imaging service items
  updateImagingServiceItem: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { test_name, price, unit } = req.body;
    console.log(req.body);
    const imagingServiceItem = await db.ServiceItem.update(
      {
        service_name: test_name,
        price,
        is_imaging: true,
        unit_id: unit,
        serviceCategory_id: req.body.imaging_category,
      },
      {
        where: { id },
      }
    );
    res.json(imagingServiceItem);
  }),
  // @desc delete imaging service items

  getClinicServiceById: asyncHandler(async (req, res) => {
    const clinicService = await db.ServiceItem.find(req.params.id);
    if (!clinicService) {
      throw new Error("ClinicService not found");
    }
    res.json(clinicService);
  }),
  getClinicServiceDetail: asyncHandler(async (req, res) => {
    const { query } = req.query;
    const clinicService = await db.ClinicService.findOne({
      where: {
        service_name: {
          [Op.like]: `${query}%`,
        },
      },
      include: [
        {
          model: db.ServiceCategory,
          as: "serviceCategory",
          include: [
            {
              model: db.ServiceItem,
              as: "serviceItem",
            },
          ],
        },
      ],
    });
    if (!clinicService) {
      throw new Error("ClinicService not found");
    }
    res.json(clinicService);
  }),
  createClinicService: asyncHandler(async (req, res) => {
    const { service_name } = req.body;
    const clinicService = await db.ClinicService.create({
      service_name,
    });
    res.json(clinicService);
  }),
  updateClinicService: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { service_name } = req.body;
    const clinicService = await db.ClinicService.update(
      {
        service_name,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json(clinicService);
  }),
  deleteClinicService: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const clinicService = await db.ClinicService.destroy({
      where: {
        id,
      },
    });
    res.json(clinicService);
  }),
  deactiveClinicService: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const clinicService = await db.ClinicService.update(
      {
        status: false,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json(clinicService);
  }),
};
