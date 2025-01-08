import { ClinicService, ServiceCategory } from "../models";
import { ApiError } from "../shared/error/ApiError";
import {
  createClinicServiceT,
  createServiceCategorySchema,
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

export const createClinicService = async (data: createClinicServiceT) => {
  const clinicService = await ClinicService.create(data);
  return clinicService;
};

/**
 *
 * @param id
 * @param data
 * @returns
 */

export const updateClinicService = async (
  id: string,
  data: createClinicServiceT
) => {
  const clinicService = await getClinicServiceById(id);
  const updatedClinicService = await clinicService.update(data);
  // await clinicService.save()
  return updatedClinicService;
};
/**
 *
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
export const activateClinicService = async (id: string) => {
  const clinicService = await getClinicServiceById(id);
  const updatedClinicService = await clinicService.update({ status: true });
  return updatedClinicService;
};

export const deactivateClinicService = async (id: string) => {
  const clinicService = await getClinicServiceById(id);
  const updatedClinicService = await clinicService.update({ status: false });
  return updatedClinicService;
};
// export const getClinicServiceCategories = async () => {
//   const clinicServices = await ClinicService.findAll({
//     include: [
//       {
//         model: ServiceCategory,
//         as: "serviceCategories",
//       },
//     ],
//   });
//   return clinicServices;
// };

// export const getClinicServiceCategoryById = async (id: string) => {
//   const clinicService = await ClinicService.findByPk(id, {
//     include: [
//       {
//         model: ServiceCategory,
//         as: "serviceCategories",
//       },
//     ],
//   });
//   if (!clinicService) {
//     throw new ApiError(404, "Clinic Service is not found");
//   }
//   return clinicService;
// };

export const getServiceCategoryById = async (id: string) => {
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
