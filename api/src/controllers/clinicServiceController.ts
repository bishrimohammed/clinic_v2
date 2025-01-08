import { RequestHandler } from "express";

// import asyncHandler from "express-async-handler";
import { ClinicService } from "../models";
import { clinicserviceService } from "../services";
import asyncHandler from "../utils/asyncHandler";
import {
  createClinicServiceSchema,
  createClinicServiceT,
  createServiceCategorySchema,
  updateClinicServiceSchema,
  updateServiceCategorySchema,
} from "../types/clinic-services";
import { ApiError } from "../shared/error/ApiError";
const db = require("../models");
const { Op } = require("sequelize");

// module.exports.clinicServiceController = {
export const getClinicServices = asyncHandler(async (req, res) => {
  const { status } = req.query as { status: "true" | "false" | undefined };
  let filter: { status?: boolean } = {};

  if (status) {
    filter = { status: status === "true" };
  }

  const clinicServices = await clinicserviceService.getClinicServices(filter);
  res.json(clinicServices);
});
// export const getServiceCategories = asyncHandler(async (req, res) => {
export const getClinicServiceCategoriesByServiceId = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    const serviceCategories =
      await clinicserviceService.getClinicServiceCategoriesByServiceId(id);
    res.json(serviceCategories);
  }
);

export const getServiceCategoryById = asyncHandler(async (req, res) => {
  // export const getClinicServiceCategoriesByServiceId = asyncHandler(async (req, res) => {
  const { category_id } = req.params;

  const serviceCategory = await clinicserviceService.getServiceCategoryById(
    category_id
  );
  res.json(serviceCategory);
});
export const createServiceCategory = asyncHandler<{
  validatedData: typeof createServiceCategorySchema._type;
}>(async (req, res) => {
  const { id } = req.params;

  const clinicService = await clinicserviceService.getClinicServiceById(id);
  const totaltServiceCategories = await clinicService.countServiceCategories();

  if (!clinicService.hasManyCategory && totaltServiceCategories > 0) {
    throw new ApiError(
      400,
      `${clinicService.service_name} already has ${totaltServiceCategories} service categories`
    );
  }
  const serviceCategory = await clinicserviceService.createServiceCategory(
    clinicService.id,
    req.validatedData
  );
  // return;
  // const serviceGroup = await db.ServiceCategory.create({
  //   name,
  //   clinicService_id: parseInt(clinicService_id),
  // });
  res.status(201).json({
    success: true,
    message: `created successfully`,
    data: serviceCategory,
  });
});
export const updateServiceCategory = asyncHandler<{
  validatedData: typeof updateServiceCategorySchema._type;
}>(async (req, res) => {
  const { category_id } = req.params;
  const serviceCategory = await clinicserviceService.updateServiceCategory(
    category_id,
    req.validatedData
  );

  res.json({
    success: true,
    message: `${serviceCategory.name} is updated successfully`,
    data: serviceCategory,
  });
});
// @desk activate service group
export const activateServiceCategory = asyncHandler(async (req, res) => {
  const { category_id } = req.params;
  const serviceCategory = await clinicserviceService.activateClinicCategory(
    category_id
  );
  // const serviceGroup = await db.ServiceCategory.update(
  //   {
  //     status: true,
  //   },
  //   {
  //     where: {
  //       id,
  //     },
  //   }
  // );
  res.json({
    success: true,
    message: `${serviceCategory.name} is activated successfully`,
    data: serviceCategory,
  });
});

// @desk deactivate service group
export const deactiveServiceCategory = asyncHandler(async (req, res) => {
  const { category_id } = req.params;
  const serviceCategory = await clinicserviceService.deactivateClinicCategory(
    category_id
  );
  // const serviceGroup = await db.ServiceCategory.update(
  //   {
  //     status: false,
  //   },
  //   {
  //     where: {
  //       id,
  //     },
  //   }
  // );
  res.json({
    success: true,
    message: `${serviceCategory.name} is deactivated successfully`,
    data: serviceCategory,
  });
});

export const deleteServiceCategory = asyncHandler(async (req, res) => {
  const { category_id } = req.params;
  const serviceGroup = await clinicserviceService.deleteServiceCategory(
    category_id
  );
  res.json(serviceGroup);
});
// @desk delete service group
// @desc get clinic service by id
export const getClinicServiceItems = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { price } = req.query as { price: string };
  // console.log(id);
  let where: any = {};
  if (req.query.status) {
    where.status = req.query.status === "true" ? true : false;
  }
  if (req.query.price) {
    if (req.query.price === "500+") {
      where.price = {
        [Op.gte]: 500,
      };
      // console.log("llllllmlkmnkj");
      // return;
    } else {
      let minPrice = parseInt(price.split("-")[0]);
      let maxPrice = parseInt(price.split("-")[1]);
      console.log("minPrice: " + minPrice);
      console.log("maxPrice: " + maxPrice);

      // price range between minprice and maxprice
      where.price = {
        [Op.gte]: minPrice,
        [Op.lte]: maxPrice,
      };
    }

    // where.price = {
    //   [Op.gte]: req.query.price
    // }

    // where.price = {
    //   [Op.gte]: req.query.price
    // }
  }
  // if (req.query.gender) {
  //   where.gender = req.query.gender;
  // }
  // console.log(req.query);
  const clinicService = await db.ClinicService.findByPk(id);
  if (!clinicService) {
    res.status(404);
    throw new Error("Clinic service not found");
  }
  // console.log("sjdbkajcvdgh");
  // let items = [];
  const categorys = await clinicService.getServiceCategory();
  const categoryIds = categorys.map((category: any) => category.id);
  if (req.query.groups) {
    where.serviceCategory_id = req.query.groups;
  } else {
    where.serviceCategory_id = categoryIds;
  }
  const items = await db.ServiceItem.findAll({
    where: where,
    order: [["service_name", "ASC"]],
    include: [
      {
        model: db.ServiceCategory,
        as: "serviceCategory",
        attributes: ["name", "id"],
      },
      {
        model: db.LabTestProfile,
        as: "labTestProfile",
        // attributes: ["id"],
        include: [
          {
            model: db.PanelUnderpanel,
            as: "underPanels",
            include: [
              {
                model: db.LabTestProfile,
                as: "ParentPanel",
              },
            ],
          },
        ],
      },
    ],
  });
  res.json(items);
});

// @desc get all laboratory services
export const getLabServiceItems = asyncHandler(async (req, res) => {
  const labServiceItems = await db.ServiceItem.findAll({
    where: { is_laboratory: true },
    include: [
      {
        model: db.ServiceCategory,
        as: "serviceCategory",
        attributes: ["name"],
      },
      {
        model: db.LabTestProfile,
        as: "labTestProfile",
        // attributes: ["id"],
        include: [{ model: db.PanelUnderpanel, as: "underPanels" }],
      },
    ],
  });
  res.json(labServiceItems);
});
export const ggggg = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clinicService = await db.ClinicService.findByPk(id);
  if (!clinicService) {
    res.status(404);
    throw new Error("Clinic service not found");
  }
  const categorys = await clinicService.getServiceCategory();
  const categoryIds = categorys.map((category: any) => category.id);
  const labServiceItems = await db.ServiceItem.findAll({
    where: {
      serviceCategory_id: categoryIds,
      // is_laboratory: true,
    },
  });
  await Promise.all(
    labServiceItems.map((item: any) => {
      return db.LabTestProfile.create({
        labTest_id: item.id,
        isPanel: false,
        isFixed: false,
        parentId: null,
      });
    })
  );
});
// @desc add service items
export const addServiceItems = asyncHandler(async (req, res) => {
  const { service_name, price, unit, isFixed, islab, lab } = req.body;
  console.log(req.body);
  // return;
  const labServiceItem = await db.ServiceItem.create({
    service_name: service_name,
    price,
    isFixed: isFixed,
    // is_laboratory: true,
    unit: unit,
    serviceCategory_id: parseInt(req.body.serviceGroup),
  });
  if (islab) {
    const labProfile = await db.LabTestProfile.create({
      labTest_id: labServiceItem.id,
      isPanel: lab.isPanel,
      isFixed: isFixed,
    });
    // const labs = await db.ServiceItem.findAll({
    //   where: { id: lab.childService },
    // });
    console.log(lab.childService);
    if (lab.isPanel) {
      const lbProfiles = await db.LabTestProfile.findAll(
        // { parentId: labProfile.id },
        { where: { labTest_id: { [db.Sequelize.Op.in]: lab.childService } } }
      );
      const lbProfileIds = lbProfiles.map((p: any) => p.id);
      console.log(lbProfileIds);
      await Promise.all(
        // lab.childService.map((id) => {
        //   console.log(id);
        //   return db.PanelUnderpanel.create({
        //     panel_id: labProfile.id,
        //     underpanel_id: id,
        //   });
        // })
        lbProfileIds.map((id: number) => {
          return db.PanelUnderpanel.create({
            panel_id: labProfile.id,
            underpanel_id: id,
          });
        })
      );

      // const panel = await labProfile.addUnderPanel(lbProfileIds);
    }
  }
  res.status(201).json(labServiceItem);
});
// @desc update service items
export const updateServiceItems = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { service_name, price, unit, isFixed, islab, lab } = req.body;
  console.log(req.body);
  // return;
  const labServiceItem = await db.ServiceItem.update(
    {
      service_name: service_name,
      price,
      isFixed: isFixed,
      // is_laboratory: true,
      unit: unit,
      serviceCategory_id: parseInt(req.body.serviceGroup),
    },
    { where: { id: id } }
  );
  if (islab) {
    const labProfile = await db.LabTestProfile.findOne({
      where: { labTest_id: id },
    });

    // console.log(labProfile);
    // return;
    // const labProfile = await db.LabTestProfile.update(
    //   {
    //     isPanel: lab.isPanel,
    //     isFixed: lab.isFixed,
    //   },
    //   { where: { labTest_id: id } }
    // );
    // const labs = await db.ServiceItem.findAll({
    //   where: { id: lab}
    const lbProfiles = await db.LabTestProfile.findAll(
      // { parentId: labProfile.id },
      {
        where: {
          labTest_id: { [db.Sequelize.Op.in]: lab?.childService || [] },
        },
      }
    );
    const lbProfileIds = lbProfiles.map((p: any) => p.id);
    console.log(lbProfileIds);
    console.log(lab.childService);
    if (lab.underPanel && labProfile.isPanel) {
      // console.log(lbProfileIds);
      console.log("hello");
      await db.PanelUnderpanel.destroy({
        where: {
          panel_id: labProfile.id,
          // underpanel_id: labProfile.underPanel.id
        },
      });

      // const panel = await labProfile.addUnderPanel(lbProfileIds);
    } else if (lab.isPanel && labProfile.isPanel) {
      // console.log(lbProfileIds);
      await db.PanelUnderpanel.destroy({
        where: {
          panel_id: labProfile.id,
          // underpanel_id: labProfile.underPanel.id
        },
      });
      await Promise.all(
        lbProfileIds.map((id: number) => {
          return db.PanelUnderpanel.create({
            panel_id: labProfile.id,
            underpanel_id: id,
          });
        })
      );
    } else if (lab.isPanel && !labProfile.isPanel) {
      console.log("\n\nunderpanel to panel\n\n");
      await Promise.all(
        lbProfileIds.map((id: number) => {
          return db.PanelUnderpanel.create({
            panel_id: labProfile.id,
            underpanel_id: id,
          });
        })
      );
    }
    labProfile.isPanel = lab.isPanel;
    labProfile.isFixed = isFixed;
    await labProfile.save();
  }
  res.json({ msg: "ok" });
});

// @desc create lab service items item

export const createLabServiceItem = asyncHandler(async (req, res) => {
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
});
// @desc update lab service items item
export const updateLabServiceItem = asyncHandler(async (req, res) => {
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
});
// @desc get all laboratory category
export const getLabServiceCategories = asyncHandler(async (req, res) => {
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
});
// @desc delete lab service items item
export const deleteLabServiceItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const labServiceItem = await db.ServiceItem.destroy({
    where: { id },
  });
  res.json(labServiceItem);
});
// @desc get all imaging service items
export const getImagingServiceItems = asyncHandler(async (req, res) => {
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
});
// @desc create imaging service item
export const createImagingServiceItem = asyncHandler(async (req, res) => {
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
});
// @desc delete imaging service items item
export const deleteImagingServiceItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const imagingServiceItem = await db.ServiceItem.destroy({
    where: { id },
  });
  res.json(imagingServiceItem);
});

// @desc get all imaging category
export const getImagingServiceCategories = asyncHandler(async (req, res) => {
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
});
// @desc update imaging service items
export const updateImagingServiceItem = asyncHandler(async (req, res) => {
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
});
// @desc delete imaging service items

export const getClinicServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clinicService = await clinicserviceService.getClinicServiceById(id);

  res.json({
    success: true,

    data: clinicService,
  });
});
export const getClinicServiceDetail = asyncHandler(async (req, res) => {
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
});
// <{
//   ValidatedData: createClinicServiceT;
// }>
export const createClinicService = asyncHandler<{
  validatedData: typeof createClinicServiceSchema._type;
}>(async (req, res) => {
  const validatedData = req.validatedData;

  // const { service_name } = req.body;
  // const clinicService = await db.ClinicService.create({
  //   service_name,
  // });
  const clinicService = await clinicserviceService.createClinicService(
    validatedData
  );
  // console.log(validatedData);

  res.json({ success: true, data: clinicService });
});
export const updateClinicService = asyncHandler<{
  validatedData: typeof updateClinicServiceSchema._type;
}>(async (req, res) => {
  const { id } = req.params;
  // const { service_name, status } = req.body;
  const validatedData = req.validatedData;
  const updatedClinicService = await clinicserviceService.updateClinicService(
    id,
    validatedData
  );
  // const clinicService = await db.ClinicService.update(
  //   {
  //     service_name,
  //     status,
  //   },
  //   {
  //     where: {
  //       id,
  //     },
  //   }
  // );
  res.json({ success: true, data: updatedClinicService });
});
export const deleteClinicService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clinicService = await clinicserviceService.deleteClinicService(id);
  //  await db.ClinicService.destroy({
  //   where: {
  //     id,
  //   },
  // });

  res.json({
    success: true,
    message: `${clinicService.service_name} updated successfully`,
    // data: clinicService,
  });
});
export const deactiveClinicService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clinicService = await clinicserviceService.deactivateClinicService(id);
  // await db.ClinicService.update(
  //   {
  //     status: false,
  //   },
  //   {
  //     where: {
  //       id,
  //     },
  //   }
  // );
  res.json({
    success: true,
    message: `${clinicService.service_name} updated successfully`,
    data: clinicService,
  });
});
export const activateClinicService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clinicService = await clinicserviceService.activateClinicService(id);
  //  await db.ClinicService.update(
  //   {
  //     status: true,
  //   },
  //   {
  //     where: {
  //       id,
  //     },
  //   }
  // );
  res.json({
    success: true,
    message: `${clinicService.service_name} updated successfully`,
    data: clinicService,
  });
});
// @desc deactivate  service items
export const deactiveServiceItem = asyncHandler(async (req, res) => {
  console.log("\n\n bishri \n\n");

  const { id } = req.params;
  // console.log("\n\n" + id + "\n\n");
  const serviceItem = await db.ServiceItem.update(
    {
      status: false,
    },
    {
      where: {
        id,
      },
    }
  );
  res.json(serviceItem);
});
// @desc activate  service items
export const activateServiceItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const serviceItem = await db.ServiceItem.update(
    {
      status: true,
    },
    {
      where: {
        id,
      },
    }
  );
  res.json(serviceItem);
});
export const getLaboratoryService = asyncHandler(async (req, res) => {
  const labcategories = await db.LabTestProfile.findAll({
    include: [
      {
        model: db.PanelUnderpanel,
        as: "underPanels",
      },
      {
        model: db.ServiceItem,
        as: "serviceItem",
        attributes: ["id", "service_name", "serviceCategory_id"],
      },
    ],
  });
  res.json(labcategories);
});
export const getProcedures = asyncHandler(async (req, res) => {
  const service = await db.ClinicService.findOne({
    where: {
      service_name: "procedure",
    },
    include: [
      {
        model: db.ServiceCategory,
        as: "serviceCategory",
      },
    ],
  });
  console.log("\n\n" + service + "\n\n");
  const serviceItems = await db.ServiceItem.findAll({
    where: {
      serviceCategory_id: service.serviceCategory[0].id,
    },
  });
  res.json(serviceItems);
});
// };
