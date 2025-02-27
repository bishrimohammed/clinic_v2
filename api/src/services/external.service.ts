import { ExternalService } from "../models";
import { ApiError } from "../shared/error/ApiError";

export const getExternalServiceById = async (id: string) => {
  const externalService = await ExternalService.findByPk(id);
  if (!externalService) {
    throw new ApiError(404, "External service not found");
  }
  return externalService;
};
