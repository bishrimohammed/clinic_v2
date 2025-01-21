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
  data: createEmergencyContactT & { parentAdderssId: number },
  // address_id: number,
  transaction?: Transaction
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
    parentAdderssId,
  } = data;
  let addressId: number;

  const existingEmergencyContact = await getEmergencyContactByPhone(phone);
  if (existingEmergencyContact) {
    throw new ApiError(400, "Phone number is Taken");
  }
  if (is_the_same_address) {
    addressId = parentAdderssId;
  } else {
    const createdAddress = await addressService.createAddress(
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
    addressId = createdAddress.id;
  }
  const createdEmergencyContact = await EmergencyContact.create(
    {
      firstName,
      middleName,
      lastName,
      phone,
      relationship:
        relationship.toLowerCase() !== "other" ? relationship : other_relation!,
      address_id: addressId,
    },
    { transaction }
  );

  return createdEmergencyContact;
};

export const updateEmergencyContact = async (
  id: number,
  data: createEmergencyContactT & {
    parentAdderssId: number;
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
    parentAdderssId,
  } = data;
  let addressId: number = emergencyContact.address_id;
  if (!is_the_same_address) {
    if (parentAdderssId !== emergencyContact.address_id) {
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
  } else if (parentAdderssId !== emergencyContact.address_id) {
    // If address marked the same but different IDs, delete the old one

    let deletedAddressId = emergencyContact.address_id;
    await emergencyContact.update(
      {
        address_id: parentAdderssId,
      },
      { transaction }
    );
    // emergencyContact.address_id = parentAdderssId;

    await addressService.deleteAddress(deletedAddressId, transaction);
    addressId = parentAdderssId;
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
