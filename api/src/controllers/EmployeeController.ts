import asynHandler from "express-async-handler";
const db = require("../models");
import { format, parse } from "date-fns";
import { employeeService } from "../services";
import { employeeFilterType } from "../services/employee.service";
// const { fromZonedTime } = require("date-fns-tz");
// import { zonedTimeToUtc } from 'date-fns-tz';
// const e = require("express");
// const { Op, Sequelize } = require("sequelize");
// const getEmploye = async()
// module.exports = EmployeeController = {
export const getEmployees = asynHandler(async (req, res) => {
  // const Status = req.query.status.map((s) => s === "true");
  // console.log(Status);
  const query = req.query as employeeFilterType;
  let where: any = {};
  if (req.query.status) {
    where.status = Boolean(req.query.status);
  }

  if (req.query.position) {
    where.position = req.query.position;
  }
  if (req.query.gender) {
    where.gender = req.query.gender;
  }
  // console.log(where);
  const employees = await employeeService.getEmployees(query);
  // db.Employee.findAll({
  //   where: where,
  //   order: [
  //     ["firstName", "ASC"], // Sort by first name in ascending order
  //     ["middleName", "ASC"], // Sort by middle name in ascending order
  //     ["lastName", "ASC"], // Sort by last name in ascending order
  //   ],
  //   // [Sequelize.col("lastName"), "ASC"],

  //   include: [
  //     {
  //       model: db.Address,
  //       as: "address",
  //       include: [
  //         {
  //           model: db.Woreda,
  //           as: "woreda",
  //           attributes: ["id", "name"],
  //           include: [
  //             {
  //               model: db.SubCity,
  //               as: "SubCity",
  //               attributes: ["id", "subCity_name"],
  //               include: [
  //                 {
  //                   model: db.City,
  //                   as: "city",
  //                   attributes: ["id", "name"],
  //                   include: [
  //                     {
  //                       model: db.Region,
  //                       as: "region",
  //                       attributes: ["id", "name"],
  //                     },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },

  //     {
  //       model: db.EmergencyContact,
  //       as: "emergencyContact",
  //       include: [
  //         {
  //           model: db.Address,
  //           as: "address",
  //           include: [
  //             {
  //               model: db.Woreda,
  //               as: "woreda",
  //               attributes: ["id", "name"],
  //               include: [
  //                 {
  //                   model: db.SubCity,
  //                   as: "SubCity",
  //                   attributes: ["id", "subCity_name"],
  //                   include: [
  //                     {
  //                       model: db.City,
  //                       as: "city",
  //                       attributes: ["id", "name"],
  //                       include: [
  //                         {
  //                           model: db.Region,
  //                           as: "region",
  //                           attributes: ["id", "name"],
  //                         },
  //                       ],
  //                     },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // });
  res.status(200).json({ total: employees.length, data: employees });
});
// @desc get employee that does not have user account
export const getEmployeesWithNoUserAccounts = asynHandler(async (req, res) => {
  console.log("emp no");
  const employees = await db.Employee.findAll({
    include: [
      {
        model: db.User,
        as: "user",
      },
    ],
  });
  const employee = employees.filter((e: any) => e.user === null);
  // console.log(employees[5].user);
  res.json(employee);
});
export const getEmployeePostions = asynHandler(async (req, res) => {
  const positions = await db.Employee.findAll({
    attributes: ["position"],
    group: ["position"],
  });

  // const positions = await Employee.findAll({
  //   attributes: ['position'],
  //   group: ['position']
  // });
  const distinctPositions = positions.map((position: any) => position.position);
  res.json(distinctPositions);
});
export const createEmployee = asynHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    position,
    other_position,
    date_of_birth,
    date_of_hire,
    gender,
    Emergency,
  } = req.body;
  // console.log(req.body);
  // res.status(404).json({ message: "hello" });
  // return;
  const emergence = JSON.parse(Emergency);
  const address = JSON.parse(req.body?.address);
  // console.log(emergence);
  // return;
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
      woreda_id: address.woreda_id,
      house_number: address.house_number ? address.house_number : null,
      phone_1: address.phone_1,
      phone_2: address.phone_2 ? address.phone_2 : null,
      email: address?.email ? address.email : null,
    },
    { userId: req?.user?.id }
  );
  let emergenceContact_AddressId;
  if (emergence.the_same_address_as_employee) {
    emergenceContact_AddressId = newAddress.id;
  } else {
    const addressExits = await db.Address.findOne({
      // where: { [Op.or]: [{ phone_1: address.phone_1, email: address.email }] },
      where: {
        phone_1: emergence.phone_1,
      },
    });
    if (addressExits) {
      res.status(400);
      throw new Error("phone is already in use try another numbetr");
    }
    const newAddress1 = await db.Address.create(
      {
        woreda_id: emergence.woreda_id,
        house_number: emergence.house_number,
        phone_1: emergence.phone,
        phone_2: emergence.phone_2,
        email: emergence?.email ? emergence.email : null,
      },
      { userId: req?.user?.id }
    );
    emergenceContact_AddressId = newAddress1.id;
  }
  const emergencePhoneExist = await db.EmergencyContact.findOne({
    where: {
      phone: emergence.phone,
    },
  });
  if (emergencePhoneExist) {
    newAddress.destroy();
    res.status(400);
    throw new Error("Emergency phone number already exists");
  }
  const EmergencyContact = await db.EmergencyContact.create(
    {
      firstName,
      middleName,
      lastName,
      relationship: emergence.relation,
      other_relationship: emergence?.other_relation,
      address_id: emergenceContact_AddressId,
      phone: emergence.phone,
    },
    { userId: req?.user?.id }
  );
  const DATEOFBIRTH = new Date(date_of_birth);
  const DATEOFHIRE = new Date(date_of_hire);

  // const convertedBirthDate = fromZonedTime(DATEOFBIRTH, "Africa/Nairobi");
  // const convertedHireDate = fromZonedTime(DATEOFHIRE, "Africa/Nairobi");
  const newEmployee = await db.Employee.create(
    {
      firstName,
      middleName,
      lastName,
      position: position,
      other_position: position === "Other" ? other_position : null,
      gender,
      date_of_birth: format(DATEOFBIRTH, "yyyy-MM-dd"),
      date_of_hire: format(DATEOFHIRE, "yyyy-MM-dd"),
      // photo: req?.files?.["photo"] && "uploads/" + req.files["photo"][0]?.filename,
      // digital_signature:
      //   req.files["digital_signature"] &&
      //   "uploads/" + req.files["digital_signature"][0]?.filename,
      address_id: newAddress.id,

      emergence_contact_id: EmergencyContact.id,
      // doctor_titer:
      //   req.files["doctor_titer"] &&
      //   "uploads/" + req.files["doctor_titer"][0].filename,
    },
    { userId: req?.user?.id }
  );

  res.status(201).json({ message: "Employee is registered successfully" });
});
// @desc update employee
export const updateEmployee = asynHandler(async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    middleName,
    position,
    other_position,
    date_of_birth,
    date_of_hire,
    gender,
    Emergency,
  } = req.body;
  // console.log(req.body);
  // res.status(400).json({ message: "mbjhvjh" });
  // // return;
  const emergence = JSON.parse(Emergency);
  const address = JSON.parse(req.body?.address);
  // console.log(emergence);
  // check if employee exists
  const empExist = await db.Employee.findByPk(id);
  if (!empExist) {
    res.send(404);
    throw new Error(`Employee not found`);
  }
  // console.log(position);
  const DATEOFBIRTH = new Date(date_of_birth);
  const DATEOFHIRE = new Date(date_of_hire);

  // const convertedBirthDate = fromZonedTime(DATEOFBIRTH, "Africa/Nairobi");
  // const convertedHireDate = fromZonedTime(DATEOFHIRE, "Africa/Nairobi");
  empExist.firstName = firstName;
  empExist.middleName = middleName;
  empExist.lastName = lastName;
  empExist.position = position;
  empExist.other_position = other_position ? other_position : "";
  empExist.gender = gender;
  empExist.date_of_birth = format(DATEOFBIRTH, "yyyy-MM-dd");
  empExist.date_of_hire = format(DATEOFHIRE, "yyyy-MM-dd");
  // empExist.photo = req.files["photo"]
  //   ? "uploads/" + req.files["photo"][0]?.filename
  //   : empExist.photo;
  // empExist.digital_signature = req.files["digital_signature"]
  //   ? "uploads/" + req.files["digital_signature"][0]?.filename
  //   : empExist.digital_signature;
  await empExist.save({ userId: req?.user?.id });
  const addressExits = await db.Address.findOne({
    where: {
      phone_1: address.phone_1,
    },
  });
  // console.log(addressExits.id);
  // console.log(format(req.body.date_of_birth, "MM/dd/yyyy"));
  // console.log(req.body);
  if (addressExits && addressExits.id !== parseInt(address.id)) {
    res.status(400);
    throw new Error("Employee phone number already exists");
  }
  await db.Address.update(
    {
      woreda_id: address.woreda_id,
      phone_1: address.phone_1,
      phone_2: address.phone_2,
      email: address.email ? address.email : null,
      house_number: address.house_number,
    },
    {
      where: {
        id: address.id,
      },
      individualHooks: true,
      userId: req?.user?.id,
    }
  );
  const EmergencyE = await db.EmergencyContact.findOne({
    where: {
      phone: emergence.phone,
    },
  });
  if (EmergencyE && EmergencyE.id !== emergence.id) {
    res.status(400);
    throw new Error("Emergency phone number already exists");
  }
  const EmergencyExist = await db.EmergencyContact.findByPk(emergence.id);
  EmergencyExist.firstName = emergence.firstName;
  EmergencyExist.lastName = emergence.lastName;
  EmergencyExist.middleName = emergence.middleName;
  EmergencyExist.relationship = emergence.relation;
  EmergencyExist.other_relationship =
    emergence.relation === "Other" ? emergence.other_relation : null;
  EmergencyExist.phone = emergence.phone;
  // EmergencyExist.other_relationship = emergence.other_relation;
  // && emergence.the_same_address_as_employee

  if (emergence.addressId !== address.id) {
    const Eaddress = await db.Address.findByPk(emergence.addressId);
    if (emergence.the_same_address_as_employee) {
      // create new Address
      EmergencyExist.address_id = address.id;
      await EmergencyExist.save({ userId: req?.user?.id });
      await Eaddress.destroy({ userId: req?.user?.id });
    } else {
      // woreda_id: emergence.woreda_id,
      // house_number: emergence.house_number,
      // phone_1: emergence.phone_1,
      // phone_2: emergence.phone_2,
      Eaddress.woreda_id = emergence.woreda_id;
      Eaddress.house_number = emergence.house_number;
      Eaddress.phone_1 = emergence.phone_1;
      Eaddress.phone_2 = emergence.phone_2;
      await Eaddress.save({ userId: req?.user?.id });
    }
  } else {
    if (!emergence.the_same_address_as_employee) {
      const newAddress1 = await db.Address.create(
        {
          woreda_id: emergence.woreda_id,
          house_number: emergence.house_number,
          phone_1: emergence.phone_1,
          phone_2: emergence.phone_2,
        },
        { userId: req.user?.id }
      );
      EmergencyExist.address_id = newAddress1.id;
    }
  }

  await EmergencyExist.save({ userId: req.user?.id });

  res.status(200).json({ message: "hello" }); //
});
export const deleteEmployee = asynHandler(async (req, res) => {
  const { id } = req.params;
  const empExist = await db.Employee.findByPk(id);
  // console.log(empExist);
  if (!empExist) {
    res.send(404);
    throw new Error(`Employee not found`);
  }
  await empExist.destroy({ userId: req.user?.id });
  // delete employee
  // await db.Employee.distory({
  //   where: { id: id },
  // });
  res.status(200).json({ message: "Employee deleted successfully" });
});

// @desc deactivate employee

export const deactivateEmployee = asynHandler(async (req, res) => {
  const { id } = req.params;
  const empExist = await db.Employee.findByPk(id);

  if (!empExist) {
    res.send(404);
    throw new Error(`Employee not found`);
  }
  empExist.status = false;
  await empExist.save({ userId: req.user?.id });
  // const employee = await db.Employee.update({
  //   status: false
  // },{
  //   where:{
  //     id
  //   }
  // })
  res.status(200).json({ message: "Employee is deactivated successfully" });
});
export const activateEmployee = asynHandler(async (req, res) => {
  const { id } = req.params;
  const empExist = await db.Employee.findByPk(id);

  if (!empExist) {
    res.send(404);
    throw new Error(`Employee not found`);
  }
  empExist.status = true;
  await empExist.save({ userId: req.user?.id });
  // const employee = await db.Employee.update({
  //   status: false
  // },{
  //   where:{
  //     id
  //   }
  // })
  res.status(200).json({ message: "Employee is deactivated successfully" });
});
// };
