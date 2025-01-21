// import asynHandler from "express-async-handler";
const db = require("../models");
import { format, parse } from "date-fns";
import { employeeService } from "../services";
import { employeeFilterType } from "../services/employee.service";
import asyncHandler from "../utils/asyncHandler";
import expressasynchandler from "express-async-handler";
import { createEmployeeSchema, updateEmployeeSchema } from "../types/employee";

export const getEmployees = asyncHandler(async (req, res) => {
  const query = req.query as employeeFilterType;

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
export const getEmployeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employeeId = parseInt(req.params.id, 10);
  const employee = await employeeService.getEmployeeById(employeeId);
  res.json({
    success: true,
    data: employee,
  });
});
// @desc get employee that does not have user account
export const getEmployeesWithNoUserAccounts = asyncHandler(async (req, res) => {
  console.log("emp no");
  const employees = await employeeService.getEmployeesWithNoUserAccounts();
  // await db.Employee.findAll({
  //   include: [
  //     {
  //       model: db.User,
  //       as: "user",
  //     },
  //   ],
  // });
  // const employee = employees.filter((e: any) => e.user === null);
  // console.log(employees[5].user);
  res.json(employees);
});
export const getEmployeePostions = asyncHandler(async (req, res) => {
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
export const createEmployee = asyncHandler<{
  validatedData: typeof createEmployeeSchema._type;
}>(async (req, res) => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  // Collect the uploaded files (assuming single file per field)
  const uploadedFiles = {
    photo: files?.photo?.[0]?.path || null,
    digital_signature: files?.digital_signature?.[0]?.path || null,
    doctor_titer: files?.doctor_titer?.[0]?.path || null,
  };
  const employeeData = {
    ...req.validatedData,
    ...uploadedFiles,
  };

  const employee = await employeeService.createEmployee(employeeData);

  res.status(201).json({
    success: true,
    message: "Employee is registered successfully",
    data: employee,
  });
});
// @desc update employee
export const updateEmployee = asyncHandler<{
  validatedData: typeof updateEmployeeSchema._type;
}>(async (req, res) => {
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
  const employeeId = parseInt(req.params.id, 10);

  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };
  const uploadedFiles = {
    photo: files?.photo?.[0]?.path || null,
    digital_signature: files?.digital_signature?.[0]?.path || null,
    doctor_titer: files?.doctor_titer?.[0]?.path || null,
  };
  const employeeData = {
    ...req.validatedData,
    ...uploadedFiles,
  };
  const employee = await employeeService.updateEmployee(
    employeeId,
    employeeData
  );
  // await employee.getEmergencyContact({ include: "address" });
  // res.status(400).json({ message: "mbjhvjh" });
  // // return;
  // const emergence = JSON.parse(Emergency);
  // const address = JSON.parse(req.body?.address);
  // // console.log(emergence);
  // // check if employee exists
  // const empExist = await db.Employee.findByPk(id);
  // if (!empExist) {
  //   res.send(404);
  //   throw new Error(`Employee not found`);
  // }
  // // console.log(position);
  // const DATEOFBIRTH = new Date(date_of_birth);
  // const DATEOFHIRE = new Date(date_of_hire);

  // // const convertedBirthDate = fromZonedTime(DATEOFBIRTH, "Africa/Nairobi");
  // // const convertedHireDate = fromZonedTime(DATEOFHIRE, "Africa/Nairobi");
  // empExist.firstName = firstName;
  // empExist.middleName = middleName;
  // empExist.lastName = lastName;
  // empExist.position = position;
  // empExist.other_position = other_position ? other_position : "";
  // empExist.gender = gender;
  // empExist.date_of_birth = format(DATEOFBIRTH, "yyyy-MM-dd");
  // empExist.date_of_hire = format(DATEOFHIRE, "yyyy-MM-dd");
  // // empExist.photo = req.files["photo"]
  // //   ? "uploads/" + req.files["photo"][0]?.filename
  // //   : empExist.photo;
  // // empExist.digital_signature = req.files["digital_signature"]
  // //   ? "uploads/" + req.files["digital_signature"][0]?.filename
  // //   : empExist.digital_signature;
  // await empExist.save({ userId: req?.user?.id });
  // const addressExits = await db.Address.findOne({
  //   where: {
  //     phone_1: address.phone_1,
  //   },
  // });
  // // console.log(addressExits.id);
  // // console.log(format(req.body.date_of_birth, "MM/dd/yyyy"));
  // // console.log(req.body);
  // if (addressExits && addressExits.id !== parseInt(address.id)) {
  //   res.status(400);
  //   throw new Error("Employee phone number already exists");
  // }
  // await db.Address.update(
  //   {
  //     woreda_id: address.woreda_id,
  //     phone_1: address.phone_1,
  //     phone_2: address.phone_2,
  //     email: address.email ? address.email : null,
  //     house_number: address.house_number,
  //   },
  //   {
  //     where: {
  //       id: address.id,
  //     },
  //     individualHooks: true,
  //     userId: req?.user?.id,
  //   }
  // );
  // const EmergencyE = await db.EmergencyContact.findOne({
  //   where: {
  //     phone: emergence.phone,
  //   },
  // });
  // if (EmergencyE && EmergencyE.id !== emergence.id) {
  //   res.status(400);
  //   throw new Error("Emergency phone number already exists");
  // }
  // const EmergencyExist = await db.EmergencyContact.findByPk(emergence.id);
  // EmergencyExist.firstName = emergence.firstName;
  // EmergencyExist.lastName = emergence.lastName;
  // EmergencyExist.middleName = emergence.middleName;
  // EmergencyExist.relationship = emergence.relation;
  // EmergencyExist.other_relationship =
  //   emergence.relation === "Other" ? emergence.other_relation : null;
  // EmergencyExist.phone = emergence.phone;
  // // EmergencyExist.other_relationship = emergence.other_relation;
  // // && emergence.the_same_address_as_employee

  // if (emergence.addressId !== address.id) {
  //   const Eaddress = await db.Address.findByPk(emergence.addressId);
  //   if (emergence.the_same_address_as_employee) {
  //     // create new Address
  //     EmergencyExist.address_id = address.id;
  //     await EmergencyExist.save({ userId: req?.user?.id });
  //     await Eaddress.destroy({ userId: req?.user?.id });
  //   } else {
  //     // woreda_id: emergence.woreda_id,
  //     // house_number: emergence.house_number,
  //     // phone_1: emergence.phone_1,
  //     // phone_2: emergence.phone_2,
  //     Eaddress.woreda_id = emergence.woreda_id;
  //     Eaddress.house_number = emergence.house_number;
  //     Eaddress.phone_1 = emergence.phone_1;
  //     Eaddress.phone_2 = emergence.phone_2;
  //     await Eaddress.save({ userId: req?.user?.id });
  //   }
  // } else {
  //   if (!emergence.the_same_address_as_employee) {
  //     const newAddress1 = await db.Address.create(
  //       {
  //         woreda_id: emergence.woreda_id,
  //         house_number: emergence.house_number,
  //         phone_1: emergence.phone_1,
  //         phone_2: emergence.phone_2,
  //       },
  //       { userId: req.user?.id }
  //     );
  //     EmergencyExist.address_id = newAddress1.id;
  //   }
  // }

  // await EmergencyExist.save({ userId: req.user?.id });

  res.status(200).json({
    success: true,
    message: "Employee updated successfully",
    data: employee,
  });
});
export const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const employee =
  const employeeId = parseInt(req.params.id, 10);
  await employeeService.deleteEmployee(employeeId);

  res
    .status(200)
    .json({ success: true, message: "Employee deleted successfully" });
});

// @desc deactivate employee

export const deactivateEmployee = asyncHandler(async (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employee = await employeeService.deactivateEmployee(employeeId);

  res.status(200).json({
    success: true,
    message: "Employee is deactivated successfully",
    data: employee,
  });
});
export const activateEmployee = asyncHandler(async (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employee = await employeeService.activateEmployee(employeeId);

  res.status(200).json({
    success: true,
    data: employee,
    message: "Employee is activated successfully",
  });
});
