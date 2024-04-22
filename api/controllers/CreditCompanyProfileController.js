const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");

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
    // console.log("\n\n" + req.body + " hkvhgchgvhg \n\n");
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
    const newAddress = await db.Address.create({
      street: parseAddress.street_name,
      woreda_id: parseAddress.woreda_id,
      phone_1: parseAddress.phone_1,
      phone_2: parseAddress.phone_2,
      email: parseAddress.email,
      house_number: parseAddress.house_number,
    });
    const creditCompany = await db.CreditCompanyProfile.create({
      name,
      tin,
      representative_name,
      representative_phone,
      address_id: newAddress.id,
    });
    if (creditCompany) {
      const Agreement = await db.CreditAgreement.create({
        start_date: parseAgreement.start_date,
        end_date: parseAgreement.end_date,
        max_limit: parseAgreement.max_limit,
        company_id: creditCompany.id,
        agreement_doc: "uploads/" + req.file?.filename,
      });
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
    await addressExist.save();

    const Agreement = await db.CreditAgreement.findByPk(parseAgreement.id);
  }),
  activateCreditCompany: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const creditCompany = await db.CreditCompanyProfile.findByPk(id);
    if (!creditCompany) {
      res.status(400);
      throw new Error("Credit Company not found");
    }
    creditCompany.status = true;
    await creditCompany.save();
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
    await creditCompany.save();
    res.status(200).json({ message: "Credit Company deactivated" });
  }),
};
