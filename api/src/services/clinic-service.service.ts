import { Includeable, Op } from "sequelize";
import {
  ClinicService,
  LabTestProfile,
  ServiceCategory,
  ServiceItem,
} from "../models";
import { ApiError } from "../shared/error/ApiError";
import {
  createClinicServiceT,
  createServiceCategorySchema,
  createServiceItemT,
  updateServiceCategorySchema,
} from "../types/clinic-services";

/**
 *
 * @param filter
 * @returns
 */
export const getClinicServices = async (filter: { status?: boolean }) => {
  const clinicServices = await ClinicService.findAll({
    where: filter,
  });
  return clinicServices;
};

export const getClinicServiceById = async (id: string) => {
  const clinicService = await ClinicService.findByPk(id);
  if (!clinicService) {
    throw new ApiError(404, "Clinic Service is not found");
  }
  return clinicService;
};

export const getClinicServiceCategoriesByServiceId = async (
  serviceId: string
) => {
  const clinicService = await getClinicServiceById(serviceId);
  const categories = await clinicService.getServiceCategories();
  return categories;
};

/**
 * Create clinic service
 * @param data
 * @returns {Promise<ClinicService>}
 */
export const createClinicService = async (
  data: createClinicServiceT
): Promise<ClinicService> => {
  const clinicService = await ClinicService.create(data);
  return clinicService;
};

/**
 * Update clinic service
 * @param id
 * @param data
 * @returns {Promise<ClinicService>}
 */

export const updateClinicService = async (
  id: string,
  data: createClinicServiceT
): Promise<ClinicService> => {
  const clinicService = await getClinicServiceById(id);
  const updatedClinicService = await clinicService.update(data);
  // await clinicService.save()
  return updatedClinicService;
};
/**
 * Delete Clinic Service
 * @param id
 * @returns
 */
export const deleteClinicService = async (id: string) => {
  const clinicService = await getClinicServiceById(id);
  await clinicService.destroy();
  return clinicService;
};
/**
 *
 * @param id
 * @returns {Promise<ClinicService>}
 */
export const activateClinicService = async (
  id: string
): Promise<ClinicService> => {
  const clinicService = await getClinicServiceById(id);
  const updatedClinicService = await clinicService.update({ status: true });
  return updatedClinicService;
};

export const deactivateClinicService = async (id: string) => {
  const clinicService = await getClinicServiceById(id);
  const updatedClinicService = await clinicService.update({ status: false });
  return updatedClinicService;
};

//#region  Service category

export const getServiceCategoryById = async (id: string | number) => {
  const serviceCategory = await ServiceCategory.findByPk(id);
  if (!serviceCategory) {
    throw new ApiError(404, "Service Category is not found");
  }
  return serviceCategory;
};

export const createServiceCategory = async (
  clinicService_id: number,
  data: typeof createServiceCategorySchema._type
) => {
  const serviceCategory = await ServiceCategory.create({
    name: data.category_name,
    clinicService_id: clinicService_id,
    has_many_items: false,
  });
  return serviceCategory;
};

export const updateServiceCategory = async (
  id: string,
  data: typeof updateServiceCategorySchema._type
) => {
  const serviceCategory = await getServiceCategoryById(id);
  await serviceCategory.update({
    name: data.category_name,
    clinicService_id: data.clinicService_id,
  });
  return serviceCategory;
};

export const deactivateClinicCategory = async (id: string) => {
  const serviceCategory = await getServiceCategoryById(id);
  await serviceCategory.update({ status: false });
  return serviceCategory;
};
export const activateClinicCategory = async (id: string) => {
  const serviceCategory = await getServiceCategoryById(id);
  await serviceCategory.update({ status: true });
  return serviceCategory;
};

export const deleteServiceCategory = async (id: string) => {
  const serviceCategory = await getServiceCategoryById(id);
  await serviceCategory.destroy();
  return serviceCategory;
};

//#endregion

//#region Service Items
export type serviceItemFilterType = {
  status: "true" | "false" | undefined;
  price: "0 - 100" | "100 - 500" | "500+" | undefined;
  serviceCategory: string[] | undefined;
};

export const getServiceItemById = async (
  id: string,
  includeOptions?: Includeable | Includeable[]
) => {
  const serviceItem = await ServiceItem.findByPk(id, {
    include: includeOptions,
  });
  if (!serviceItem) {
    throw new ApiError(404, "Service Item is not found");
  }
  return serviceItem;
};

/**
 *
 * @param {serviceItemFilterType} query
 */

export const getServiceItems = async (query: serviceItemFilterType) => {
  // finish the code
  const whereClause: any = {};

  // Handle status filter
  if (query.status) {
    whereClause.status = query.status === "true"; // Convert to boolean
  }

  // Handle price filter
  if (query.price) {
    switch (query.price) {
      case "0 - 100":
        whereClause.price = { [Op.between]: [0, 100] };
        break;
      case "100 - 500":
        whereClause.price = { [Op.between]: [100, 500] };
        break;
      case "500+":
        whereClause.price = { [Op.gt]: 500 };
        break;
    }
  }

  // Handle service category filter
  if (query.serviceCategory && query.serviceCategory.length > 0) {
    whereClause.serviceCategory_id = {
      [Op.in]: query.serviceCategory,
    };
  }

  const serviceItems = await ServiceItem.findAll({
    where: whereClause,
    include: [
      {
        model: LabTestProfile,
        as: "labTestProfile",
      },
    ],
  });
  return serviceItems;
};
/**
 * Create clinic service
 * @param   {createServiceItemT} data
 * @returns {Promise<ServiceItem>}
 */
export const createServiceItem = async (
  clinicService_id: string,
  data: createServiceItemT
): Promise<ServiceItem> => {
  const { isFixed, isLab, item_name, price, serviceCategory_id, lab, unit } =
    data;
  const clinicService = await getClinicServiceById(clinicService_id);
  if (!(await clinicService.hasServiceCategory(serviceCategory_id))) {
    const category = await getServiceCategoryById(serviceCategory_id);
    throw new ApiError(
      400,
      `${clinicService.service_name} doesn't not have ${category.name} category`
    );
  }
  const serviceItem = await ServiceItem.create({
    service_name: item_name,
    price,
    isFixed,
    serviceCategory_id,
    unit,
  });
  if (isLab && lab) {
    // console.log("it is lab");
    if (!clinicService.is_laboratory) {
      await serviceItem.destroy();
      throw new ApiError(
        400,
        `Service catagory(${serviceCategory_id}) is not laboratory service`
      );
    }
    await serviceItem.createLabTestProfile({
      isPanel: lab.isPanel,
      labTest_id: serviceItem.id,
    });
    if (lab.isPanel) {
      await serviceItem.addUnderPanels(lab.underPanels);
    }
  }
  return serviceItem;
  // } else {
  //   throw new ApiError(
  //     400,
  //     `${clinicService.service_name} doesn't not have ${serviceCategory_id} category`
  //   );
  // }
};

export const updateServiceItem = async (
  clinicService_id: string,
  item_id: string,
  data: createServiceItemT
): Promise<ServiceItem> => {
  const { isFixed, isLab, item_name, price, serviceCategory_id, lab, unit } =
    data;
  const serviceItem = await getServiceItemById(item_id);
  const clinicService = await getClinicServiceById(clinicService_id);
  if (!(await clinicService.hasServiceCategory(serviceCategory_id))) {
    const category = await getServiceCategoryById(serviceCategory_id);
    throw new ApiError(
      400,
      `${clinicService.service_name} doesn't not have ${category.name} category`
    );
  }

  if (isLab && lab) {
    if (!clinicService.is_laboratory) {
      const category = await getServiceCategoryById(serviceCategory_id);
      throw new ApiError(
        400,
        `Service catagory(${category.name}) is not laboratory service`
      );
    }

    const labTestProfile = await serviceItem.getLabTestProfile();
    if (labTestProfile) {
      if (labTestProfile.isPanel) {
        await serviceItem.setUnderPanels([]);
      }
      await labTestProfile.update({
        isPanel: lab.isPanel,
      });
    } else {
      await serviceItem.createLabTestProfile({
        isPanel: lab.isPanel,
        labTest_id: serviceItem.id,
      });
    }

    if (lab.isPanel) {
      await serviceItem.addUnderPanels(lab.underPanels);
    }
  }
  await serviceItem.update({
    service_name: item_name,
    price,
    isFixed,
    serviceCategory_id,
    unit,
  });
  // await serviceItem({})
  return serviceItem;
};
export const getServiceItemsByClinicServiceId = async (
  clinicService_id: string,
  query: serviceItemFilterType
) => {
  // finish the code
  const whereClause: any = {};

  // Handle status filter
  if (query.status) {
    whereClause.status = query.status === "true"; // Convert to boolean
  }

  // Handle price filter
  if (query.price) {
    switch (query.price) {
      case "0 - 100":
        whereClause.price = { [Op.between]: [0, 100] };
        break;
      case "100 - 500":
        whereClause.price = { [Op.between]: [100, 500] };
        break;
      case "500+":
        whereClause.price = { [Op.gt]: 500 };
        break;
    }
  }

  // Handle service category filter
  const clinicService = await getClinicServiceById(clinicService_id);
  const categories = await clinicService.getServiceCategories();
  const serviceCategoryIds = categories.map((c) => c.id);

  if (query.serviceCategory && query.serviceCategory.length > 0) {
    whereClause.serviceCategory_id = {
      [Op.in]: query.serviceCategory,
    };
  } else {
    whereClause.serviceCategory_id = {
      [Op.in]: serviceCategoryIds,
    };
  }

  const serviceItems = await ServiceItem.findAll({
    where: whereClause,
    include: [
      {
        model: ServiceCategory,
        as: "category",
        attributes: ["id", "name", "status"],
      },
    ],
  });
  return serviceItems;
};

export const deactivateServiceItem = async (id: string) => {
  const serviceItem = await getServiceItemById(id);
  await serviceItem.update({ status: false });
  return serviceItem;
};
export const activateServiceItem = async (id: string) => {
  const serviceItem = await getServiceItemById(id);
  await serviceItem.update({ status: true });
  return serviceItem;
};
export const getRegistationFeeServiceItem = async () => {
  // Registration Fee
  const clinicservice = await ClinicService.findOne({
    where: { is_registration: true },
  });
  if (!clinicservice) {
    throw new ApiError(404, "Registration Card service is not found");
  }
  const category = await ServiceCategory.findOne({
    where: { clinicService_id: clinicservice.id },
  });
  if (!category) {
    throw new ApiError(404, "Registration Card service category is not found");
  }
  const serviceItem = await ServiceItem.findOne({
    where: { serviceCategory_id: category.id },
  });
  if (!serviceItem) {
    throw new ApiError(404, "Registration Card service item is not found");
  }
  return serviceItem;
};
//#endregion
