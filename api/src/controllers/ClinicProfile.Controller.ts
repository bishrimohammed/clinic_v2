const db = require("../models");
// import asyncHandler from "express-async-handler";
import { clinicProfileService } from "../services";
import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  updateClinicProfileSchema,
  updateClinicProfileT,
} from "../types/clinic-profile";
import { TypedRequest } from "../types/TypedRequest";
import asyncHandler from "../utils/asyncHandler";
// module.exports = ClinicProfileController = {
export const getClinicProfiles = asyncHandler(async (req, res) => {
  // const clinics = await db.ClinicProfile.findAll({
  //   // include: ["address", "clinicWorkingHours"],
  //   include: [
  //     {
  //       model: db.Address,
  //       as: "address",
  //       include: ["woreda"],
  //     },
  //     {
  //       model: db.Schedule,
  //       as: "clinicWorkingHours",
  //       // attributes: ["day_of_week", "start_time", "end_time"],
  //     },
  //   ],
  // });
  // console.log(clinics);
  // const clinic = clinics ? clinics[0] : undefined;
  const clinic = await clinicProfileService.getClinicDetails();
  // console.log(clinics);
  // console.log(",m,mcs,,bvgcvhsg");
  res.json(clinic);
});
export const getClinicProfileById = asyncHandler(async (req, res) => {
  const clinic = await db.ClinicProfile.findByPk(req.params.id);
  if (!clinic) {
    res.status(404);
    throw new Error("Clinic not Found");
  }
  console.log("dc,mbc,jehcv,qjhvjjjjjjjjjjq");
  res.json(clinic);
});
// req?.user?.id
export const createClinicProfile = asyncHandler(async (req, res) => {
  const {
    name,
    card_valid_date,
    website_url,
    address,
    motto,
    clinicType,
    number_of_branch,
    branch_address,
    brand_color,
  } = req.body;
  // console.log(JSON.parse(req.body.clinc_working_hours));
  // res.status(404).json({ msg: "jhbjhvbh" });
  // return;
  // const logo = req.body.logo;
  const addressData = JSON.parse(address);
  // console.log(addressData.woreda_id);
  // // console.log(req.file.path);
  // res.status(404).json({ msg: "dsdsc" });
  // return;

  const newAddress = await db.Address.create({
    street: addressData.street,
    woreda_id: addressData.woreda_id,
    phone_1: addressData.phone_1,
    phone_2: addressData.phone_2,
    email: addressData.email,
    house_number: addressData.house_number,
  });
  const clinic = await db.ClinicProfile.create(
    {
      name,
      card_valid_date,
      website_url,
      address_id: newAddress.id,
      logo: "uploads/" + req.file?.filename,
      motto,
      clinic_type: clinicType,
      number_of_branch,
      branch_addresses: branch_address,
      brand_color,
      has_triage: req.body?.has_triage,
    },
    { userId: req?.user?.id }
  );
  if (!clinic) {
    await newAddress.destroy();
    res.status(500);
    throw new Error("unable to create clinic profile");
  }
  const CliicWorkingHours = JSON.parse(req.body?.clinc_working_hours);
  // await Promise.all(
  //   CliicWorkingHours.map(async (workHour) => {
  //     return await db.Schedule.create({
  //       clinic_id: clinic.id,
  //       day_of_week: workHour.date_of_week,
  //       start_time: workHour.start_time,
  //       end_time: workHour.end_time,
  //     });
  //   })
  // );
  res.status(201).json(clinic);
});
// updateClinicProfileSchema
// export const updateClinicProfile: RequestHandler = asyncHandler(async (req, res) => {
// const request:TypedRequest<typeof updateClinicProfileSchema> = req
export const updateClinicProfile = asyncHandler<{
  validatedData: typeof updateClinicProfileSchema;
}>(async (req: Request, res: Response, next: NextFunction) => {
  const r = req as TypedRequest<typeof updateClinicProfileSchema>;

  const validatedData = r.validatedData;

  const { id } = req.params;
  const {} = req.body;
  const body = req.body as updateClinicProfileT;
  console.log(body);
  console.log(validatedData);

  // const updatedClinic = await clinicProfileService.updateClinicProfile(
  //   id,
  //   req.body
  // );
  // const addressData = JSON.parse(address);

  // const updatedClinic = await db.ClinicProfile.update(
  //   {
  //     name,
  //     card_valid_date,
  //     website_url,
  //     // address_id: updatedAddress.id,
  //     // logo: req?.files["logo"] && "uploads/" + req.files["logo"][0]?.filename,
  //     // clinic_seal:
  //     //   req.files["clinic_seal"] &&
  //     //   "uploads/" + req.files["clinic_seal"][0]?.filename,
  //     motto,
  //     clinic_type: clinicType,
  //     number_of_branch,
  //     branch_addresses: branch_address,
  //     brand_color,
  //     has_triage: req.body?.has_triage,
  //   },
  //   {
  //     where: {
  //       id,
  //     },
  //     // returning: true,
  //     individualHooks: true,
  //     userId: req?.user?.id,
  //   }
  // );
  // console.log(addressData);
  // await db.Address.update(
  //   {
  //     street: addressData.street,
  //     woreda_id: addressData.woreda_id,
  //     phone_1: addressData.phone_1,
  //     phone_2: addressData.phone_2,
  //     email: addressData.email,
  //     house_number: addressData.house_number,
  //   },
  //   {
  //     where: {
  //       id: addressData.id,
  //     },
  //     // returning: true,
  //     individualHooks: true,
  //     userId: req?.user?.id,
  //   }
  //   // {
  //   //   individualHooks: true,
  //   //   userId: req?.user?.id,
  //   //   // hooks: true,
  //   // }
  // );
  // const CliicWorkingHours = JSON.parse(req.body?.clinc_working_hours);

  // await Promise.all(
  //   CliicWorkingHours.map(async (workHour) => {
  //     return await db.Schedule.update(
  //       {
  //         clinic_id: id,
  //         day_of_week: workHour.date_of_week,
  //         start_time: workHour.start_time,
  //         end_time: workHour.end_time,
  //         doctor_id: null,
  //       },
  //       {
  //         where: {
  //           id: workHour.id,
  //         },
  //         // returning: true,
  //         individualHooks: true,
  //         userId: req?.user?.id,
  //       }
  //       // {
  //       //   userId: req?.user?.id,
  //       // }
  //     );
  //   })
  // );
  res.status(201).json({ success: true, data: validatedData });
});
export const deleteClinicProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedClinic = await db.ClinicProfile.destroy({
    where: {
      id,
    },
    // returning: true,
    individualHooks: true,
    userId: req?.user?.id,
  });
  res.status(201).json(deletedClinic);
});
// };
