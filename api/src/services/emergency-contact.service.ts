import { addressService } from ".";
import { EmergencyContact } from "../models";
import { ApiError } from "../shared/error/ApiError";
import { createEmergencyContactT } from "../types/shared";

export const getEmergencyContactById = async (id: string) => {
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
  if (!emergenceContact) {
    throw new ApiError(404, "Emergency Contact not found");
  }
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
    relationship,
    address_id: addressId,
  });
  if (!createdEmergencyContact) {
    await addressService.deleteAddress(addressId);
  }
  return createdEmergencyContact;
};
