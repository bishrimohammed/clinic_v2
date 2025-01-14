import { addressService, emergencyContactService } from ".";
import { Address, Employee } from "../models";
import { ApiError } from "../shared/error/ApiError";
import { createEmployeeT } from "../types/employee";

export type employeeFilterType = {
  status: "true" | "false" | undefined;
  position: string | undefined;
  gender: "Male" | "Female" | undefined;
};

export const getEmployees = async (query: employeeFilterType) => {
  const { gender, position, status } = query;
  const whereClause: any = {};
  if (status) {
    whereClause.status = status === "true";
  }
  if (gender) {
    whereClause.gender = gender;
  }
  if (position) {
    whereClause.position = position;
  }
  console.log(query);

  const employees = await Employee.findAll({
    where: whereClause,
    include: [{ model: Address, as: "address" }],
  });
  return employees;
};

export const getEmployeeById = async (id: string) => {
  const employee = await Employee.findByPk(id, {
    include: [{ model: Address, as: "address" }],
  });
  if (!employee) {
    throw new ApiError(400, "Employee not found");
  }
  return employee;
};

export const createEmployee = async (data: createEmployeeT) => {
  const {
    firstName,
    middleName,
    lastName,
    date_of_birth,
    date_of_hire,
    gender,
    position,
    address,
    emergencyContact,
  } = data;

  const createdAddress = await addressService.createAddress(address);
  // if(emergencyContact.)
  const createdEmergencyContact =
    await emergencyContactService.createEmergencyContact(
      emergencyContact,
      createdAddress.id
    );
  // if(!createdEmergencyContact){
  //     await createdAddress.destroy()
  // }
  const employee = await Employee.create({
    firstName,
    middleName,
    lastName,
    date_of_birth,
    date_of_hire,
    address_id: createdAddress.id,
    emergence_contact_id: createdEmergencyContact.id,
    gender,
    position,
  });
  if (!employee) {
    emergencyContact.is_the_same_address
      ? await createdEmergencyContact.destroy()
      : (await createdEmergencyContact.destroy(),
        await createdAddress.destroy());
  }

  return employee;
};
