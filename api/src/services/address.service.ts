import { Address } from "../models";
import { ApiError } from "../shared/error/ApiError";
import { addressT } from "../types/shared";

export const getAddress = async (id: string | number) => {
  const address = await Address.findByPk(id);
  if (!address) {
    throw new ApiError(404, "Address not found");
  }
  return address;
};

export const updateAdress = async (data: addressT) => {
  const { id, woreda_id, email, phone_1, house_number, street } = data;
  const address = await getAddress(id);
  const updatedAddress = await address.update({
    email: email,
    woreda_id: woreda_id,
    phone_1: phone_1,
    house_number,
    street,
  });
  return updatedAddress;
};
