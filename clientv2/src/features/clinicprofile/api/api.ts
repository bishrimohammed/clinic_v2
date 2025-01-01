import API from "@/lib/axios-client";
import { clinicProfileResType } from "../schemas";

export const getClinicProfile = async () => {
  return await API.get<clinicProfileResType>("/clinic-profiles").then(
    (res) => res.data
  );
};
