import { CreditCompanyProfile } from "../models";
import { ApiError } from "../shared/error/ApiError";

export const getCreditCompanyById = async (companyId: number) => {
  const company = await CreditCompanyProfile.findByPk(companyId);
  if (!company) {
    throw new ApiError(404, "Credit company not found");
  }
  return company;
};
