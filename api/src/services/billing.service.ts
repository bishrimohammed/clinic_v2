import { Transaction } from "sequelize";
import { MedicalBilling } from "../models";
import ServiceLineItem from "../models/billing/ServiceLineItem";
import { getMedicalRecordById } from "./medicalrecord.service";
import { getExternalServiceById } from "./external.service";
import { ApiError } from "../shared/error/ApiError";

export const getMedicalBillingById = async (id: string) => {
  const medicalBilling = await MedicalBilling.findByPk(id);
  if (!medicalBilling) {
    throw new ApiError(404, "Medical billing not found");
  }
  return medicalBilling;
};
/**
 * Create medical billing
 * @param data
 * @returns
 */
export const createMedicalBilling = async (
  billableId: string,
  billableType: "MedicalRecord" | "ExternalService",
  transaction?: Transaction
) => {
  //   const { billableId, billableType } = data;
  const existingBilling = await MedicalBilling.findOne({
    where: { billableId: billableId, billableType },
  });
  if (existingBilling) {
    return existingBilling;
  }
  const medicalBilling = await MedicalBilling.create(
    {
      billableId,
      billableType,
      isInternalService: billableType === "MedicalRecord" ? true : false,
    },
    { transaction }
  );
  return medicalBilling;
};

export const addSingleBillingItemToMedicalBilling = async (
  medicalBillingId: string,
  item: { serviceItemId: number; price: number },
  userId: number,
  transaction?: Transaction
) => {
  const { price, serviceItemId } = item;
  const billingItem = await ServiceLineItem.create(
    {
      billingId: medicalBillingId,
      unitPrice: price,
      createdBy: userId,
      serviceItemId: serviceItemId,
    },
    { transaction }
  );
  return billingItem;
};

export const addBulkBillingItemsToMedicalBilling = async (
  medicalBillingId: string,
  billableType: "MedicalRecord" | "ExternalService",
  items: { serviceItemId: number; price: number }[],
  userId: number,
  transaction?: Transaction
) => {
  const medicalBilling = await getMedicalBillingById(medicalBillingId);
  if (billableType !== medicalBilling.billableType) {
    throw new ApiError(400, "Billable type does not match");
  }
  const transformedItems = items.map((item) => ({
    billingId: medicalBillingId,
    unitPrice: item.price,
    createdBy: userId,
    serviceItemId: item.serviceItemId,
  }));
  const billingItems = await ServiceLineItem.bulkCreate(transformedItems, {
    transaction,
  });
  return billingItems;
};
