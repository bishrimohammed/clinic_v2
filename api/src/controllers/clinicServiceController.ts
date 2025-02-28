import { RequestHandler } from "express";

// import asyncHandler from "express-async-handler";
import {
  ClinicService,
  LabTestProfile,
  ServiceCategory,
  ServiceItem,
} from "../models";
import { clinicserviceService } from "../services";
import asyncHandler from "../utils/asyncHandler";
import {
  createClinicServiceSchema,
  createClinicServiceT,
  createServiceCategorySchema,
  createServiceItemSchema,
  createServiceItemT,
  updateClinicServiceSchema,
  updateServiceCategorySchema,
} from "../types/clinic-services";
import { ApiError } from "../shared/error/ApiError";
const db = require("../models");
import { Op } from "sequelize";
import { serviceItemFilterType } from "../services/clinic-service.service";

/**
 * @desc get clinic services
 * @route GET /api/v1/clinic-services
 * @access Public
 * @returns {ClinicService[]}
 *
 */
export const getClinicServices = asyncHandler(async (req, res) => {
  const { status } = req.query as { status: "true" | "false" | undefined };
  let filter: { status?: boolean } = {};

  if (status) {
    filter = { status: status === "true" };
  }

  const clinicServices = await clinicserviceService.getClinicServices(filter);
  res.json(clinicServices);
});

/**
 * @desc get clinic service by id
 * @route GET /api/v1/clinic-services/:id/service-category
 * @access Public
 * @returns {ServiceCategory[]}
 */

export const getClinicServiceCategoriesByServiceId = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    const serviceCategories =
      await clinicserviceService.getClinicServiceCategoriesByServiceId(id);
    res.json(serviceCategories);
  }
);
/**
 * @desc get service category by id
 * @route GET /api/v1/clinic-services/service-category/:category_id
 * @access Public
 * @returns {ServiceCategory}
 */
export const getServiceCategoryById = asyncHandler(async (req, res) => {
  // export const getClinicServiceCategoriesByServiceId = asyncHandler(async (req, res) => {
  const { category_id } = req.params;

  const serviceCategory = await clinicserviceService.getServiceCategoryById(
    category_id
  );
  res.json(serviceCategory);
});
/**
 * @desc create  clinic service category
 * @route POST /api/v1/clinic-services/:id/service-category
 * @access Public
 * @returns {ServiceCategory}
 */
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
/**
 * @desc update service category
 * @route PUT /api/v1/clinic-services/service-category/:category_id
 * @access Public
 * @returns {ServiceCategory}
 */
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
/**
 * @desc activate service category
 * @route PUT /api/v1/clinic-services/service-category/:category_id/activate
 * @access Public
 * @returns {ServiceCategory}
 */
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

/**
 * @desc deactivate service category
 * @route PUT /api/v1/clinic-services/service-category/:category_id/deactivate
 * @access Public
 * @returns {ServiceCategory}
 */
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
/**
 * @desc delete service category
 * @route DELETE /api/v1/clinic-services/service-category/:category_id
 * @access Public
 * @returns {ServiceCategory}
 */
export const deleteServiceCategory = asyncHandler(async (req, res) => {
  const { category_id } = req.params;
  const serviceGroup = await clinicserviceService.deleteServiceCategory(
    category_id
  );
  res.json(serviceGroup);
});
/**
 * @desc get service item by id
 * @route GET /api/v1/clinic-services/service-items/:item_id
 * @access Public
 * @returns {ServiceItem}
 */
export const getServiceItemById = asyncHandler(async (req, res) => {
  const { item_id } = req.params;

  const serviceItem = await clinicserviceService.getServiceItemById(item_id, [
    {
      model: ServiceItem,
      as: "underPanels",
      attributes: ["id", "service_name"],
    },
    {
      model: LabTestProfile,
      as: "labTestProfile",
    },
  ]);
  res.json({
    success: true,
    // message: `${serviceItem.service_name} updated successfully`,
    data: serviceItem,
  });
});
/**
 * @desc get service items
 * @route GET /api/v1/clinic-services/service-items
 * @access Public
 * @returns {ServiceItem[]}
 */
export const getServiceItems = asyncHandler(async (req, res) => {
  const query = req.query as serviceItemFilterType;
  const serviceItems = await clinicserviceService.getServiceItems(query);
  res.json({
    success: true,
    data: serviceItems,
  });
});
/**
 * @desc get service items by clinic service id
 * @route GET /api/v1/clinic-services/:id//service-items
 * @access Public
 * @returns {ServiceItem[]}
 */
export const getServiceItemsByClinicServiceId = asyncHandler(
  async (req, res) => {
    const { id: clinicService_id } = req.params;
    const query = req.query as serviceItemFilterType;
    // console.log(req.params);

    const serviceItems =
      await clinicserviceService.getServiceItemsByClinicServiceId(
        clinicService_id,
        query
      );
    res.json({
      success: true,
      data: serviceItems,
    });
  }
);
/**
 * @desc Get service item
 */
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
/**
 * @desc create service item
 * @route POST /api/v1/clinic-services/:id/service-items
 * @access Public
 * @returns {ServiceItem}
 */
export const createServiceItems = asyncHandler<{
  validatedData: typeof createServiceItemSchema._type;
}>(async (req, res) => {
  const { id } = req.params;
  const validatedData = req.validatedData;
  const serviceCategory = await clinicserviceService.getServiceCategoryById(
    validatedData.serviceCategory_id
  );
  const totaltServiceCategories = await serviceCategory.countItems();

  if (!serviceCategory.has_many_items && totaltServiceCategories > 0) {
    throw new ApiError(
      400,
      `${serviceCategory.name} already has ${totaltServiceCategories} service Items`
    );
  }

  const serviceItem = await clinicserviceService.createServiceItem(
    id,
    validatedData
  );
  res.status(201).json({
    success: true,
    message: `${validatedData.item_name} created successfully`,
    data: serviceItem,
  });
});
/**
 * @desc update service item
 * @route PUT /api/v1/clinic-services/:id/service-items/:item_id
 * @access Public
 * @returns {ServiceItem}
 */
export const updateServiceItems = asyncHandler<{
  validatedData: createServiceItemT;
}>(async (req, res) => {
  const { id, item_id } = req.params;
  // const { service_name, price, unit, isFixed, islab, lab } = req.body;
  // console.log(req.validatedData);
  const serviceItem = await clinicserviceService.updateServiceItem(
    id,
    item_id,
    req.validatedData
  );
  // return;
  // const labServiceItem = await db.ServiceItem.update(
  //   {
  //     service_name: service_name,
  //     price,
  //     isFixed: isFixed,
  //     // is_laboratory: true,
  //     unit: unit,
  //     serviceCategory_id: parseInt(req.body.serviceGroup),
  //   },
  //   { where: { id: item_id } }
  // );
  // if (islab) {
  //   const labProfile = await db.LabTestProfile.findOne({
  //     where: { labTest_id: item_id },
  //   });

  //   // console.log(labProfile);
  //   // return;
  //   // const labProfile = await db.LabTestProfile.update(
  //   //   {
  //   //     isPanel: lab.isPanel,
  //   //     isFixed: lab.isFixed,
  //   //   },
  //   //   { where: { labTest_id: id } }
  //   // );
  //   // const labs = await db.ServiceItem.findAll({
  //   //   where: { id: lab}
  //   const lbProfiles = await db.LabTestProfile.findAll(
  //     // { parentId: labProfile.id },
  //     {
  //       where: {
  //         labTest_id: { [db.Sequelize.Op.in]: lab?.childService || [] },
  //       },
  //     }
  //   );
  //   const lbProfileIds = lbProfiles.map((p: any) => p.id);
  //   console.log(lbProfileIds);
  //   console.log(lab.childService);
  //   if (lab.underPanel && labProfile.isPanel) {
  //     // console.log(lbProfileIds);
  //     console.log("hello");
  //     await db.PanelUnderpanel.destroy({
  //       where: {
  //         panel_id: labProfile.id,
  //         // underpanel_id: labProfile.underPanel.id
  //       },
  //     });

  //     // const panel = await labProfile.addUnderPanel(lbProfileIds);
  //   } else if (lab.isPanel && labProfile.isPanel) {
  //     // console.log(lbProfileIds);
  //     await db.PanelUnderpanel.destroy({
  //       where: {
  //         panel_id: labProfile.id,
  //         // underpanel_id: labProfile.underPanel.id
  //       },
  //     });
  //     await Promise.all(
  //       lbProfileIds.map((id: number) => {
  //         return db.PanelUnderpanel.create({
  //           panel_id: labProfile.id,
  //           underpanel_id: id,
  //         });
  //       })
  //     );
  //   } else if (lab.isPanel && !labProfile.isPanel) {
  //     console.log("\n\nunderpanel to panel\n\n");
  //     await Promise.all(
  //       lbProfileIds.map((id: number) => {
  //         return db.PanelUnderpanel.create({
  //           panel_id: labProfile.id,
  //           underpanel_id: id,
  //         });
  //       })
  //     );
  //   }
  //   labProfile.isPanel = lab.isPanel;
  //   labProfile.isFixed = isFixed;
  //   await labProfile.save();
  // }
  res.json({ success: true, data: serviceItem });
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

/**
 * @desc get clinic service by id
 * @route GET /api/clinic-services/:id
 * @access Public
 * @returns {ClinicService}
 */
export const getClinicServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clinicService = await clinicserviceService.getClinicServiceById(id);

  res.json({
    success: true,

    data: clinicService,
  });
});

/**
 * @desc create clinic service
 * @route POST /api/clinic-services
 * @access Private
 * @returns {ClinicService}
 */
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

/**
 * @desc update clinic service
 * @route PUT /api/clinic-services/:id
 * @access Private
 * @returns {ClinicService}
 */

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
/**
 * @desc deactivate clinic service
 * @route Patch /api/v1/clinic-services/:id/deactivate
 * @access Private
 * @returns {ClinicService}
 */
export const deactiveClinicService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clinicService = await clinicserviceService.deactivateClinicService(id);

  res.json({
    success: true,
    message: `${clinicService.service_name} deactivated successfully`,
    data: clinicService,
  });
});
/**
 * @desc activate clinic service
 * @route Put /api/v1/clinic-services/:id/activate
 * @access Private
 * @returns {ClinicService}
 */
export const activateClinicService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clinicService = await clinicserviceService.activateClinicService(id);

  res.json({
    success: true,
    message: `${clinicService.service_name} activated successfully`,
    data: clinicService,
  });
});
/**
 * @desc deactivate service item
 * @route Put /api/v1/clinic-services/service-items/:item_id/deactivate
 * @access Private
 * @returns {ServiceItem}
 *
 */
export const deactivateServiceItem = asyncHandler(async (req, res) => {
  const { item_id } = req.params;

  const serviceItem = await clinicserviceService.deactivateServiceItem(item_id);
  res.json({
    success: true,
    message: `${serviceItem.service_name} deactivated successfully`,
    data: serviceItem,
  });
});
/**
 * @desc activate service item
 * @route Put /api/v1/clinic-services/service-items/:item_id/activate
 * @access Private
 * @returns {ServiceItem}
 */
export const activateServiceItem = asyncHandler(async (req, res) => {
  const { item_id } = req.params;
  const serviceItem = await clinicserviceService.activateServiceItem(item_id);
  res.json({
    success: true,
    message: `${serviceItem.service_name} activated successfully`,
    data: serviceItem,
  });
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
