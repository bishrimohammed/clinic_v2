import { ClinicService } from "../models";
import { ApiError } from "../shared/error/ApiError";

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
