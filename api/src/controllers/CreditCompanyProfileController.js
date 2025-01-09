const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
const { getPaddedName } = require("../utils/getPaddedName");

module.exports = CreditCompanyProfileController = {
  getCreditCompanys: asyncHandler(async (req, res) => {
    let where = {};
    if (req.query.status) {
      if (req.query.status === "true") {
        where.status = true;
      } else if (req.query.status === "false") {
        where.status = false;
      }
    }
    console.log(where);
    console.log(req.query);
    const creditCompanys = await db.CreditCompanyProfile.findAll({
      where: where,
      include: [
        {
          model: db.CreditAgreement,
          as: "agreements",
          order: [["createdAt", "DESC"]],
          limit: 1,
        },
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
    });
    res.json(creditCompanys);
  }),
  getActiveAgreementCompanys: asyncHandler(async (req, res) => {
    // Get all credit company profiles that have active agreement
    const activeAgreementCompanys = await db.CreditCompanyProfile.findAll({
      include: [
        {
          model: db.CreditAgreement,
          as: "agreements",
          where: {
            status: true,
          },
          // required: true, // Ensure only companies with active
        },
        {
          model: db.CompanyEmployee,
          as: "companyEmployees",
          where: {
            status: true,
          },
          attributes: ["id", "firstName", "middleName", "lastName", "empl_id"],
          required: false,
        },
      ],
    });
    res.status(200).json(activeAgreementCompanys);
  }),
  getCompanyAgreements: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const agreements = await db.CreditAgreement.findAll({
      where: {
        company_id: id,
      },
    });
    res.status(200).json(agreements);
  }),
  getCompanyEmployees: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const employees = await db.CompanyEmployee.findAll({
      where: {
        company_id: id,
      },
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
    });
    res.json(employees);
  }),
  createCreditCompany: asyncHandler(async (req, res) => {
    // console.log("\n\nkejbf\n\n");
    const {
      name,
      tin,
      representative_name,
      representative_phone,
      address,
      agreement,
    } = req.body;
    console.log(req.body);
    const parseAddress = JSON.parse(address);
    const parseAgreement = JSON.parse(agreement);
    // console.log("n\n" + req.body + " hkvhgchgvhg \n\n");
    // return;
    db.Sequelize;
    const addressExist = await db.Address.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { phone_1: parseAddress.phone_1 },
          { email: parseAddress.email },
        ],
      },
    });
    if (addressExist) {
      res.status(400);
      throw new Error("Address is already in use");
    }
    const newAddress = await db.Address.create(
      {
        street: parseAddress.street_name,
        woreda_id: parseAddress.woreda_id,
        phone_1: parseAddress.phone_1,
        phone_2: parseAddress.phone_2,
        email: parseAddress.email,
        house_number: parseAddress.house_number,
      },
      { userId: req.user.id }
    );
    const creditCompany = await db.CreditCompanyProfile.create(
      {
        name,
        tin,
        representative_name,
        representative_phone,
        address_id: newAddress.id,
      },
      { userId: req.user.id }
    );
    if (creditCompany) {
      const Agreement = await db.CreditAgreement.create(
        {
          start_date: parseAgreement.start_date,
          end_date: parseAgreement.end_date,
          max_limit: parseAgreement.max_limit,
          company_id: creditCompany.id,
          agreement_doc: "uploads/" + req.file?.filename,
        },
        { userId: req.user.id }
      );
    }

    res.status(201).json(creditCompany);
  }),
  updateCreditCompany: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
      name,
      tin,
      representative_name,
      representative_phone,
      address,
      agreement,
    } = req.body;
    console.log(req.body);
    const parseAddress = JSON.parse(address);
    const parseAgreement = JSON.parse(agreement);
    const creditCompany = await db.CreditCompanyProfile.findByPk(id);
    if (!creditCompany) {
      res.status(400);
      throw new Error("Credit Company not found");
    }
    creditCompany.name = name;
    creditCompany.tin = tin;
    creditCompany.representative_name = representative_name;
    creditCompany.representative_phone = representative_phone;
    await creditCompany.save({ userId: req.user.id });
    const addressExist = await db.Address.findByPk(parseAddress.id);
    if (!addressExist) {
      res.status(400);
      throw new Error("Address not found");
    }
    addressExist.phone_1 = parseAddress.phone_1;
    addressExist.phone_2 = parseAddress.phone_2;
    addressExist.email = parseAddress.email;
    addressExist.house_number = parseAddress.house_number;
    addressExist.woreda_id = parseAddress.woreda_id;
    addressExist.street = parseAddress.street_name;
    await addressExist.save({ userId: req.user.id });

    const Agreement = await db.CreditAgreement.findByPk(parseAgreement.id);
    if (!Agreement) {
      res.status(400);
      throw new Error("Agreement not found");
    }
    Agreement.start_date = parseAgreement.start_date;
    Agreement.end_date = parseAgreement.end_date;
    Agreement.max_limit = parseAgreement.max_limit;
    Agreement.agreement_doc = req.file
      ? "uploads/" + req.file?.filename
      : Agreement.agreement_doc;
    await Agreement.save({ userId: req.user.id });

    res.json(creditCompany);
  }),

  activateCreditCompany: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const creditCompany = await db.CreditCompanyProfile.findByPk(id);
    if (!creditCompany) {
      res.status(400);
      throw new Error("Credit Company not found");
    }
    creditCompany.status = true;
    await creditCompany.save({ userId: req.user.id });
    res.status(200).json({ message: "Credit Company activated" });
  }),
  deactivateCreditCompany: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const creditCompany = await db.CreditCompanyProfile.findByPk(id);
    if (!creditCompany) {
      res.status(400);
      throw new Error("Credit Company not found");
    }
    creditCompany.status = false;
    await creditCompany.save({ userId: req.user.id });
    res.status(200).json({ message: "Credit Company deactivated" });
  }),

  // terminate agreement
  terminateAgreement: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const agreement = await db.CreditAgreement.findByPk(id);
    if (!agreement) {
      res.status(400);
      throw new Error("Agreement not found");
    }
    agreement.status = false;
    await agreement.save({ userId: req.user.id });
    res.status(200).json({ message: "Agreement terminated" });
  }),
  createAgreement: asyncHandler(async (req, res) => {
    const { start_date, end_date, max_limit, company_id } = req.body;
    console.log(req.body);
    const agreement = await db.CreditAgreement.create(
      {
        start_date,
        end_date,
        max_limit,
        company_id,
        agreement_doc: "uploads/" + req.file?.filename,
      },
      { userId: req.user.id }
    );
    console.log(req.file);
    res.status(201).json(agreement);
  }),

  createEmployeeCompany: asyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      middleName,
      position,
      date_of_birth,
      date_of_hire,
      gender,
      company_id,
    } = req.body;
    console.log(req.body);
    // res.status(404).json({ message: "hello" });
    // return;
    // const emergence = JSON.parse(Emergency);
    const address = JSON.parse(req.body?.address);
    const addressExits = await db.Address.findOne({
      // where: { [Op.or]: [{ phone_1: address.phone_1, email: address.email }] },
      where: {
        phone_1: address.phone_1,
      },
    });
    if (addressExits) {
      res.status(400);
      throw new Error("Employee phone is already in use");
    }
    const newAddress = await db.Address.create(
      {
        street: address.street_name,
        woreda_id: address.woreda_id,
        phone_1: address.phone_1,
        phone_2: address.phone_2,
        email: address.email,
        house_number: address.house_number,
      },
      { userId: req.user.id }
    );

    // const newAddress1= = await db.Address.create({
    //   woreda_id: emergence.woreda_id,
    //   house_number: emergence.house_number,
    //   phone_1: emergence.phone,
    //   phone_2: emergence.phone_2,
    // });

    const newEmployee = await db.CompanyEmployee.create(
      {
        firstName,
        middleName,
        lastName,
        position: position,
        gender,
        date_of_birth: date_of_birth,
        date_of_hire: date_of_hire,
        photo_url: req.file && "uploads/" + req.file?.filename,
        address_id: newAddress.id,
        company_id,
        // emergence_contact_id: EmergencyContact.id,
      },
      { userId: req.user.id }
    );
    newEmployee.empl_id = getPaddedName(newEmployee.id, 4, "Emp");
    await newEmployee.save({ hooks: false });
    res.status(201).json(newEmployee);
  }),
  updateEmployeeCompany: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      middleName,
      position,
      date_of_birth,
      date_of_hire,
      gender,
      company_id,
    } = req.body;
    const employee = await db.CompanyEmployee.findByPk(id);
    if (!employee) {
      res.status(400);
      throw new Error("Employee not found");
    }
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.middleName = middleName;
    employee.position = position;
    employee.date_of_birth = date_of_birth;
    employee.date_of_hire = date_of_hire;
    employee.gender = gender;
    employee.company_id = company_id;
    await employee.save({ userId: req.user.id });
    const address = JSON.parse(req.body?.address);
    const addressExist = await db.Address.findByPk(address.id);
    if (!addressExist) {
      res.status(400);
      throw new Error("Address not found");
    }
    addressExist.phone_1 = address.phone_1;
    addressExist.phone_2 = address.phone_2;
    addressExist.email = address.email;
    addressExist.house_number = address.house_number;
    addressExist.woreda_id = address.woreda_id;
    addressExist.street = address.street_name;
    await addressExist.save({ userId: req.user.id });

    res.status(200).json(employee);
  }),
  activateCompanyEmploye: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const employee = await db.CompanyEmployee.findByPk(id);
    if (!employee) {
      res.status(400);
      throw new Error("Employee not found");
    }
    employee.status = true;
    await employee.save({ userId: req.user.id });
    res.status(200).json({ message: "Employee activated" });
  }),
  deactivateCompanyEmployee: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const employee = await db.CompanyEmployee.findByPk(id);
    if (!employee) {
      res.status(400);
      throw new Error("Employee not found");
    }
    employee.status = false;
    await employee.save({ userId: req.user.id });
    res.status(200).json({ message: "Employee deactivated" });
  }),
};
