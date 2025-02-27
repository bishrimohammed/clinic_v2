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

/**
 * Add
 * @param data
 */

export const addBulkBillingItemsToMedicalBilling = async (data: {
  billableId: string;
  billableType: "MedicalRecord" | "ExternalService";
  items: { serviceItemId: number; price: number }[];
  userId: number;
  transaction?: Transaction;
}) => {
  const { billableId, billableType, items, userId, transaction } = data;

  // Atomic billing record handling with transaction
  const [medicalBilling] = await MedicalBilling.findOrCreate({
    where: { billableId },
    defaults: {
      billableId,
      billableType,
      // isInternalService:false
      isInternalService: billableType === "MedicalRecord" ? true : false,
    },
    transaction,
  });

  if (medicalBilling.billableType !== billableType) {
    throw new ApiError(400, "Billable type mismatch for existing record");
  }

  // Create billing line items
  await ServiceLineItem.bulkCreate(
    items.map((item) => ({
      billingId: medicalBilling.id,
      unitPrice: item.price,
      serviceItemId: item.serviceItemId,
      createdBy: userId,
    })),
    { transaction }
  );
};
