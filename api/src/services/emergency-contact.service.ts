import { addressService } from ".";
import { EmergencyContact } from "../models";
import { ApiError } from "../shared/error/ApiError";
import { createEmergencyContactT } from "../types/shared";
import { Transaction } from "sequelize";

export const getEmergencyContactById = async (id: number) => {
  const emergenceContact = await EmergencyContact.findByPk(id);
  if (!emergenceContact) {
    throw new ApiError(404, "Emergency Contact not found");
  }
  return emergenceContact;
};

export const getEmergencyContactByPhone = async (phone: string) => {
  const emergenceContact = await EmergencyContact.findOne({
    where: {
      phone: phone,
    },
  });
  //   if (!emergenceContact) {
  //     throw new ApiError(404, "Emergency Contact not found");
  //   }
  return emergenceContact;
};

export const createEmergencyContact = async (
  data: createEmergencyContactT,
  address_id: number
) => {
  const {
    firstName,
    middleName,
    lastName,
    phone,
    is_the_same_address,
    woreda_id,
    city_id,
    region_id,
    relationship,
    subcity_id,
    house_number,
    street,
    other_relation,
  } = data;
  let addressId: number;

  const existingEmergencyContact = await getEmergencyContactByPhone(phone);
  if (existingEmergencyContact) {
    throw new ApiError(400, "Phone number is Taken");
  }
  if (is_the_same_address) {
    addressId = address_id;
  } else {
    const createdAddress = await addressService.createAddress({
      city_id,
      phone_1: phone,
      region_id,
      subcity_id,
      woreda_id,
      house_number,
      street,
    });
    addressId = createdAddress.id;
  }
  const createdEmergencyContact = await EmergencyContact.create({
    firstName,
    middleName,
    lastName,
    phone,
    relationship:
      relationship.toLowerCase() !== "other" ? relationship : other_relation!,
    address_id: addressId,
  });
  if (!createdEmergencyContact) {
    await addressService.deleteAddress(addressId);
  }
  return createdEmergencyContact;
};

export const updateEmergencyContact = async (
  id: number,
  data: createEmergencyContactT & {
    employeeAddressId: number;
  },
  transaction?: Transaction
) => {
  // Find the existing emergency contact
  const emergencyContact = await getEmergencyContactById(id);

  const {
    firstName,
    middleName,
    lastName,
    phone,
    is_the_same_address,
    woreda_id,
    city_id,
    region_id,
    relationship,
    subcity_id,
    house_number,
    street,
    other_relation,
    employeeAddressId,
  } = data;
  let addressId: number = emergencyContact.address_id;
  if (!is_the_same_address) {
    if (employeeAddressId !== emergencyContact.address_id) {
      // Update existing address if IDs differ
      await addressService.updateAddress(
        emergencyContact.address_id,
        {
          city_id,
          phone_1: phone,
          region_id,
          subcity_id,
          woreda_id,
          house_number,
          street,
        },
        transaction
      );
      console.log("\n\n\n nor chane");
      console.log(addressId);

      console.log("\n\n\n bkj");
    } else {
      // Create new address
      const newAddress = await addressService.createAddress(
        {
          city_id,
          phone_1: phone,
          region_id,
          subcity_id,
          woreda_id,
          house_number,
          street,
        },
        transaction
      );

      addressId = newAddress.id;
    }
  } else if (employeeAddressId !== emergencyContact.address_id) {
    // If address marked the same but different IDs, delete the old one

    let deletedAddressId = emergencyContact.address_id;
    await emergencyContact.update(
      {
        address_id: employeeAddressId,
      },
      { transaction }
    );
    // emergencyContact.address_id = employeeAddressId;

    await addressService.deleteAddress(deletedAddressId, transaction);
    addressId = employeeAddressId;
  }

  // Determine relationship
  const relationSHIP =
    relationship?.toLowerCase() !== "other" ? relationship : other_relation!;

  // Update emergency contact details
  const updatedEmergencyContact = await emergencyContact.update(
    {
      firstName: firstName || emergencyContact.firstName,
      middleName: middleName || emergencyContact.middleName,
      lastName: lastName || emergencyContact.lastName,
      phone: phone || emergencyContact.phone,
      relationship: relationSHIP || emergencyContact.relationship,
      address_id: addressId,
    },
    { transaction }
  );

  return updatedEmergencyContact;
};
