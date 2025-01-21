import { addressService, scheduleService } from ".";
import {
  City,
  ClinicProfile,
  Region,
  Schedule,
  SubCity,
  Woreda,
} from "../models";
import Address from "../models/address/Address";
import { ApiError } from "../shared/error/ApiError";
import { updateClinicProfileT } from "../types/clinic-profile";

export const getClinicDetails = async () => {
  const clinic = await ClinicProfile.findOne({
    include: [
      {
        model: Address,
        as: "address",
        include: [
          {
            model: Woreda,
            as: "woreda",
            include: [
              {
                model: SubCity,
                as: "subcity",
                include: [
                  {
                    model: City,
                    as: "city",
                    include: [
                      {
                        model: Region,
                        as: "region",
                        attributes: ["id", "name"],
                      },
                    ],
                    attributes: ["id", "name"],
                  },
                ],
                attributes: ["id", "name"],
              },
            ],
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: Schedule,
        as: "workinghours",
        attributes: ["id", "day_of_week", "end_time", "start_time"],
      },
    ],
  });
  return clinic;
};

export const getClinicProfileById = async (id: string) => {
  const clinicProfile = await ClinicProfile.findByPk(id);
  if (!clinicProfile) {
    throw new ApiError(404, "clinic Profile not found");
  }
  return clinicProfile;
};
export const getClinicInfo = async () => {
  const clinicProfile = await ClinicProfile.findOne();
  if (!clinicProfile) {
    throw new ApiError(404, "clinic Profile not found");
  }
  return clinicProfile;
};

export const updateClinicProfile = async (
  id: string,
  data: updateClinicProfileT
) => {
  const {
    address,
    name,
    logo,
    card_valid_date,
    has_triage,
    clinic_type,
    motto,
    website_url,
    brand_color,
  } = data;
  // const clinicProfile = await getClinicProfileById(id);
  const updatedAdress = await addressService.updateAddress(
    address.id!,
    address
  );
  await Promise.all(
    data.working_hours.map((workHour) => {
      return scheduleService.updateWorkingHour(workHour);
    })
  );
  const updatedClinicProfile = await ClinicProfile.update(
    {
      name,
      brand_color,
      card_valid_date,
      clinic_type,
      has_triage,
      motto,
      website_url,
    },
    {
      where: {
        id: id,
      },
    }
  );

  return updatedClinicProfile;
};
