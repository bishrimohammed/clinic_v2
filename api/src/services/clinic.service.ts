import { ClinicProfile } from "../models";

export const getClinics = async () => {
  const clinic = await ClinicProfile.findOne();

  return clinic;
};
