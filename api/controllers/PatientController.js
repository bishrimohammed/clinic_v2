const expressAsyncHandler = require("express-async-handler");
const db = require("../models");
const { Op, where } = require("sequelize");
const { getPaddedName } = require("../utils/getPaddedName");
module.exports = PatientController = {
  getAllPatients: expressAsyncHandler(async (req, res) => {
    console.log(req.query);
    let where = {};
    if (req.query.status !== "") {
      if (req.query.status === "true") {
        where.status = true;
      } else if (req.query.status === "false") {
        where.status = false;
      }
    }
    if (req.query.is_credit) {
      if (req.query.is_credit === "true") {
        where.is_credit = true;
      } else if (req.query.is_credit === "false") {
        where.is_credit = false;
      }
      // where.is_credit = Boolean(req.query.is_credit);
    }
    if (req.query.is_new) {
      if (req.query.is_new === "true") {
        where.is_new = true;
      } else if (req.query.is_new === "false") {
        where.is_new = false;
      }
      // where.is_new = Boolean(req.query.is_new);
    }
    if (req.query.gender !== "") {
      where.gender = req.query.gender;
    }
    const patients = await db.Patient.findAll({
      where: where,
      include: [
        {
          model: db.Address,
          as: "address",
          attributes: ["id", "phone_1"],
        },
      ],
      attributes: [
        "id",
        "firstName",
        "lastName",
        "middleName",
        "gender",
        "birth_date",
        "has_phone",
        "phone",
        "status",
      ],
    });
    // console.log(patients);
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
    console.log("\n\nlkhljgfxdgchjgcf\n\n");
    const address = {
      model: db.Address,
      as: "address",
      include: [
        {
          model: db.Woreda,
          as: "woreda",
          attributes: ["id", "name"],
          include: [
            {
              model: db.SubCity,
              as: "SubCity",
              attributes: ["id", "subCity_name"],
              include: [
                {
                  model: db.City,
                  as: "city",
                  attributes: ["id", "name"],
                  include: [
                    {
                      model: db.Region,
                      as: "region",
                      attributes: ["id", "name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    // const EmergencyAddress = address;

    const patient = await db.Patient.findOne({
      where: { id: id },
      include: [
        address,
        {
          model: db.CreditCompanyProfile,
          as: "creditCompany",
          attributes: ["id", "name", "tin", "phone"],
        },
        {
          model: db.EmergencyContact,
          as: "emergencyContact",
          // include: [{ ...address }],
          attributes: [
            "id",
            "firstName",
            "lastName",
            "middleName",
            "relationship",
            "phone",
          ],
          include: [
            {
              model: db.Address,
              as: "address",
              include: [
                {
                  model: db.Woreda,
                  as: "woreda",
                  attributes: ["id", "name"],
                  include: [
                    {
                      model: db.SubCity,
                      as: "SubCity",
                      attributes: ["id", "subCity_name"],
                      include: [
                        {
                          model: db.City,
                          as: "city",
                          attributes: ["id", "name"],
                          include: [
                            {
                              model: db.Region,
                              as: "region",
                              attributes: ["id", "name"],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (!patient) {
      res.status(404);
      throw new Error("Patient not found");
    }
    let Patient;
    if (patient.is_credit) {
      const agreements = await db.CreditAgreement.findAll({
        where: {
          company_id: patient?.company_id,
        },
        attributes: ["id"],
      });
      // console.log(agreements);
      const agreement = agreements?.map((a) => a.id);
      console.log(agreement);
      const employee = await db.CreditPatient.findOne({
        where: {
          patient_id: patient.id,
          agreement_id: agreement,
        },
      });
      // patient = { ...patient, employeeId: employee?.employee_id };
      Patient = { ...patient.dataValues, employeeId: employee?.employee_id };
    } else {
      Patient = patient.dataValues;
    }
    // const patient = await db.Patient.findByPk(1);
    // console.log(patient);
    // const pp = JSON.parse(patient);
    // console.log(patient);
    const PATIENT = !patient.is_credit
      ? patient
      : { ...patient.dataValues, hello: "kjhljhgkut" };
    console.log(JSON.stringify(PATIENT));
    // patient.hello = "kjhljhgkut";
    res.json(Patient);
  }),
  createPatient: expressAsyncHandler(async (req, res) => {
    const { patient, address, emergency, company_id, employeeId } = req.body;
    // console.log(req.body);
    // return;
    const patientParsed = JSON.parse(patient);
    const addressParsed = JSON.parse(address);
    const emergencyParsed = JSON.parse(emergency);

    if (patientParsed.has_phone) {
      const patient = await db.Patient.findOne({
        where: {
          phone: patientParsed.phone,
        },
      });
      if (patient) {
        res.status(400);
        throw new Error("Patient Phone number already exists");
      }
    }
    let addressID;

    // const addressExits = await db.Address.findOne({
    //   // where: { [Op.or]: [{ phone_1: address.phone_1, email: address.email }] },
    //   where: {
    //     phone_1: address.phone_1,
    //   },
    // });
    // console.log(addressExits?.dataValues);
    // if (addressExits && !is_dependent) {
    //   res.status(401);
    //   throw new Error("Either phone number or email has already exists");
    // }
    let newAddress;
    if (patientParsed.is_credit) {
      const employee = await db.CompanyEmployee.findOne({
        where: {
          id: parseInt(employeeId),
        },
      });
      if (!employee) {
        res.status(400);
        throw new Error("Employee not found");
      }
      addressID = employee.address_id;
    } else {
      newAddress = await db.Address.create({
        phone_1: patientParsed.has_phone
          ? patientParsed.phone
          : emergencyParsed.phone,
        phone_2: addressParsed.phone_2 ? addressParsed.phone_2 : null,
        street: addressParsed.street,
        house_number: addressParsed.house_number
          ? addressParsed.house_number
          : null,
        email: addressParsed.email ? addressParsed.email : null,
        woreda_id: addressParsed.woreda_id,
      });
      addressID = newAddress.id;
    }

    let EmergencyContactAddress;
    if (!emergencyParsed.the_same_address_as_patient) {
      if (!patientParsed.is_credit) {
        await newAddress?.destroy();
      }
      EmergencyContactAddress = await db.Address.create({
        phone_1: emergencyParsed.phone,
        phone_2: emergencyParsed.phone_2 ? emergencyParsed.phone_2 : null,
        street: emergencyParsed.street,
        house_number: emergencyParsed.house_number
          ? emergencyParsed.house_number
          : null,
        email: emergencyParsed.email ? emergencyParsed.email : null,
        woreda_id: emergencyParsed.woreda_id,
      });
    }
    const EmergencyContact = await db.EmergencyContact.create({
      firstName: emergencyParsed.firstName,
      lastName: emergencyParsed.lastName,
      middleName: emergencyParsed.middleName,
      phone: emergencyParsed.phone,
      relationship:
        emergencyParsed.relation !== "Other"
          ? emergencyParsed.relation
          : emergencyParsed.other_relation,
      address_id: emergencyParsed.the_same_address_as_patient
        ? addressID
        : EmergencyContactAddress.id,
    });
    // console.log(addressID);

    const newPatient = await db.Patient.create({
      firstName: patientParsed.firstName,
      middleName: patientParsed.middleName,
      lastName: patientParsed.lastName,
      address_id: emergencyParsed.the_same_address_as_patient
        ? addressID
        : EmergencyContactAddress.id,
      gender: patientParsed.gender,
      has_phone: patientParsed.has_phone,
      phone: patientParsed.has_phone ? patientParsed.phone : null,
      birth_date: patientParsed.birth_date,
      is_credit: patientParsed.is_credit,
      is_new: patientParsed.is_new,
      manual_card_id: !patientParsed.is_new
        ? patientParsed?.manual_card_id
        : null,
      marital_status: patientParsed.marital_status,
      guardian_name: patientParsed.guardian_name,
      occupation: patientParsed.occupation,
      company_id: patientParsed.is_credit ? company_id : null,
      emergence_contact_id: EmergencyContact.id,
      empoyeeId_url:
        patientParsed.is_credit &&
        "uploads/" + req.files["employeeId_doc"][0]?.filename,
    });
    const paddedCardNumber = getPaddedName(newPatient.id, 5, "P");
    newPatient.card_number = paddedCardNumber;
    await newPatient.save();
    if (!newPatient) {
      emergencyParsed.the_same_address_as_patient
        ? await newAddress.destroy()
        : await EmergencyContactAddress.destroy();
      res.status(400);
      throw new Error("Failed to create patient");
    }
    const activeAgreenent = await db.CreditAgreement.findOne({
      where: {
        company_id: company_id,
        status: true,
      },
    });
    if (!activeAgreenent) {
      res.status(400);
      throw new Error("Company doesn't have active agreement");
    }
    const newCreditPatient = await db.CreditPatient.create({
      patient_id: newPatient.id,
      employee_id: employeeId,
      agreement_id: activeAgreenent.id,
    });
    if (patientParsed.is_credit && req.files["letter_doc"]) {
      await db.CreditPatientAttachment.create({
        creditPatient_id: newCreditPatient.id,
        letter_doc: "uploads/" + req.files["letter_doc"][0].filename,
      });
    }
    res.status(201).json(newPatient);
  }),
  updatePatient: expressAsyncHandler(async (req, res) => {
    // console.log("\n\nupdatePatient\n\n");
    const { id } = req.params;
    console.log(req.body);
    // return;
    const { patient, address, emergency, company_id, employeeId } = req.body;
    // console.log(req.body);
    // return;
    const patientParsed = JSON.parse(patient);
    const addressParsed = JSON.parse(address);
    const emergencyParsed = JSON.parse(emergency);
    const ExistingPatient = await db.Patient.findByPk(id);
    if (!ExistingPatient) {
      res.status(404);
      throw new Error("Patient not found");
    }

    const ExistingEmergencyContact = await db.EmergencyContact.findByPk(
      emergencyParsed.id
    );
    if (!ExistingEmergencyContact) {
      res.status(404);
      throw new Error("Emergency contact not found");
    }
    console.log(ExistingPatient?.dataValues);
    console.log(ExistingEmergencyContact?.dataValues);

    if (
      ExistingPatient.address_id === ExistingEmergencyContact.address_id &&
      !emergencyParsed.the_same_address_as_patient
    ) {
      console.log("from the same address to different");

      //    await db.Address.destroy({
      //   where: {
      //     id: ExistingEmergencyContact.address_id,
      //   },
      // });

      if (patientParsed.is_credit) {
        const employee = await db.CompanyEmployee.findOne({
          where: {
            employee_id: employeeId,
          },
        });
        if (!employee) {
          res.status(404);
          throw new Error("Employee not found");
        }

        ExistingPatient.address_id = employee.address_id;
      } else {
        await db.Address.update(
          {
            phone_1: patientParsed.phone,

            phone_2: addressParsed.phone_2 ? addressParsed.phone_2 : null,
            street: addressParsed.street,
            house_number: addressParsed.house_number
              ? addressParsed.house_number
              : null,
            email: addressParsed.email ? addressParsed.email : null,
            woreda_id: addressParsed.woreda_id,
          },
          {
            where: {
              id: ExistingPatient.address_id,
            },
          }
        );
        // patientAddress = newPatientAddress.id;
      }

      const newEmergencyAddress = await db.Address.create(
        {
          phone_1: emergencyParsed.phone,
          phone_2: null,
          street: emergencyParsed.street,
          house_number: emergencyParsed.house_number
            ? emergencyParsed.house_number
            : null,
          email: emergencyParsed.email ? emergencyParsed.email : null,
          woreda_id: emergencyParsed.woreda_id,
        }
        // {
        //   where: {
        //     id: ExistingEmergencyContact.address_id,
        //   },
        // }
      );
      ExistingEmergencyContact.address_id = newEmergencyAddress.id;
    }
    if (
      ExistingPatient.address_id !== ExistingEmergencyContact.address_id &&
      emergencyParsed.the_same_address_as_patient
    ) {
      console.log("from different address to the same");
      let EmergencyAddressId = ExistingEmergencyContact.address_id;
      ExistingEmergencyContact.address_id = ExistingPatient.address_id;
      await ExistingEmergencyContact.save();

      await db.Address.update(
        {
          phone_1: patientParsed.has_phone
            ? patientParsed.phone
            : emergencyParsed.phone,

          phone_2: addressParsed.phone_2 ? addressParsed.phone_2 : null,
          street: addressParsed.street,
          house_number: addressParsed.house_number
            ? addressParsed.house_number
            : null,
          email: addressParsed.email ? addressParsed.email : null,
          woreda_id: addressParsed.woreda_id,
        },
        {
          where: {
            id: ExistingPatient.address_id,
          },
        }
      );
      await db.Address.destroy({
        where: {
          id: EmergencyAddressId,
        },
      });
    }
    console.log(typeof patientParsed.is_credit);
    if (
      ExistingEmergencyContact.address_id === ExistingPatient.address_id &&
      emergencyParsed.the_same_address_as_patient
    ) {
      console.log("from the same address to the same");
      await db.Address.update(
        {
          phone_1: patientParsed.has_phone
            ? patientParsed.phone
            : emergencyParsed.phone,
          phone_2: null,
          street: patientParsed.street,
          house_number: patientParsed.house_number
            ? patientParsed.house_number
            : null,
          email: patientParsed.email ? patientParsed.email : null,
          woreda_id: patientParsed.woreda_id,
        },
        {
          where: {
            id: ExistingPatient.address_id,
          },
        }
      );
    }
    if (
      ExistingEmergencyContact.address_id !== ExistingPatient.address_id &&
      !emergencyParsed.the_same_address_as_patient
    ) {
      console.log("from different address to different");
      await db.Address.update(
        {
          phone_1: patientParsed.phone,

          phone_2: null,
          street: patientParsed.street,
          house_number: patientParsed.house_number
            ? patientParsed.house_number
            : null,
          email: patientParsed.email ? patientParsed.email : null,
          woreda_id: patientParsed.woreda_id,
        },
        {
          where: {
            id: ExistingPatient.address_id,
          },
        }
      );
      await db.Address.update(
        {
          phone_1: emergencyParsed.phone,
          phone_2: null,
          street: emergencyParsed.street,
          house_number: emergencyParsed.house_number
            ? emergencyParsed.house_number
            : null,
          email: emergencyParsed.email ? emergencyParsed.email : null,
          woreda_id: emergencyParsed.woreda_id,
        },
        {
          where: {
            id: ExistingEmergencyContact.address_id,
          },
        }
      );
    }
    console.log(req.files["employeeId_doc"]);
    // if (ExistingPatient.is_credit && !patientParsed.is_credit) {
    //   console.log("patient is credit and now is not");
    //   await db.CreditPatient.update(
    //     {
    //       status: false,
    //     },
    //     {
    //       where: {
    //         patient_id: ExistingPatient.id,
    //       },
    //     }
    //   );
    // }
    // if (!ExistingPatient.is_credit && patientParsed.is_credit) {
    //   console.log("patient is not credit and now is credit");

    //   const activeAgreenent = await db.CreditAgreement.findOne({
    //     where: {
    //       company_id: company_id,
    //       status: true,
    //     },
    //   });
    //   if (!activeAgreenent) {
    //     res.status(400);
    //     throw new Error("Company doesn't have active agreement");
    //   }
    //   const newCreditPatient = await db.CreditPatient.create({
    //     patient_id: ExistingPatient.id,
    //     employee_id: employeeId,
    //     agreement_id: activeAgreenent.id,
    //   });
    //   if (req.files["letter_doc"]) {
    //     await db.CreditPatientAttachment.create({
    //       creditPatient_id: newCreditPatient.id,
    //       letter_doc: "uploads/" + req.files["letter_doc"][0].filename,
    //     });
    //   }
    // }
    ExistingEmergencyContact.firstName = emergencyParsed.firstName;
    ExistingEmergencyContact.middleName = emergencyParsed.middleName;
    ExistingEmergencyContact.lastName = emergencyParsed.lastName;
    ExistingEmergencyContact.phone = emergencyParsed.phone;
    ExistingEmergencyContact.relationship =
      emergencyParsed.relation !== "Other"
        ? emergencyParsed.relation
        : emergencyParsed.other_relation;

    await ExistingEmergencyContact.save();

    ExistingPatient.firstName = patientParsed.firstName;
    ExistingPatient.middleName = patientParsed.middleName;
    ExistingPatient.lastName = patientParsed.lastName;
    ExistingPatient.gender = patientParsed.gender;
    ExistingPatient.has_phone = patientParsed.has_phone;
    ExistingPatient.phone = patientParsed.has_phone
      ? patientParsed.phone
      : null;
    ExistingPatient.birth_date = patientParsed.birth_date;
    ExistingPatient.is_credit = patientParsed.is_credit;
    ExistingPatient.is_new = patientParsed.is_new;
    ExistingPatient.manual_card_id = !patientParsed.is_new
      ? patientParsed.manual_card_id
      : "";
    ExistingPatient.marital_status = patientParsed.marital_status;
    ExistingPatient.guardian_name = patientParsed.guardian_name;
    ExistingPatient.occupation = patientParsed.occupation;
    ExistingPatient.empoyeeId_url = req.files["empoyeeId_doc"]
      ? "uploads/" + req.files["empoyeeId_doc"][0].filename
      : ExistingPatient.empoyeeId_url;
    ExistingPatient.company_id = patientParsed.is_credit ? company_id : null;

    await ExistingPatient.save();

    res.status(200).json({ message: "Patient updated successfully" });
  }),
  activatePatient: expressAsyncHandler(async (req, res) => {
    const patient = await db.Patient.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!patient) {
      res.status(400);
      throw new Error("Patient doesn't exist");
    }
    patient.status = true;
    await patient.save();
    res.json({ message: "Patient activated successfully" });
  }),
  deactivatePatient: expressAsyncHandler(async (req, res) => {
    const patient = await db.Patient.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!patient) {
      res.status(400);
      throw new Error("Patient doesn't exist");
    }
    patient.status = false;
    await patient.save();
    res.json({ message: "Patient deactivated successfully" });
  }),
  deletePatient: expressAsyncHandler(async (req, res) => {}),
};
