import sequelize from "../db";
import { addressService, emergencyContactService } from ".";
import { Address, EmergencyContact, Employee, User } from "../models";
import { ApiError } from "../shared/error/ApiError";
import { createEmployeeT, updateEmployeeT } from "../types/employee";

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
export const getEmployeesWithNoUserAccounts = async () => {
  const employees = await Employee.findAll({
    where: {
      "$user.id$": null,
    },
    include: [
      {
        model: User,
        as: "user",
        // required: false,
        // where: {
        //   id: null, // Filter for employees where the user is null
        // },
      },
    ],
  });
  return employees;
};
export const getEmployeeById = async (id: number) => {
  const employee = await Employee.findByPk(id, {
    // include: [
    //   { model: Address, as: "address" },
    //   {
    //     model: EmergencyContact,
    //     as: "emergencyContact",
    //     include: [{ model: Address, as: "address" }],
    //   },
    // ],
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
      { ...emergencyContact, parentAdderssId: createdAddress.id }
      // createdAddress.id
    );

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
  id: number,
  data: updateEmployeeT & {
    photo: string | null;
    digital_signature: string | null;
    doctor_titer: string | null;
  }
) => {
  const transaction = await sequelize.transaction();

  try {
    // Find the existing employee
    const employee = await getEmployeeById(id);
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }

    // Destructure incoming data
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

    // Update related address if provided
    if (address) {
      await addressService.updateAddress(
        employee.address_id,
        address,
        transaction
      );
    }

    // Update related emergency contact if provided
    if (emergencyContact) {
      await emergencyContactService.updateEmergencyContact(
        employee.emergence_contact_id,
        { ...emergencyContact, parentAdderssId: employee.address_id },
        transaction
      );
    }

    // Update employee details
    const updatedEmployee = await employee.update(
      {
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
        has_digital_signature:
          digital_signature !== null && digital_signature !== undefined
            ? true
            : employee.has_digital_signature,
      },
      { transaction }
    );

    // Commit the transaction
    await transaction.commit();
    return updatedEmployee;
  } catch (error) {
    // Rollback transaction on error
    const err = error as Error;
    await transaction.rollback();
    throw new ApiError(400, `Failed to update employee: ${err.message}`);
  }
};

export const deactivateEmployee = async (id: number) => {
  const employee = await getEmployeeById(id);
  await employee.update({ status: false });
  return employee;
};

export const activateEmployee = async (id: number) => {
  const employee = await getEmployeeById(id);
  await employee.update({ status: true });
  return employee;
};

export const deleteEmployee = async (id: number) => {
  const employee = await getEmployeeById(id);

  await employee.destroy();
  return employee;
};
