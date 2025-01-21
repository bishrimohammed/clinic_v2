import { Transaction } from "sequelize";
import { Address } from "../models";
import { ApiError } from "../shared/error/ApiError";
import { addressT } from "../types/shared";

export const getAddressById = async (id: string | number) => {
  const address = await Address.findByPk(id);
  if (!address) {
    throw new ApiError(404, "Address not found");
  }
  return address;
};
export const getAddressByPhone = async (phone: string) => {
  return await Address.findOne({
    where: {
      phone_1: phone,
    },
  });
};
export const updateAddress = async (
  id: number,
  data: Partial<addressT>,
  transaction?: Transaction
) => {
  const { woreda_id, email, phone_1, house_number, street } = data;
  const address = await getAddressById(id);
  const updatedAddress = await address.update(
    {
      email: email || address.email,
      woreda_id: woreda_id || address.woreda_id,
      phone_1: phone_1 || address.phone_1,
      house_number: house_number || address.house_number,
      street: street || address.street,
    },
    { transaction }
  );
  return updatedAddress;
};

export const createAddress = async (
  data: addressT,
  transaction?: Transaction
) => {
  const {
    city_id,
    phone_1,
    region_id,
    subcity_id,
    woreda_id,
    email,
    house_number,
    phone_2,
    street,
  } = data;
  const existingAddress = await getAddressByPhone(phone_1);
  if (existingAddress) {
    throw new ApiError(400, "Phone is Taken", [
      { path: ["address", "phone_1"], message: "Phone number is Taken" },
    ]);
  }
  const address = await Address.create(
    {
      phone_1,
      woreda_id,
      email,
      house_number,
      street,
      phone_2,
    },
    {
      transaction,
    }
  );
  return address;
};

export const deleteAddress = async (
  id: number | string,
  transaction?: Transaction
) => {
  return await Address.destroy({
    where: {
      id: id,
    },
    transaction,
  });
};
