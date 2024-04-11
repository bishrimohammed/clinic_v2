const expressAsyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
const { getPaddedName } = require("../utils/getPaddedName");
module.exports = PatientController = {
  getAllPatients: expressAsyncHandler(async (req, res) => {
    const patients = await db.Patient.findAll({
      include: ["patientAssignments"],
    });
    console.log(patients);
    res.status(200).json(patients);
  }),
  getPatients: expressAsyncHandler(async (req, res) => {}),

  searchPatient: expressAsyncHandler(async (req, res) => {
    const { query } = req.query;

    const patients = await db.Patient.findAll({
      include: ["address"],
      // order: [["createdAt", "DESC"]],
      limit: 10,
    });

    res.status(200).json(patients);
  }),
  getPatient: expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
  }),
  createPatient: expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    // return;
    const {
      firstName,
      middleName,
      lastName,
      address,
      gender,
      birth_date,
      is_credit,
      is_dependent,
      is_new,
    } = req.body;
    if (!firstName || !middleName || !gender || !birth_date) {
      res.status(400);
      throw new Error("Add all fields");
    }
    // console.log(address);
    // return;
    // find address either phone_1 or email
    let addressID;

    const addressExits = await db.Address.findOne({
      // where: { [Op.or]: [{ phone_1: address.phone_1, email: address.email }] },
      where: {
        phone_1: address.phone_1,
      },
    });
    console.log(addressExits?.dataValues);
    if (addressExits && !is_dependent) {
      res.status(401);
      throw new Error("Either phone number or email has already exists");
    }
    if (addressExits && is_dependent) {
      addressID = addressExits.id;
    } else {
      const newAddress = await db.Address.create({
        phone_1: address.phone_1,
        phone_2: address.phone_2 ? address.phone_2 : null,
        street: address.street,
        house_number: address.house_number ? address.house_number : null,
        email: address.email ? address.email : null,
        woreda_id: address.woreda_id,
      });
      console.log(newAddress.dataValues);
      addressID = newAddress.id;
      console.log(addressID);
    }
    // console.log(addressID);
    const newPatient = await db.Patient.create({
      firstName,
      middleName,
      lastName,
      address_id: addressID,
      gender,
      birth_date,
      is_credit,
      is_dependent,
      is_new,
      manual_card_id: req.body?.manual_card_id,
    });
    const paddedCardNumber = getPaddedName(newPatient.id, 5, "P");
    newPatient.card_number = paddedCardNumber;
    await newPatient.save();
    res.status(201).json(newPatient);
  }),
  updatePatient: expressAsyncHandler(async (req, res) => {}),
  deletePatient: expressAsyncHandler(async (req, res) => {}),
};
