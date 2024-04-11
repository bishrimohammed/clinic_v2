const db = require("../models");
const asyncHandler = require("express-async-handler");
module.exports = ClinicProfileController = {
  getClinicProfiles: asyncHandler(async (req, res) => {
    const clinics = await db.ClinicProfile.findAll({
      include: ["address", "clinicWorkingHours"],
    });
    // console.log(clinics);
    const clinic = clinics ? clinics[0] : undefined;
    // console.log(clinics);
    // console.log(",m,mcs,,bvgcvhsg");
    res.json(clinic);
  }),
  getClinicProfileById: asyncHandler(async (req, res) => {
    const clinic = await db.ClinicProfile.findByPk(req.params.id);
    if (!clinic) {
      res.status(404);
      throw new Error("Clinic not Found");
    }
    console.log("dc,mbc,jehcv,qjhvjjjjjjjjjjq");
    res.json(clinic);
  }),
  createClinicProfile: asyncHandler(async (req, res) => {
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
    const clinic = await db.ClinicProfile.create({
      name,
      card_valid_date,
      website_url,
      address_id: newAddress.id,
      logo: "uploads/" + req.file.filename,
      motto,
      clinic_type: clinicType,
      number_of_branch,
      branch_addresses: branch_address,
      brand_color,
      has_triage: req.body?.has_triage,
    });
    if (!clinic) {
      await newAddress.destroy();
      res.status(500);
      throw new Error("unable to create clinic profile");
    }
    const CliicWorkingHours = JSON.parse(req.body?.clinc_working_hours);
    await Promise.all(
      CliicWorkingHours.map(async (workHour) => {
        return await db.Schedule.create({
          clinic_id: clinic.id,
          day_of_week: workHour.date_of_week,
          start_time: workHour.start_time,
          end_time: workHour.end_time,
        });
      })
    );
    res.status(201).json(clinic);
  }),
  updateClinicProfile: asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(req.body);
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
    // res.status(404).json({ msg: "sdfss" });
    // return;
    // const { name, card_valid_date, website_url, address } = req.body;
    const addressData = JSON.parse(address);
    console.log(req.body);
    const updatedClinic = await db.ClinicProfile.update(
      {
        name,
        card_valid_date,
        website_url,
        // address_id: updatedAddress.id,
        logo: req.file && "uploads/" + req.file.filename,
        motto,
        clinic_type: clinicType,
        number_of_branch,
        branch_addresses: branch_address,
        brand_color,
        has_triage: req.body?.has_triage,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );
    // console.log(addressData);
    const updatedAddress = await db.Address.update(
      {
        street: addressData.street,
        woreda_id: addressData.woreda_id,
        phone_1: addressData.phone_1,
        phone_2: addressData.phone_2,
        email: addressData.email,
        house_number: addressData.house_number,
      },
      {
        where: {
          id: addressData.id,
        },
      }
    );
    const CliicWorkingHours = JSON.parse(req.body?.clinc_working_hours);
    // console.log(CliicWorkingHours);
    await Promise.all(
      CliicWorkingHours.map(async (workHour) => {
        return await db.Schedule.update(
          {
            // clinic_id: clinic.id,
            day_of_week: workHour.date_of_week,
            start_time: workHour.start_time,
            end_time: workHour.end_time,
          },
          {
            where: {
              id: workHour.id,
            },
          }
        );
      })
    );
    res.status(201).json(updatedClinic);
  }),
  deleteClinicProfile: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedClinic = await db.ClinicProfile.destroy({
      where: {
        id,
      },
    });
    res.status(201).json(deletedClinic);
  }),
};
