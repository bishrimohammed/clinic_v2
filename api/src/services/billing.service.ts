import { Transaction } from "sequelize";
import { MedicalBilling } from "../models";
import ServiceLineItem from "../models/billing/ServiceLineItem";

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
