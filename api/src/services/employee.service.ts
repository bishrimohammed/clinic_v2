import { addressService, emergencyContactService } from ".";
import { Address, EmergencyContact, Employee } from "../models";
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
    include: [
      { model: Address, as: "address" },
      {
        model: EmergencyContact,
        as: "emergencyContact",
        include: [{ model: Address, as: "address" }],
      },
    ],
  });
  if (!employee) {
    throw new ApiError(400, "Employee not found");
  }
  return employee;
};

export const createEmployee = async (
  data: createEmployeeT & {
    photo: string | null;
    digital_signature: string | null;
    doctor_titer: string | null;
  }
) => {
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
    digital_signature,
    doctor_titer,
    photo,
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
    digital_signature: digital_signature,
    doctor_titer,
    photo,
    has_digital_signature: digital_signature ? true : false,
  });
  if (!employee) {
    emergencyContact.is_the_same_address
      ? await createdEmergencyContact.destroy()
      : (await createdEmergencyContact.destroy(),
        await createdAddress.destroy());
  }

  return employee;
};

export const updateEmployee = async (
  id: string,
  data: Partial<
    createEmployeeT & {
      photo?: string;
      digital_signature?: string;
      doctor_titer?: string;
    }
  >
) => {
  // Find the existing employee
  const employee = await getEmployeeById(id);

  // Update employee fields
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
    photo,
    digital_signature,
    doctor_titer,
  } = data;

  // Optional: Update related address and emergency contact if provided
  if (address) {
    await addressService.updateAddress(employee.address_id, address);
  }

  if (emergencyContact) {
    await emergencyContactService.updateEmergencyContact(
      employee.emergence_contact_id,
      emergencyContact
    );
  }

  // Update employee details
  const updatedEmployee = await employee.update({
    firstName,
    middleName,
    lastName,
    date_of_birth,
    date_of_hire,
    gender,
    position,
    photo: photo || employee.photo, // Keep existing photo if not updated
    digital_signature: digital_signature || employee.digital_signature, // Keep existing digital signature if not updated
    doctor_titer: doctor_titer || employee.doctor_titer, // Keep existing doctor titer if not updated
  });

  return updatedEmployee;
};

export const deactivateEmployee = async (id: string) => {
  const employee = await getEmployeeById(id);
  await employee.update({ status: false });
  return employee;
};

export const activateEmployee = async (id: string) => {
  const employee = await getEmployeeById(id);
  await employee.update({ status: true });
  return employee;
};

export const deleteEmployee = async (id: string) => {
  const employee = await getEmployeeById(id);
  await employee.destroy();
  return employee;
};
